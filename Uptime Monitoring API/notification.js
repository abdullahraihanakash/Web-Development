import https from 'node:https';
import environment from './environment.js';
import querystring from 'node:querystring';

const { twilio } = environment;
const notifications = {}

// Send sms to user using twilio api
notifications.sendTwilioSms = (phone,msg,callback) => {
    // input validation
    const userPhone = typeof(phone) === 'string' && phone.trim().length === 11 ? phone.trim() : false;

    const userMsg = typeof(msg) === 'string' && msg.trim().length > 0 && msg.trim().length <= 1600 ? msg.trim() : false

    if(userPhone && userMsg) {
        // Configur the request payload
        const playload = {
            From: twilio.fromPhone,
            To: `+88${userPhone}`,
            Body: userMsg
        }
        
        // Stringify the payload
        const stringfyPayload = querystring.stringify(playload)

        // Configure the request datails
        const requestDatails = {
            hostname: 'api.twilio.com',
            method: 'POST',
            path: `/2010-04-01/Accounts/${twilio.accountSid}/Messages.json`,
            auth: `${twilio.accountSid}:${twilio.authToken}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }

        // Instantiate the request object
        const req = https.request(requestDatails,(res) => {
            // get the status of the sent request 
            const status = res.statusCode;
            // callback successfully if the request went through
            if(status === 200 || status === 201) {
                callback(false)
            }
            else {
                callback(`Status code returned was ${status}`)
            }
        });

        req.on('error',(err) => {
            callback(err)
        })

        req.write(stringfyPayload)
        req.end()

    }
    else {
        callback('Given paramenters were missing or invalid!')
    }
    
}

// export the module
export default notifications;