//import _ from 'lodash';
//console.log(_.last([1, 2, 3])); // Output: 3

/*setTimeout(() => {
    console.log("Hello, World!");
}, 3000);*/
//console.log(global); // Output: [object global]

//console.log(__dirname); // Output: /path/to/current/directory
//console.log(__filename); // Output: /path/to/current/directory/index.js

/*const people = require('./people');
console.log(people); // Output: ["Abdullah","","Ali","Ayesha","Bilal","Fatima","Hassan","Hussain","Imran","Khadija","Maryam","Omar","Sana","Zainab"]

const _ = require('lodash');
console.log(_.last(people.people)); 

//path module
const path = require('path');
const myPath = 'C:/Users/Admin/Desktop/WebDevelopment/NodeJS/index.js';

console.log(path.dirname(myPath)); // Output: C:/Users/Admin/Desktop/WebDevelopment/NodeJS
console.log(path.basename(myPath)); // Output: index.js
console.log(path.extname(myPath)); // Output: .js
console.log(path.parse(myPath)); // Output: { root: 'C:\\', dir: 'C:\\Users\\Admin\\Desktop\\WebDevelopment\\NodeJS', base: 'index.js', ext: '.js', name: 'index' }

//os module
const os = require('os');

console.log(os.platform()); // Output: win32
console.log(os.arch()); // Output: x64
console.log(os.totalmem()); // Output: Total memory in bytes
console.log(os.freemem()); // Output: Free memory in bytes
console.log(os.cpus()); // Output: Array of CPU information

//fs module
const fs = require('fs');

fs.writeFileSync('MyFile.txt', 'Hello, World!'); // Creates a new file and writes "Hello, World!" to it
fs.appendFileSync('MyFile.txt', '\nThis is an appended line.'); // Appends a new line to the file

//const data = fs.readFileSync('MyFile.txt'); // Reads the content of the file
//console.log(data.toString()); // Output: Hello, World! This is an appended line.

const data = fs.readFile('MyFile.txt',(err,data)=> {
    console.log(data.toString()); // Output: Hello, World! This is an appended line.
}); // Asynchronously reads the content of the file

console.log("This is the end of the code"); // This line will be executed before the file reading is complete due to asynchronous nature of readFile
*/
//events module
/*const EventEmitter = require('events');
const emitter = new EventEmitter();

// register a listener for the bellRing event
One parameter event
emitter.on('bellRing', (period) => {
    console.log(`We need to run because ${period}`);
});

// raise an event
setTimeout(() => {
    emitter.emit('bellRing','Second period ended'); 
}, 3000);
*/

/*Multiple parameter event
emitter.on('bellRing', (period, room) => {
    console.log(`We need to run because ${period} in ${room}`);
});

// raise an event
setTimeout(() => {
    emitter.emit('bellRing','Second period ended', 'Room 101'); 
}, 3000);
*/

/*
//school.js
const School = require('./school');
const school = new School();

school.on('bellRing', ({period, text}) => {
    console.log(`We need to run because ${text} in ${period}`);
});

school.startPeriod();


//http module
const http = require('http');
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello Programmers!'); // Write a response to the client
        res.write('Hello, World!'); // Write another response to the client
        res.end(); // End the response
    }
    else if (req.url === '/about') {
        res.write('This is the about page.');   
        res.end();
    }
    else {
        res.write('Page not found.');
        res.end();
    }
});

server.listen(3000);

console.log('Server is running on port 3000');
*/
//Stream & Buffer
/*const fs = require('fs');
const ourReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`);

ourReadStream.on('data', (chunk) => {
    console.log(chunk.toString()); // Output: <Buffer ...> (binary data)
})
*/
/*
const http = require('http');
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('<html><head><title>Form</title></head></html>'); 
        res.write('<body><form method="post" action="/process"><input name="message"></input><button type="submit">Submit</button></form></body>'); 
        res.end(); // End the response
    }
    else if (req.url === '/process' && req.method === 'POST') {
        const body = [];
        req.on('data',(chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            console.log('Stream finished');
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody); // Output: message=Hello
        });
        res.write('Form submitted successfully.');   
        res.end();
    }
    else {
        res.write('Page not found.');
        res.end();
    }
});

server.listen(3000);

console.log('Server is running on port 3000');

*/
/*
const fs = require('fs');
const ourReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`);
const ourWriteStream = fs.createWriteStream(`${__dirname}/output.txt`);

ourReadStream.on('data', (chunk) => {
    ourWriteStream.write(chunk);
});

console.log('Data is being written to output.txt');
ourReadStream.pipe(ourWriteStream); // This will automatically handle the 'data' event and write to the output stream   
*/

//pipe method,best way to handle streams
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const myReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`, 'utf8');
    myReadStream.pipe(res); // This will automatically handle the 'data' event and write to the response stream
});

server.listen(3000);
console.log('Server is running on port 3000');






