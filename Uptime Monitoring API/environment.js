/**
 * Title: Uptime Monitoring API Application
 * Description: A RESTful API to monitor up or down time of user defined links
 * Author: Abdullah Raihan Akash
 * Date: 12/10/2026
 */

//dependencies
import 'dotenv/config';

//module scaffolding
const environments = {};

environments.staging = {
    port: Number(process.env.PORT) || 3000,
    envName: process.env.NODE_ENV || 'staging',
    secretKey: process.env.SECRET_KEY,
    twilio: {
        fromPhone: process.env.TWILIO_FROM_PHONE,
        accountSid: process.env.TWILIO_ACCOUNT_SID,
        authToken: process.env.TWILIO_AUTH_TOKEN
    }
};

environments.production = {
    port: Number(process.env.PORT) || 5000,
    envName: process.env.NODE_ENV || 'production',
    secretKey: process.env.SECRET_KEY,
    twilio: {
        fromPhone: process.env.TWILIO_FROM_PHONE,
        accountSid: process.env.TWILIO_ACCOUNT_SID,
        authToken: process.env.TWILIO_AUTH_TOKEN
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