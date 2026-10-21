//console.log("Hello, World!");
import http from 'node:http';
import { getDataFromDB } from './ServerData.js';
const PORT = 8000;

/*const animal = {
    type: 'Elephant',
    nickName: 'Dumbo'
}
console.log(JSON.stringify(animal));
console.log(typeof JSON.stringify(animal));
*/

/*
const server = http.createServer( (req, res) => {  //req = request, res = response
    const destinations = getDataFromDB();
    //res.end("Hello from the server!","utf-8",()=> console.log("response ended"));
    
    res.write("This is some data from the server\n");
    res.write("This is some data from the server\n");
    res.end("Hello from the server!");

    //console.log(req.url);

    if (req.url === '/api' && req.method === 'GET') {
        res.end('This is from server')
    }
});
 
server.listen(PORT,() => console.log(`Server is running on port ${PORT}`));

// npm start -> http://localhost:8000

import { getDataFromDB } from './ServerData.js';

//Route Not Found

const server = http.createServer(async (req, res) => {
    if (req.url === '/api' && req.method === 'GET') {
        const data = await getDataFromDB();          // ServerData.js theke data ana
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(data));               // JSON string kore pathano
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
// npm start -> http://localhost:8000/api

//Add path parameters
const server = http.createServer(async (req, res) => {
    const destinations = await getDataFromDB();
    if (req.url === '/api' && req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json')
        res.statusCode = 200;
        res.end(JSON.stringify(destinations));
        }

    else if (req.url.startsWith('/api/continent/') && req.method === 'GET') {
        const continent = req.url.split('/').pop(); // Get the last part of the URL as the continent name
        console.log(`Continent requested: ${continent}`);

        const filteredData = destinations.filter((destination) => {
            return destination.continent.toLowerCase() === continent.toLowerCase();
        });
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify(filteredData));
    }

    else {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 404;
        res.end(JSON.stringify({ 
            error: 'Not found' ,
            message: 'The requested resource was not found on this server.'
        }));
    };
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 */ 
//npm start ->http://localhost:8000/api/continent/africa

//Aside: Query Parameters
const server = http.createServer(async (req, res) => {

    const urlobj = new URL(req.url, `http://${req.headers.host}`);
    //console.log(req.headers);
    console.log(urlobj)
    //console.log(req.url);
    const queryObj = Object.fromEntries(urlobj.searchParams)

})

server.listen(8000, () => console.log('Server running on port 8000'));

//npm start -> http://localhost:8000/api?name=tom&country=uk






























