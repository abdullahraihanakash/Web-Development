// /**
//  * Title: Server library for Uptime Monitoring API Application
//  * Description: Server related files to handle request and response
//  * Author: Abdullah Raihan Akash
//  * Date: 12/10/2026
//  */

// //dependencies
// import http from 'node:http';
// import url from 'node:url';
// import { StringDecoder } from 'node:string_decoder';
// import { routes,notFoundHandler } from './routes.js';
// import environment from './environment.js';
// import lib from './lib/data.js';
// import utilities from './utilities.js';
// //import notifications from './notification.js';


// //app object - module scaffolding
// const app = {};
// /*
// // Testing file system
// // Todo : remove later
// // Create info.json file on data\test folder

// // Write data
// lib.create('test', 'info', {'name': 'Bangladesh', 'language': 'Bangla'} , (err) => {
//     console.log(`error was`,err);
// });

// // Read data
// lib.read('test', 'info', (err,result) => {
//     console.log(err,result);
// });

// // Update data
// lib.update('test','info', {'name': 'Palestine', 'language': 'Arabic'}, (err) => {
//     console.log(err);
// });

// // delete data
// lib.delete('test','info', (err) => {
//     console.log(err);
// });


// // Testing send sms function todo: remove later
// notifications.sendTwilioSms('01700000000', 'Hello from Uptime Monitoring API', (err) => {
//     console.log(`this was the error`, err);
// });
// */

// //create server
// app.createServer = () => {
//     const server = http.createServer(app.handleRequestResponse);
//     server.listen(environment.port, () => {
//         //console.log(`environment variable is ${process.env.NODE_ENV}`);
//         console.log(`listening to port ${environment.port}`);
//     });
// };

// //handle request response
// app.handleRequestResponse = (req, res) => {
//     //request handling

//     //get the url and parse it
//     const parsedUrl = url.parse(req.url, true); //true don't avoid url query string for example: /path?name=Abdulla&age=25 => {name: 'Abdulla', age: 25}
//     const path = parsedUrl.pathname;
//     const trimmedPath = path.replace(/^\/+|\/+$/g, ''); //remove the leading and trailing slashes
//     const method = req.method.toLowerCase();
//     const queryStringObject = parsedUrl.query;
//     const headersObject = req.headers;
//     const decoder = new StringDecoder('utf-8');
//     let realData = '';
//     const requestProperties = {
//         parsedUrl,
//         path,
//         trimmedPath,
//         method,
//         queryStringObject,
//         headersObject: req.headers,
//         body: {},
//     };

//     const choseAnHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;
    
//     req.on('data',(buffer) => {
//         realData += decoder.write(buffer);
//     });

//     req.on('end', () => {
//         realData += decoder.end();

//         requestProperties.body = utilities.parseJSON(realData);

//         choseAnHandler(requestProperties, (statusCode,payload) => {
//         statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
//         payload = typeof(payload) === 'object' ? payload : {};

//         const payloadString = JSON.stringify(payload);

//         //return the final response
//         res.setHeader('Content-Type','application/json');
//         res.writeHead(statusCode);
//         res.end(payloadString);
//     });
// });

//     //response handling
//     //res.end('Hello World');
// };

// //Start the server
// app.createServer();



