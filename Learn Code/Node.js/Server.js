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
