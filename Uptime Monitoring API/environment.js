/**
 * Title: Uptime Monitoring API Application
 * Description: A RESTful API to monitor up or down time of user defined links
 * Author: Abdullah Raihan Akash
 * Date: 12/10/2026
 */

//dependencies

//module scaffolding
const environments = {};

environments.staging = {
    port: 3000,
    envName: 'staging',
    secretKey: 'aiushiahhgfian',
    twilio: {
        fromPhone: '01995969595',
        accountSid: 'AC90891c5cd9ecb4adb9fff9611d347e8f',
        authToken: 'AC90891c5cd9ecb4adb9fff9611d347e8f'
    }
};

environments.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'aiut23p4utq9uhyian',
    twilio: {
        fromPhone: '01995969595',
        accountSid: 'AC90891c5cd9ecb4adb9fff9611d347e8f',
        authToken: 'AC90891c5cd9ecb4adb9fff9611d347e8f'
    }
};

// determine which enviroment was passed
const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : 'staging';

// export corresponding environment object
const environmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging;

export default environmentToExport;

// To test
// npm start
// npm run production
