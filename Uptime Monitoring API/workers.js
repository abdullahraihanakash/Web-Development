/*Title: workers file
Description: workers related files to handle request and response       
Author: Abdullah Raihan Akash
Date: 1/11/2026
*/

//dependencies

import data from './lib/data.js';
import utilities from './utilities.js';
import url from 'url';
import http from 'http';
import https from 'https';
import notification from './notification.js';

//workers object - module scaffolding
const workers = {};

// lookup all checks, get their data, send to a validator
workers.gatherAllChecks = () => {
    //get all the checks
    data.list('checks', (err, checks) => {
        if(!err && checks && checks.length > 0) {
            checks.forEach((check) => {
                // read the checkData
                data.read('checks', check, (err, originalCheckData) => {
                    if(!err && originalCheckData) {
                        // pass it to the check validator and let that function continue or log errors as needed
                        workers.validateCheckData(utilities.parseJSON(originalCheckData));
                    }
                    else {
                        console.log("Error: Reading one of the check's data");
                    }
                });
            });
        }
        else {
            console.log('Error: Could not find any checks to process!')
        }
    });
};

// validate individual check data
workers.validateCheckData = (originalCheckData) => {
    const originalData = originalCheckData;

    if(originalData && originalData.id) {
        originalData.state = typeof(originalData.state) === 'string' && ['up','down'].indexOf(originalCheckData.state) > -1 ? originalCheckData.state : 'down';
        originalData.lastChecked = typeof(originalCheckData.lastChecked) === 'number' && originalCheckData.lastChecked > 0 ? originalCheckData.lastChecked : false;

        // pass to the next process
        workers.performCheck(originalData);
    }
    else {
        console.log('Error: Check was invalid or not properly formatted');
    }
};

// perform the check, send the originalCheckData and outcome of the check process to the next step in the process
workers.performCheck = (originalCheckData) => {
    // to be implemented
    //console.log('perform check');

    // prepare the initial check outcome
    const checkOutCome = {
        error: false,
        responseCode: false
    };

    // mark that the outcome has not been sent yet
    let outcomeSent = false;

    // parse the hostname and full url from originalCheckData
    const parsedUrl = url.parse(originalCheckData.protocol + '://' + originalCheckData.url, true);
    const hostName = parsedUrl.hostname;
    const path = parsedUrl.path; // using path not pathname because we want the query string. Difference between path and pathname is that path includes the 
                                // query string while pathname includes only the path without the query string
    // construct the request
    const requestDetails = {
        protocol: originalCheckData.protocol + ':',
        hostname: hostName,
        method: originalCheckData.method.toUpperCase(),
        path,
        timeout: originalCheckData.timeOutSeconds * 1000
    };
    //console.log(requestDetails);
    const protocolToUse = originalCheckData.protocol === 'http' ? http : https;

    const req = protocolToUse.request(requestDetails, (res) => {
        const status = res.statusCode;
        //console.log(status);
        res.resume();
        // update the check outcome and pass to the next process
        checkOutCome.responseCode = status;
        if(!outcomeSent) {
            outcomeSent = true;
            workers.processCheckOutCome(originalCheckData, checkOutCome);
        }
    });
    req.on('error', (e) => {
        //console.log('Error: ' + e);
        checkOutCome.error = true;
        checkOutCome.value = e;
        req.destroy();
        if(!outcomeSent) {
            outcomeSent = true;
            workers.processCheckOutCome(originalCheckData, checkOutCome);
        }
    });
    req.on('timeout', () => {
        //console.log('Error: timeout');
        checkOutCome.error = true;
        checkOutCome.value = 'Timeout';
        
        if(!outcomeSent) {
            outcomeSent = true;
            workers.processCheckOutCome(originalCheckData, checkOutCome);
        }
        req.destroy();
    });

    req.end();
};

// save check outcome to the database and send to the next process

workers.processCheckOutCome = (originalCheckData, checkOutCome) => {
    // to be implemented
    //console.log('process check outcome');

    // check if the checkOutcome is up or down
    const state = !checkOutCome.error && checkOutCome.responseCode && originalCheckData.successCodes.indexOf(checkOutCome.responseCode) > -1 ? 'up' : 'down';

    // decide whether we should alert the user or not
    const alertWarranted = originalCheckData.lastChecked && originalCheckData.state !== state;

    // update the check data
    const newCheckData = originalCheckData;
    newCheckData.state = state;
    newCheckData.lastChecked = Date.now();

    // update the check to disk
    data.update('checks', newCheckData.id, newCheckData, (err) => {
        if(!err) {
            // send the new check data to the next process
            if(alertWarranted) {
                workers.alertUserToStatusChange(newCheckData);
            }
            else {
                console.log('Check outcome has not changed, no alert needed');
            }
        }
        else {
            console.log('Error trying to save updates to one of the checks');
        }
            // send the new check data to the next process      

    })    
}

// send notification sms to user if state changes
workers.alertUserToStatusChange = (newCheckData) => {
    const msg = `Alert: Your check for ${newCheckData.method.toUpperCase()} ${newCheckData.protocol}://${newCheckData.url} is currently ${newCheckData.state}`;
    // implementation for sending SMS alert
    notification.sendTwilioSms(newCheckData.userPhone, msg, (err) => {
        if(!err) {
            console.log(`Success: User was alerted to a status change in their check, via sms: ${msg}`);
        }
        else {
            console.log(`Error: Could not send sms alert to user who had a state change in their check`);
        }
    });
};

// timer to execute the workers process once per minute
workers.loop = () => {
    setInterval(() => {
        workers.gatherAllChecks();
    }, 1000 * 60);
};

// start the workers
workers.init = () => {
    //console.log('workers are running');
    // execute all the checks
    workers.gatherAllChecks();
    // call the loop so that checks continue
    workers.loop();
};

export default workers;