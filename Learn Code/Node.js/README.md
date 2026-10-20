# Node.js Course Notes --- Learn with Sumit

> Personal revision notes for learning and developing with Node.js. Keep
> this file updated as you complete the course and apply the concepts to
> your projects.

## Course Resources

-   **YouTube playlist:**
    https://www.youtube.com/playlist?list=PLHiZ4m8vCp9PHnOIT7gd30PCBoYCpGoQM
-   **Instructor's course repository:**
    https://github.com/learnwithsumit/nodejs-basic-bangla
-   **Instructor's channel:** https://youtube.com/LearnwithSumit

These are personal study notes and a practical quick reference, not a
transcript of the videos. Check the course and official documentation
for full explanations and version-specific details.

------------------------------------------------------------------------

## 1. What Is Node.js?

Node.js is a JavaScript runtime that lets JavaScript run outside the
browser. It is commonly used to build servers, REST APIs, command-line
tools, automation scripts, and backend services.

### Where Node.js fits

-   **Browser:** runs frontend JavaScript and provides browser APIs such
    as the DOM.
-   **Node.js:** runs JavaScript on a computer or server and provides
    APIs such as file-system access, networking, and process
    information.
-   **Backend:** receives requests, runs application logic, communicates
    with data stores, and sends responses.

Node.js uses an event-driven, non-blocking I/O model. This helps it
handle many I/O operations without waiting synchronously for each one to
finish.

## 2. Check Your Installation

``` bash
node --version
npm --version
```

If the project uses Yarn:

``` bash
yarn --version
```

Run a JavaScript file:

``` bash
node index.js
```

## 3. Start a Node.js Project

Create a project directory, open it in your editor, and initialize it:

``` bash
npm init -y
```

This creates `package.json`, which stores project metadata, scripts, and
dependency information.

Example scripts:

``` json
{
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js"
  }
}
```

Run a script:

``` bash
npm start
npm run dev
```

`node --watch` is available in modern Node.js versions. If your
installed version or project setup does not support it, use a compatible
development tool such as Nodemon.

### Important project files

  -----------------------------------------------------------------------
  File/folder                         Purpose
  ----------------------------------- -----------------------------------
  `package.json`                      Project information, scripts, and
                                      dependency declarations

  `package-lock.json`                 Records the npm dependency tree for
                                      reproducible installs

  `yarn.lock`                         Records the Yarn dependency tree

  `node_modules/`                     Installed packages; normally do not
                                      commit it to Git

  `.gitignore`                        Lists files Git should ignore

  `.env`                              Often stores local
                                      configuration/secrets; do not
                                      commit secrets
  -----------------------------------------------------------------------

Use one package manager consistently for a project. Commit the lockfile
for the package manager you use.

## 4. CommonJS vs ES Modules

Node.js supports two common module systems.

### CommonJS

``` js
const fs = require('node:fs');

module.exports = {
    sayHello() {
        return 'Hello from Node.js';
    },
};
```

Import it from another CommonJS file:

``` js
const helper = require('./helper.cjs');
```

### ES Modules (ESM)

``` js
import fs from 'node:fs';

export function sayHello() {
    return 'Hello from Node.js';
}
```

Import it:

``` js
import { sayHello } from './helper.js';
```

To use ESM consistently, you can set this in `package.json`:

``` json
{
  "type": "module"
}
```

### Avoid this common error

If `package.json` contains `"type": "module"`, a `.js` file is treated
as an ES module. Using `require()` in that file can produce
`ReferenceError: require is not defined in ES module scope`.

Choose one approach:

-   Use `import` and `export` in an ESM project.
-   Or use `.cjs` files for CommonJS code.

Do not mix module systems casually. Also remember that `__dirname` is
not defined by default in ES modules.

### Get the current directory in ESM

``` js
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

## 5. Useful Built-in Modules

Built-in modules do not need to be installed separately.

``` js
import http from 'node:http';       // HTTP server and client utilities
import fs from 'node:fs';           // File-system operations
import path from 'node:path';       // Safe path utilities
import os from 'node:os';           // Operating-system information
import events from 'node:events';   // EventEmitter and event utilities
import url from 'node:url';         // URL utilities
```

Prefer the modern WHATWG `URL` API for new URL-handling code:

``` js
const address = new URL('http://localhost:3000/users?id=42');

console.log(address.pathname); // /users
console.log(address.searchParams.get('id')); // 42
```

## 6. Callbacks and Asynchronous Work

A callback is a function passed to another function so it can be called
later, often when an operation completes.

``` js
function greet(name, callback) {
    const message = `Hello, ${name}`;
    callback(message);
}

greet('Akash', (result) => {
    console.log(result);
});
```

Node.js APIs often use the error-first callback convention:

``` js
import fs from 'node:fs';

fs.readFile('./notes.txt', 'utf8', (error, data) => {
    if (error) {
        console.error('Could not read file:', error.message);
        return;
    }

    console.log(data);
});
```

**Remember:** handle the error first and return so the success path does
not continue accidentally.

### Promise and async/await

``` js
import fs from 'node:fs/promises';

async function readNotes() {
    try {
        const data = await fs.readFile('./notes.txt', 'utf8');
        console.log(data);
    } catch (error) {
        console.error('Could not read file:', error.message);
    }
}

readNotes();
```

-   A **Promise** represents an asynchronous operation's eventual
    result.
-   `async` makes a function return a Promise.
-   `await` waits for a Promise to settle inside an `async` function.
-   `try/catch` can handle rejected Promises when using `await`.

## 7. File-System Operations

Use `node:fs` or `node:fs/promises` to work with files and directories.

Common operations:

  Operation                              Typical API
  -------------------------------------- ----------------
  Read a file                            `readFile()`
  Create/write or replace file content   `writeFile()`
  Add content to a file                  `appendFile()`
  Delete a file                          `unlink()`
  Create a directory                     `mkdir()`
  List directory entries                 `readdir()`
  Get file information                   `stat()`

Example using the Promise API:

``` js
import fs from 'node:fs/promises';
import path from 'node:path';

const dataDirectory = path.join(process.cwd(), 'data');

async function saveUser() {
    await fs.mkdir(dataDirectory, { recursive: true });

    const filePath = path.join(dataDirectory, 'user.json');
    const user = { name: 'Akash', language: 'Bangla' };

    await fs.writeFile(filePath, JSON.stringify(user, null, 2), 'utf8');
}

saveUser().catch(console.error);
```

### File-system debugging checklist

-   Build paths with `path.join()` or `path.resolve()` instead of
    manually joining strings.
-   Check whether the parent directory exists before writing.
-   Check the exact path in an error such as `ENOENT`.
-   Pass every required function argument, including callbacks where the
    API expects them.
-   Close file descriptors when using low-level APIs such as `open()`
    and `close()`.
-   Do not assume a write succeeded until you handle its result or
    error.

## 8. HTTP Server Basics

The built-in `http` module can create a basic server without Express.

``` js
import http from 'node:http';

const server = http.createServer((request, response) => {
    response.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
    });

    response.end(JSON.stringify({
        message: 'Hello from my Node.js server',
    }));
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
```

Open `http://localhost:3000` in a browser or send a request using an API
client.

### Request and response concepts

-   `request.method`: HTTP method such as `GET` or `POST`.
-   `request.url`: requested path and query string.
-   `response.writeHead(statusCode, headers)`: sets the status and
    headers.
-   `response.end(body)`: completes the response.

**Important:** end each response only once. Calling `response.end()`
multiple times or writing after the response has ended can cause errors
such as `ERR_STREAM_WRITE_AFTER_END`.

## 9. HTTP Methods and Status Codes

  Method     Common purpose
  ---------- ----------------------------------
  `GET`      Read or retrieve data
  `POST`     Create a resource or submit data
  `PUT`      Replace a resource
  `PATCH`    Partially update a resource
  `DELETE`   Delete a resource

Common status codes:

-   `200 OK` --- request succeeded.
-   `201 Created` --- a resource was created.
-   `400 Bad Request` --- request data is invalid.
-   `401 Unauthorized` --- authentication is missing or invalid.
-   `403 Forbidden` --- the caller is not allowed to perform the action.
-   `404 Not Found` --- route or resource was not found.
-   `500 Internal Server Error` --- an unexpected server-side error
    occurred.

Choose status codes according to what actually happened; do not return
`200` for every outcome.

## 10. Routing and Handler Structure

Routing connects a request's method and path to the appropriate handler.

A simple conceptual structure:

``` text
project/
├── index.js          # Starts the server and handles incoming requests
├── routes.js         # Maps paths to handlers
├── handlers/
│   └── sample.js     # Handler functions
├── lib/
│   └── data.js       # Data/file operations
├── data/             # Stored data files
└── package.json
```

Example handler:

``` js
const handler = {};

handler.sample = (requestProperties, callback) => {
    callback(200, {
        message: 'This is a sample route',
    });
};

export default handler;
```

Example route map:

``` js
import handler from './handlers/sample.js';

const routes = {
    'sample': handler.sample,
};

export default routes;
```

This is an illustrative pattern, not a complete router. Your server must
still parse the request path, match the HTTP method, validate input, and
send the callback result as a response.

### Debugging imports and exports

-   Confirm the export style matches the import style.
-   Confirm the relative file path and filename are correct.
-   On case-sensitive systems, filename capitalization matters.
-   If importing a named export, ensure that exact name is exported.
-   If a handler expects `(requestProperties, callback)`, pass both
    arguments.

## 11. JSON Notes

JSON is a text format for exchanging structured data.

``` js
const user = {
    name: 'Akash',
    language: 'Bangla',
};

const jsonText = JSON.stringify(user, null, 2);
const parsedUser = JSON.parse(jsonText);
```

-   `JSON.stringify(value)` converts a JavaScript value into JSON text.
-   `JSON.parse(text)` converts valid JSON text into a JavaScript value.
-   JSON property names and string values use double quotes in JSON
    files.
-   Invalid JSON can throw a parsing error; validate or catch errors
    when reading external data.

## 12. Environment Variables and Configuration

Keep environment-specific settings---such as a port number---in
configuration rather than scattering them throughout the code.

``` js
const port = Number(process.env.PORT) || 3000;
```

If using a `.env` file, load it using a supported approach for your
Node.js version or a package such as `dotenv`. Never commit real API
keys, passwords, or other secrets. Put `.env` in `.gitignore` and
provide a safe `.env.example` containing placeholder values only.

## 13. Debugging Checklist

When a Node.js project does not run, check these in order:

1.  Read the **first error message** and the file/line number it names.
2.  Check syntax: missing braces, parentheses, commas, or quotes.
3.  Check imports, exports, and the project's module type.
4.  Check function arguments and callback signatures.
5.  Check file paths and whether directories exist.
6.  Check that asynchronous errors are handled.
7.  Check that each HTTP response is completed only once.
8.  Restart the server after changing code if the process does not
    reload automatically.
9.  Reproduce the issue with the smallest possible example.
10. Search the exact error message in the official Node.js documentation
    or a trusted source.

Useful commands:

``` bash
node --check index.js
npm install
npm start
```

`node --check` checks syntax; it does not prove that the application
logic is correct.

## 14. Development Workflow

For each course lesson:

-   [ ] Watch the lesson and write the core idea in your own words.
-   [ ] Type the code yourself instead of only copying it.
-   [ ] Add comments explaining important lines.
-   [ ] Run the example and test normal and error cases.
-   [ ] Change one thing and observe the result.
-   [ ] Commit working progress to Git.
-   [ ] Record any bug, its cause, and the fix.

Suggested Git workflow:

``` bash
git status
git add .
git commit -m "Add Node.js lesson notes"
git push
```

Review `git status` before committing. Do not commit secrets, `.env`, or
`node_modules/`.

## 15. Practice Projects

Use these projects to turn lesson concepts into development skills:

-   [ ] Basic HTTP server returning JSON.
-   [ ] Routing with `GET`, `POST`, and `404` handlers.
-   [ ] File-based JSON storage with create, read, update, and delete
    operations.
-   [ ] A small REST API with input validation and useful status codes.
-   [ ] Uptime monitoring API that periodically checks URLs and stores
    their status.
-   [ ] Add structured error handling, configuration, and clear setup
    instructions to a project.

For a real uptime monitor, also consider URL validation, timeouts, safe
handling of user-provided URLs, scheduling, logging, and the limits of
file-based storage.

## 16. Lesson Progress Tracker

Update this checklist as you watch the playlist. The items below are
topic areas for your own revision; they are not a guaranteed
video-by-video index.

-   [ ] Course setup and development environment
-   [ ] Node.js fundamentals and runtime
-   [ ] npm / Yarn and `package.json`
-   [ ] Modules and imports / exports
-   [ ] Core modules
-   [ ] Callbacks and asynchronous programming
-   [ ] File-system operations
-   [ ] HTTP server and request / response
-   [ ] Routing and handler organization
-   [ ] JSON and data storage
-   [ ] Error handling and debugging
-   [ ] Apply the concepts to a complete project

## 17. Official References

-   Node.js documentation: https://nodejs.org/docs/latest/api/
-   Node.js guides: https://nodejs.org/en/learn
-   npm documentation: https://docs.npmjs.com/
-   MDN HTTP overview: https://developer.mozilla.org/en-US/docs/Web/HTTP

------------------------------------------------------------------------

## My Notes

Add lesson-specific notes here:

### Lesson:

**Main concept:**

**What I learned:**

**Code example:**

``` js
// Add your own example here.
```

**Bug I faced:**

**How I fixed it:**

**Where I can use this in a project:**


