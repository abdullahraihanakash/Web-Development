/**
 * Title: Server library for Uptime Monitoring API Application
 * Description: Server related files to handle request and response
 * Author: Abdullah Raihan Akash
 * Date: 1/11/2026
 */

// Dependencies
import http from 'node:http';
import url from 'node:url';
import { StringDecoder } from 'node:string_decoder';
import { routes, notFoundHandler } from './routes.js';
import utilities from './utilities.js';
import environment from './environment.js';


//server object 
const server = {};

// configuration
server.config = {
    port: environment.port,
};

//create server
server.createServer = () => {
    const createServerVariable = http.createServer(server.handleRequestResponse);
    createServerVariable.listen(server.config.port, () => {
        console.log(`listening to port ${server.config.port}`);
    });
};

//handle request response
server.handleRequestResponse = (req, res) => {
    //request handling

    //get the url and parse it
    const parsedUrl = url.parse(req.url, true); //true don't avoid url query string for example: /path?name=Abdulla&age=25 => {name: 'Abdulla', age: 25}
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, ''); //remove the leading and trailing slashes
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const decoder = new StringDecoder('utf-8');
    let realData = '';
    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObject: req.headers,
        body: {},
    };

    const choseAnHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;
    
    req.on('data',(buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();

        requestProperties.body = utilities.parseJSON(realData);

        choseAnHandler(requestProperties, (statusCode,payload) => {
        statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
        payload = typeof(payload) === 'object' ? payload : {};

        const payloadString = JSON.stringify(payload);

        //return the final response
        res.setHeader('Content-Type','application/json');
        res.writeHead(statusCode);
        res.end(payloadString);
    });
});

    //response handling
    //res.end('Hello World');
};

//Start the server
server.listen(environment.port, () => {
    console.log(`Listening on port ${environment.port}`);
});

export default server;