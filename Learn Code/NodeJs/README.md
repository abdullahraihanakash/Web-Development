# Node.js A to Z – Complete Beginner-Friendly Guide

> **Learn Node.js step by step with simple English, examples, and small projects.**
>
> This guide is for beginners who know a little JavaScript and want to use JavaScript outside the browser, build servers, create APIs, work with files, and understand backend development.

---

## Table of Contents

1. [What Is Node.js?](#1-what-is-nodejs)
2. [What Can We Build with Node.js?](#2-what-can-we-build-with-nodejs)
3. [Node.js, JavaScript, and the Browser](#3-nodejs-javascript-and-the-browser)
4. [Install Node.js](#4-install-nodejs)
5. [Check Your Installation](#5-check-your-installation)
6. [Your First Node.js Program](#6-your-first-nodejs-program)
7. [Run JavaScript Files](#7-run-javascript-files)
8. [The Node.js REPL](#8-the-nodejs-repl)
9. [How a Node.js Project Is Organized](#9-how-a-nodejs-project-is-organized)
10. [npm and Package Managers](#10-npm-and-package-managers)
11. [package.json](#11-packagejson)
12. [Node.js Modules](#12-nodejs-modules)
13. [Built-in Modules](#13-built-in-modules)
14. [The process Object](#14-the-process-object)
15. [Environment Variables](#15-environment-variables)
16. [Working with Files: fs](#16-working-with-files-fs)
17. [Working with Paths: path](#17-working-with-paths-path)
18. [Working with JSON](#18-working-with-json)
19. [Synchronous and Asynchronous Code](#19-synchronous-and-asynchronous-code)
20. [Callbacks](#20-callbacks)
21. [Promises](#21-promises)
22. [async and await](#22-async-and-await)
23. [The Event Loop](#23-the-event-loop)
24. [Timers](#24-timers)
25. [Events and EventEmitter](#25-events-and-eventemitter)
26. [Buffers](#26-buffers)
27. [Streams](#27-streams)
28. [Create a Web Server with http](#28-create-a-web-server-with-http)
29. [HTTP Request and Response](#29-http-request-and-response)
30. [Build a Small REST API](#30-build-a-small-rest-api)
31. [Express.js](#31-expressjs)
32. [Middleware](#32-middleware)
33. [Working with Databases](#33-working-with-databases)
34. [Error Handling](#34-error-handling)
35. [Input Validation](#35-input-validation)
36. [Authentication and Password Security](#36-authentication-and-password-security)
37. [Testing](#37-testing)
38. [Debugging and Logging](#38-debugging-and-logging)
39. [Security Best Practices](#39-security-best-practices)
40. [Performance Basics](#40-performance-basics)
41. [Deploy a Node.js App](#41-deploy-a-nodejs-app)
42. [Common Node.js Errors and Fixes](#42-common-nodejs-errors-and-fixes)
43. [A to Z Node.js Glossary](#43-a-to-z-nodejs-glossary)
44. [Useful npm Commands](#44-useful-npm-commands)
45. [Practice Projects](#45-practice-projects)
46. [A Suggested Learning Roadmap](#46-a-suggested-learning-roadmap)
47. [Final Checklist](#47-final-checklist)
48. [Official Learning Resources](#48-official-learning-resources)

---

## 1. What Is Node.js?

**Node.js is a JavaScript runtime environment.** It lets us run JavaScript outside a web browser.

Normally, a browser runs JavaScript to make web pages interactive. Node.js lets us use JavaScript on a computer or server. For example, we can use it to create a web server, read files, connect to a database, or build an API.

Node.js uses the **V8 JavaScript engine**, which is also used by Chromium-based browsers. Node.js adds useful features such as file-system access, networking, and server-side APIs.

### Simple example

```js
console.log("Hello from Node.js!");
```

Save this code in `app.js`, open a terminal in that folder, and run:

```bash
node app.js
```

Output:

```text
Hello from Node.js!
```

### Is Node.js a programming language?

No.

- **JavaScript** is a programming language.
- **Node.js** is a runtime that runs JavaScript outside the browser.
- **npm** is a package manager commonly used to install JavaScript packages.

---

## 2. What Can We Build with Node.js?

Node.js is commonly used to build:

- **Backend applications:** the server-side part of a website or app.
- **REST APIs:** services that send and receive data, often as JSON.
- **Real-time applications:** chat apps, live dashboards, and notification systems.
- **Command-line tools:** programs that run in a terminal.
- **File tools:** programs that read, write, rename, or process files.
- **Streaming applications:** systems that process video, audio, or large files in parts.
- **Automation tools:** programs that perform repeated tasks.
- **Microservices:** small services that work together as one system.

Node.js is especially useful for applications with many network or file operations. It is not automatically the best choice for every task. Very CPU-heavy work may need worker threads, separate services, or another technology.

---

## 3. Node.js, JavaScript, and the Browser

JavaScript is the language. The environment decides which extra features are available.

| Browser JavaScript | Node.js JavaScript |
|---|---|
| Runs inside a browser | Runs on a computer or server |
| Can use `window` and `document` | Does not provide browser DOM objects by default |
| Can update HTML and CSS | Can work with files and operating-system features |
| Uses browser APIs such as `localStorage` | Uses Node.js APIs such as `node:fs` and `node:http` |
| Often sends requests to a backend | Can receive requests and send responses as a server |

Both environments support JavaScript basics such as variables, arrays, objects, functions, classes, promises, and `async`/`await`.

**Important:** `document.querySelector()` works in a browser page, but it does not work in a normal Node.js script because Node.js does not have a browser DOM.

---

## 4. Install Node.js

1. Open the official download page: <https://nodejs.org/en/download>.
2. Choose an **LTS (Long-Term Support)** release for normal learning and production work.
3. Download the installer for your operating system.
4. Run the installer and follow its steps.
5. Close and reopen your terminal after installation.

A version manager is also useful when you need to work with different Node.js versions. The official Node.js release page shows which versions are currently supported: <https://nodejs.org/en/about/previous-releases>.

---

## 5. Check Your Installation

Open a terminal (PowerShell, Command Prompt, macOS Terminal, or Linux terminal) and run:

```bash
node --version
npm --version
```

Example output (your numbers may be different):

```text
v24.x.x
11.x.x
```

- `node --version` shows your Node.js version.
- `npm --version` shows your npm version.

If the terminal says that `node` is not recognized or not found, check that Node.js is installed and available in your system's PATH. Reopen the terminal after installation.

---

## 6. Your First Node.js Program

Create a folder named `node-practice`. Inside it, create a file named `app.js`.

```js
// Print a message in the terminal.
console.log("Welcome to Node.js!");

// Store a user's name.
const userName = "Alex";

// Use a function just like normal JavaScript.
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet(userName));
```

Run it:

```bash
node app.js
```

Output:

```text
Welcome to Node.js!
Hello, Alex!
```

Node.js runs the JavaScript file from top to bottom, while asynchronous operations may finish later.

---

## 7. Run JavaScript Files

The basic command is:

```bash
node filename.js
```

Examples:

```bash
node app.js
node server.js
node index.js
```

To stop a running program in most terminals, press `Ctrl + C`.

### Run a file from another folder

Move into the project folder first:

```bash
cd path/to/project
node app.js
```

Or provide the file path directly:

```bash
node path/to/project/app.js
```

---

## 8. The Node.js REPL

**REPL** means Read-Eval-Print Loop. It lets you test JavaScript one expression at a time.

Run:

```bash
node
```

Then type:

```js
2 + 3
const language = "JavaScript"
console.log(language)
```

To leave the REPL, type `.exit` or press `Ctrl + C` twice.

The REPL is useful for quick experiments. For larger programs, use `.js` files.

---

## 9. How a Node.js Project Is Organized

A simple project may look like this:

```text
my-node-project/
│
├── node_modules/       # Installed packages (created by npm)
├── data/               # Files used by the application
├── src/                # Main application code
│   ├── routes/         # Route handlers
│   ├── controllers/    # Request and response logic
│   ├── services/       # Business logic
│   └── utils/          # Reusable helper functions
│
├── .env                # Local environment values; do not upload secrets
├── .gitignore          # Files Git should ignore
├── package.json        # Project information and scripts
├── package-lock.json   # Exact npm dependency versions
└── index.js            # Application entry point
```

This is only one possible structure. Small projects can use fewer folders. The goal is to keep related code together and make files easy to find.

### A good first step

Create a folder, open it in VS Code, then open the integrated terminal and run commands from that folder.

---

## 10. npm and Package Managers

**npm** stands for Node Package Manager. It is installed with Node.js in the standard installation.

A package is reusable code that another developer has published. For example, `express` helps us build web servers, and `dotenv` can load environment values from a `.env` file.

Initialize a project:

```bash
npm init -y
```

Install a package:

```bash
npm install express
```

Install a package for development only:

```bash
npm install --save-dev nodemon
```

Remove a package:

```bash
npm uninstall express
```

Run a script from `package.json`:

```bash
npm run dev
```

### What is `node_modules`?

`node_modules` is the folder where npm places installed packages and their dependencies. It can become large, so it is normally not uploaded to GitHub. Another developer can recreate it using the lock file and:

```bash
npm install
```

### What is `package-lock.json`?

It records the exact dependency tree npm installed. Commit it to Git so other developers and deployment systems can install consistent versions.

### Other package managers

- **Yarn** is another JavaScript package manager.
- **pnpm** is another package manager that can save disk space through its storage system.

Choose one package manager for a project and use its matching lock file consistently. Do not mix `package-lock.json`, `yarn.lock`, and `pnpm-lock.yaml` without a clear reason.

---

## 11. package.json

`package.json` is the main information file for a Node.js project. It can contain the project name, version, scripts, dependencies, and module type.

Create it with:

```bash
npm init -y
```

Example:

```json
{
  "name": "my-node-project",
  "version": "1.0.0",
  "description": "My first Node.js project",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js"
  },
  "dependencies": {},
  "devDependencies": {}
}
```

Important fields:

- `name`: the project name.
- `version`: the project version.
- `description`: a short explanation of the project.
- `type`: tells Node.js how to interpret `.js` files in this package.
- `scripts`: shortcuts for commands.
- `dependencies`: packages needed when the app runs.
- `devDependencies`: packages mainly needed during development.

Run the scripts:

```bash
npm start
npm run dev
```

`npm start` is a special script name, so it does not need the word `run`. Other scripts normally use `npm run <script-name>`.

---

## 12. Node.js Modules

A **module** is a file or package that contains code we can reuse. Modules help us split a large program into smaller files.

Node.js supports two main module systems:

1. **ES modules (ESM):** use `import` and `export`.
2. **CommonJS (CJS):** use `require()` and `module.exports`.

Do not mix their syntax without understanding how the project is configured.

### 12.1 ES modules (recommended for new examples in this guide)

Add this to `package.json`:

```json
{
  "type": "module"
}
```

Create `math.js`:

```js
// Export a function so other files can use it.
export function add(a, b) {
  return a + b;
}

export const appName = "Math Helper";
```

Create `index.js`:

```js
// Import the named exports from math.js.
import { add, appName } from "./math.js";

console.log(appName);
console.log(add(10, 5));
```

Run:

```bash
node index.js
```

For a relative ES module import, include the file extension, such as `./math.js`.

### 12.2 Default export

`math.js`:

```js
export default function multiply(a, b) {
  return a * b;
}
```

`index.js`:

```js
import multiply from "./math.js";

console.log(multiply(4, 5));
```

### 12.3 CommonJS

CommonJS is common in older Node.js projects and many existing tutorials.

`math.cjs`:

```js
function add(a, b) {
  return a + b;
}

module.exports = { add };
```

`index.cjs`:

```js
const { add } = require("./math.cjs");

console.log(add(10, 5));
```

Run:

```bash
node index.cjs
```

You can also use `.js` files as CommonJS when the nearest `package.json` does not set `"type": "module"` (or sets `"type": "commonjs"`). The `.cjs` extension always indicates CommonJS, while `.mjs` always indicates ES modules.

### 12.4 A common module error

When your project has:

```json
{
  "type": "module"
}
```

this will not work in a normal `.js` ES module:

```js
const fs = require("node:fs");
```

Use this instead:

```js
import fs from "node:fs";
```

Or use a `.cjs` file for CommonJS code.

### 12.5 `__dirname` in ES modules

CommonJS provides `__dirname`, but a normal ES module does not. Use this pattern when you need the current file's directory:

```js
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname);
```

---

## 13. Built-in Modules

Node.js includes many modules. You do not need to install them with npm.

| Module | What it does |
|---|---|
| `node:fs` | Reads and writes files |
| `node:path` | Works with file and folder paths |
| `node:http` | Creates HTTP servers and makes HTTP requests |
| `node:https` | Works with secure HTTPS connections |
| `node:url` | Parses and creates URLs |
| `node:events` | Creates and handles events |
| `node:os` | Gives operating-system information |
| `node:crypto` | Provides cryptographic functions |
| `node:stream` | Processes data in chunks |
| `node:buffer` | Handles binary data |
| `node:util` | Provides helper utilities |
| `node:readline` | Reads input from a terminal |
| `node:assert` | Checks conditions in tests |
| `node:test` | Runs automated tests |

Import a built-in module with the `node:` prefix:

```js
import os from "node:os";

console.log("Operating system:", os.platform());
console.log("Architecture:", os.arch());
console.log("Free memory:", os.freemem());
```

The `node:` prefix makes it clear that the module comes from Node.js itself.

---

## 14. The process Object

`process` is a global object that provides information and control about the current Node.js process.

```js
console.log("Node version:", process.version);
console.log("Operating system:", process.platform);
console.log("Current folder:", process.cwd());
console.log("Process ID:", process.pid);
```

Useful properties and methods:

- `process.version`: Node.js version.
- `process.platform`: operating-system platform.
- `process.cwd()`: current working directory.
- `process.argv`: command-line arguments.
- `process.env`: environment variables.
- `process.exitCode`: exit code for the process.

### Read command-line arguments

Run:

```bash
node app.js Akash
```

Code:

```js
const name = process.argv[2];

console.log(`Hello, ${name ?? "friend"}!`);
```

`process.argv` is an array. The first two entries are normally the Node executable path and script path. User-provided arguments start at index `2`.

---

## 15. Environment Variables

Environment variables are values provided to an application from outside its source code. They are useful for settings such as the server port, database URL, and API keys.

Example:

```js
const port = process.env.PORT || 3000;
console.log(`Server port: ${port}`);
```

Set an environment variable for one terminal session.

PowerShell:

```powershell
$env:PORT = "4000"
node index.js
```

Command Prompt:

```cmd
set PORT=4000
node index.js
```

macOS or Linux:

```bash
PORT=4000 node index.js
```

### Using a `.env` file

A `.env` file is a convenient way to store local configuration values:

```env
PORT=3000
APP_NAME=My Node App
```

Recent Node.js versions can load an env file with the command-line option:

```bash
node --env-file=.env index.js
```

Then access the values through `process.env`:

```js
console.log(process.env.APP_NAME);
```

A package such as `dotenv` is another common option. Do not commit real secrets. Add `.env` to `.gitignore`, and provide a safe `.env.example` containing placeholder values.

---

## 16. Working with Files: fs

The `node:fs` module lets a program work with files and folders.

For most application code, the promise-based API is convenient because it works with `async`/`await`.

### 16.1 Read a text file

Create `message.txt`:

```text
Hello Node.js!
```

Create `read-file.js`:

```js
import { readFile } from "node:fs/promises";

try {
  // Read the file as text using UTF-8 encoding.
  const content = await readFile("message.txt", "utf8");
  console.log(content);
} catch (error) {
  console.error("Could not read the file:", error.message);
}
```

This example uses top-level `await`, which works in an ES module.

### 16.2 Write a file

```js
import { writeFile } from "node:fs/promises";

try {
  await writeFile("notes.txt", "I am learning Node.js.\n", "utf8");
  console.log("File created or replaced successfully.");
} catch (error) {
  console.error("Could not write the file:", error.message);
}
```

`writeFile()` creates the file if it does not exist. If it already exists, it replaces the old content by default.

### 16.3 Append to a file

```js
import { appendFile } from "node:fs/promises";

await appendFile("notes.txt", "This line was added later.\n", "utf8");
```

### 16.4 Create a folder

```js
import { mkdir } from "node:fs/promises";

await mkdir("data/users", { recursive: true });
```

`recursive: true` creates missing parent folders too.

### 16.5 Delete a file

```js
import { unlink } from "node:fs/promises";

await unlink("notes.txt");
```

### 16.6 Check whether a file exists

A common pattern is to try the operation and handle its error. Avoid checking for existence and then using the file as two separate steps when a race condition could occur.

```js
import { access } from "node:fs/promises";

try {
  await access("message.txt");
  console.log("The file is accessible.");
} catch {
  console.log("The file is missing or cannot be accessed.");
}
```

### 16.7 Synchronous versus asynchronous file methods

- `readFileSync()` waits until the file operation finishes. It blocks the JavaScript thread.
- `readFile()` or `fs/promises.readFile()` lets other work continue while the I/O operation is pending.

Synchronous methods can be fine for small startup scripts. For server request handling, prefer asynchronous methods in most cases.

---

## 17. Working with Paths: path

The `node:path` module helps build file paths correctly on different operating systems.

Do not assume every computer uses `/` as the path separator. Windows often uses `\`, while macOS and Linux normally use `/`.

```js
import path from "node:path";

const filePath = path.join("data", "users", "user.json");

console.log(filePath);
console.log(path.basename(filePath)); // user.json
console.log(path.dirname(filePath));  // data/users (format depends on OS)
console.log(path.extname(filePath));  // .json
```

### Use an absolute path based on the current module

A relative file path is usually resolved from the process's current working directory, not automatically from the JavaScript file's folder. This can surprise beginners when they run a script from a different directory.

For a predictable path relative to the current ES module:

```js
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);
const currentFolder = path.dirname(currentFile);
const dataFolder = path.join(currentFolder, "data");

console.log(dataFolder);
```

This is especially useful when creating data folders for a backend project.

---

## 18. Working with JSON

**JSON** means JavaScript Object Notation. It is a text format commonly used to exchange data between applications and APIs.

Example JSON:

```json
{
  "name": "Alex",
  "age": 22,
  "isStudent": true
}
```

JSON uses double quotes around property names and string values. It does not support JavaScript functions, comments, or `undefined`.

### Convert a JavaScript object to JSON text

```js
const user = {
  name: "Alex",
  age: 22
};

const jsonText = JSON.stringify(user, null, 2);
console.log(jsonText);
```

### Convert JSON text to a JavaScript value

```js
const jsonText = '{"name":"Alex","age":22}';
const user = JSON.parse(jsonText);

console.log(user.name);
```

`JSON.parse()` can throw an error if the input is invalid JSON. Use `try...catch` when the text may be incorrect.

### Save JSON in a file

```js
import { writeFile, readFile } from "node:fs/promises";

const user = { name: "Alex", age: 22 };

await writeFile("user.json", JSON.stringify(user, null, 2));

const text = await readFile("user.json", "utf8");
const savedUser = JSON.parse(text);

console.log(savedUser);
```

JSON files are useful for learning and small tools. A database is usually a better choice for important application data that needs searching, relationships, concurrent updates, or reliable backups.

---

## 19. Synchronous and Asynchronous Code

**Synchronous code** runs one step at a time. The next line waits for the current operation to finish.

```js
console.log("First");
console.log("Second");
console.log("Third");
```

Output:

```text
First
Second
Third
```

**Asynchronous code** can start an operation and continue running other code while waiting for the result.

```js
console.log("First");

setTimeout(() => {
  console.log("Second");
}, 1000);

console.log("Third");
```

Likely output:

```text
First
Third
Second
```

The timer callback runs later. This does not mean every asynchronous operation runs at the same time on the JavaScript thread. Node.js uses the event loop and operating-system or worker-pool support to manage many I/O operations.

---

## 20. Callbacks

A **callback** is a function passed to another function so it can be called later.

```js
function greet(name, callback) {
  console.log(`Hello, ${name}`);
  callback();
}

function sayGoodbye() {
  console.log("Goodbye!");
}

greet("Alex", sayGoodbye);
```

A callback is not automatically asynchronous. It can run immediately or later, depending on the function that receives it.

### Callback with an asynchronous file operation

```js
import { readFile } from "node:fs";

readFile("message.txt", "utf8", (error, content) => {
  if (error) {
    console.error("Read failed:", error.message);
    return;
  }

  console.log(content);
});
```

Many older Node.js APIs use the **error-first callback pattern**: the first argument is an error (or `null`), and the next argument contains the result.

### Callback nesting

Many deeply nested callbacks can become difficult to read. Promises and `async`/`await` help organize asynchronous code.

---

## 21. Promises

A **Promise** represents the future result of an asynchronous operation.

A promise has three states:

- `pending`: the work has not finished.
- `fulfilled`: the work succeeded.
- `rejected`: the work failed.

Example:

```js
const myPromise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("The task was successful.");
  } else {
    reject(new Error("The task failed."));
  }
});

myPromise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error.message);
  })
  .finally(() => {
    console.log("The task has finished.");
  });
```

- `resolve(value)` marks the promise as successful.
- `reject(error)` marks it as failed.
- `.then()` handles success.
- `.catch()` handles failure.
- `.finally()` runs after success or failure.

### Promise.all()

Use `Promise.all()` when several independent promises must all succeed.

```js
const results = await Promise.all([
  fetch("https://jsonplaceholder.typicode.com/users/1"),
  fetch("https://jsonplaceholder.typicode.com/posts/1")
]);

console.log(results.map((response) => response.status));
```

If one promise rejects, `Promise.all()` rejects. Other useful methods include `Promise.allSettled()`, `Promise.race()`, and `Promise.any()`.

---

## 22. async and await

`async` and `await` make promise-based code easier to read.

- An `async` function always returns a promise.
- `await` pauses that async function until the promise settles. It does not block the entire Node.js process.
- Use `try...catch` to handle errors from awaited promises.

```js
import { readFile } from "node:fs/promises";

async function readMessage() {
  try {
    const message = await readFile("message.txt", "utf8");
    console.log(message);
  } catch (error) {
    console.error("Something went wrong:", error.message);
  }
}

readMessage();
```

### Fetch data from an API

Modern supported Node.js versions provide a global `fetch()` function.

```js
async function getUser() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");

    // fetch does not reject only because the server returns 404 or 500.
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const user = await response.json();
    console.log(user.name);
  } catch (error) {
    console.error("Could not get user:", error.message);
  }
}

getUser();
```

### Run independent tasks together

```js
const [first, second] = await Promise.all([
  fetch("https://jsonplaceholder.typicode.com/users/1"),
  fetch("https://jsonplaceholder.typicode.com/users/2")
]);

console.log(first.status, second.status);
```

Use `Promise.all()` only when the operations are independent. If the second operation needs the result of the first, run them in order.

---

## 23. The Event Loop

The **event loop** is an important part of Node.js. It helps Node.js handle many asynchronous operations without creating a separate JavaScript thread for every request.

A simple way to think about it:

1. Node.js runs your JavaScript code.
2. When code starts an asynchronous operation, Node.js or the operating system handles the waiting work where possible.
3. When that work is ready, its callback is scheduled.
4. The event loop runs the callback when the JavaScript thread can do so.

Example:

```js
console.log("A");

setTimeout(() => {
  console.log("B: timer callback");
}, 0);

Promise.resolve().then(() => {
  console.log("C: promise callback");
});

console.log("D");
```

A common output in Node.js is:

```text
A
D
C: promise callback
B: timer callback
```

Promise callbacks (microtasks) are processed before the timer callback in this example. Do not depend on a timer running at an exact millisecond; `setTimeout(fn, 0)` means the callback is eligible to run after the current work, not that it runs immediately.

### Why should we care?

A long CPU-heavy loop can block the event loop. While it is running, other callbacks cannot get a turn on the JavaScript thread. Keep request handlers quick. For expensive CPU work, consider worker threads or a separate job-processing service.

---

## 24. Timers

Node.js provides timer functions.

### setTimeout()

Runs a callback once after at least the specified delay.

```js
setTimeout(() => {
  console.log("This runs later.");
}, 2000);
```

### setInterval()

Repeatedly runs a callback after the specified interval until cleared.

```js
const intervalId = setInterval(() => {
  console.log("Checking status...");
}, 3000);

// Stop the interval after 10 seconds.
setTimeout(() => {
  clearInterval(intervalId);
  console.log("Stopped checking.");
}, 10000);
```

### setImmediate()

Schedules a callback to run after the current event-loop phase, subject to Node.js event-loop behavior.

```js
setImmediate(() => {
  console.log("Runs in a later event-loop turn.");
});
```

Timers are useful for repeated checks, cleanup tasks, and simple delays. For reliable production scheduling across restarts or multiple servers, use a proper job queue or scheduler rather than relying only on an in-memory timer.

---

## 25. Events and EventEmitter

Node.js often uses an event-driven style. An event is a signal that something happened.

The `EventEmitter` class from `node:events` lets us create our own events.

```js
import { EventEmitter } from "node:events";

const notification = new EventEmitter();

// Listen for the "message" event.
notification.on("message", (text) => {
  console.log("New message:", text);
});

// Emit (send) the event.
notification.emit("message", "Hello from EventEmitter!");
```

Useful methods:

- `.on(eventName, listener)`: listen every time the event happens.
- `.once(eventName, listener)`: listen only once.
- `.emit(eventName, ...args)`: trigger an event.
- `.off(eventName, listener)`: remove a listener.

An event named `error` has special behavior in EventEmitter. Make sure errors are handled according to the API you are using; an unhandled `error` event can stop the process.

---

## 26. Buffers

A **Buffer** is used to work with binary data. Computers store files and network data as bytes. Buffers let Node.js handle those bytes.

```js
const buffer = Buffer.from("Hello", "utf8");

console.log(buffer);          // Byte data
console.log(buffer.toString()); // Convert bytes back to text
console.log(buffer.length);   // Number of bytes
```

Buffers are useful for file uploads, images, audio, network packets, and streams. A string's character count and its UTF-8 byte length are not always the same.

---

## 27. Streams

A **stream** processes data piece by piece instead of loading all of it into memory at once.

Streams are useful for large files, network connections, and media.

The four main stream types are:

- **Readable:** provides data to read.
- **Writable:** accepts data to write.
- **Duplex:** can read and write.
- **Transform:** reads data, changes it, and outputs new data.

### Read a large file as a stream

```js
import { createReadStream } from "node:fs";

const stream = createReadStream("large-file.txt", {
  encoding: "utf8"
});

stream.on("data", (chunk) => {
  console.log("Received a chunk:", chunk.length);
});

stream.on("end", () => {
  console.log("Finished reading the file.");
});

stream.on("error", (error) => {
  console.error("Stream error:", error.message);
});
```

### Pipe one stream into another

```js
import { createReadStream, createWriteStream } from "node:fs";

const source = createReadStream("large-file.txt");
const destination = createWriteStream("copy.txt");

source.pipe(destination);

destination.on("finish", () => {
  console.log("File copied.");
});

destination.on("error", (error) => {
  console.error(error.message);
});
```

For more advanced stream pipelines, Node.js provides `pipeline()` in `node:stream/promises`, which helps forward errors and clean up streams.

---

## 28. Create a Web Server with http

Node.js includes the `node:http` module. We can create a basic web server without installing an external package.

Create `server.js`:

```js
import { createServer } from "node:http";

const hostname = "127.0.0.1";
const port = 3000;

const server = createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader("Content-Type", "text/plain; charset=utf-8");
  response.end("Hello from my Node.js server!");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

Run it:

```bash
node server.js
```

Open this address in your browser:

```text
http://127.0.0.1:3000
```

The browser sends a request. The server sends a response. Keep the terminal running while you test the server. Press `Ctrl + C` to stop it.

---

## 29. HTTP Request and Response

HTTP is a communication protocol used by browsers, APIs, and servers.

A request commonly contains:

- **Method:** what the client wants to do (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`).
- **URL/path:** which resource it wants.
- **Headers:** extra information about the request.
- **Body:** optional data sent by the client.

A response commonly contains:

- **Status code:** whether the request succeeded or failed.
- **Headers:** information about the response.
- **Body:** the returned content.

### Common HTTP methods

| Method | Common purpose |
|---|---|
| `GET` | Read data |
| `POST` | Create data or start an action |
| `PUT` | Replace a resource |
| `PATCH` | Update part of a resource |
| `DELETE` | Delete a resource |

### Common status codes

| Code | Meaning |
|---|---|
| `200` | OK |
| `201` | Created |
| `204` | No Content |
| `400` | Bad Request |
| `401` | Unauthorized / authentication required |
| `403` | Forbidden |
| `404` | Not Found |
| `405` | Method Not Allowed |
| `409` | Conflict |
| `429` | Too Many Requests |
| `500` | Internal Server Error |
| `503` | Service Unavailable |

The correct status code depends on what happened. Do not return `200` for every situation.

---

## 30. Build a Small REST API

A **REST API** lets a client work with resources through HTTP. This example uses an in-memory array, so its data disappears when the server restarts. A real application should use a database or another persistent store.

Create `api.js`:

```js
import { createServer } from "node:http";

const users = [
  { id: 1, name: "Alex" },
  { id: 2, name: "Sam" }
];

const server = createServer(async (request, response) => {
  // Set a JSON response type for every route in this small example.
  response.setHeader("Content-Type", "application/json; charset=utf-8");

  const url = new URL(request.url, `http://${request.headers.host}`);

  if (request.method === "GET" && url.pathname === "/users") {
    response.writeHead(200);
    response.end(JSON.stringify(users));
    return;
  }

  if (request.method === "GET" && url.pathname.startsWith("/users/")) {
    const id = Number(url.pathname.split("/")[2]);
    const user = users.find((item) => item.id === id);

    if (!user) {
      response.writeHead(404);
      response.end(JSON.stringify({ message: "User not found" }));
      return;
    }

    response.writeHead(200);
    response.end(JSON.stringify(user));
    return;
  }

  if (request.method === "POST" && url.pathname === "/users") {
    try {
      let body = "";

      // Collect the incoming request body.
      for await (const chunk of request) {
        body += chunk;

        // Simple size limit for this learning example.
        if (body.length > 1_000_000) {
          response.writeHead(413);
          response.end(JSON.stringify({ message: "Request body is too large" }));
          return;
        }
      }

      const data = JSON.parse(body);

      if (typeof data.name !== "string" || data.name.trim() === "") {
        response.writeHead(400);
        response.end(JSON.stringify({ message: "A name is required" }));
        return;
      }

      const newUser = {
        id: users.length ? Math.max(...users.map((user) => user.id)) + 1 : 1,
        name: data.name.trim()
      };

      users.push(newUser);
      response.writeHead(201);
      response.end(JSON.stringify(newUser));
      return;
    } catch {
      response.writeHead(400);
      response.end(JSON.stringify({ message: "Invalid JSON" }));
      return;
    }
  }

  response.writeHead(404);
  response.end(JSON.stringify({ message: "Route not found" }));
});

server.listen(3000, "127.0.0.1", () => {
  console.log("API running at http://127.0.0.1:3000");
});
```

Run:

```bash
node api.js
```

Test these routes with a browser, Postman, Insomnia, or `curl`:

```bash
curl http://127.0.0.1:3000/users
curl http://127.0.0.1:3000/users/1
```

Create a user:

```bash
curl -X POST http://127.0.0.1:3000/users -H "Content-Type: application/json" -d "{\"name\":\"Taylor\"}"
```

This example teaches routing, HTTP methods, status codes, JSON, request bodies, and basic validation. It is a learning example, not a production-ready API. Production code also needs stronger validation, request limits, authentication where required, logging, security controls, and persistent storage.

---

## 31. Express.js

**Express** is a popular web framework for Node.js. It makes routing and middleware easier than writing every HTTP detail yourself.

Install it:

```bash
npm install express
```

Create `server.js`:

```js
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

// Parse JSON request bodies and make the result available as req.body.
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "Alex" },
    { id: 2, name: "Sam" }
  ]);
});

app.post("/api/users", (req, res) => {
  const { name } = req.body;

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ message: "A name is required" });
  }

  res.status(201).json({ message: "User received", name: name.trim() });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```

Because this guide uses ES modules, make sure `package.json` contains:

```json
{
  "type": "module"
}
```

Start the server:

```bash
node server.js
```

### What are `req` and `res`?

- `req` (request) contains information sent by the client.
- `res` (response) is used to send information back to the client.

Common request properties:

- `req.params`: values from route parameters.
- `req.query`: values from the URL query string.
- `req.body`: parsed request body, when suitable body-parsing middleware is installed.
- `req.headers`: request headers.

Common response methods:

- `res.send()`: send a response.
- `res.json()`: send JSON.
- `res.status()`: set the HTTP status code.
- `res.redirect()`: redirect the client.

---

## 32. Middleware

**Middleware** is a function that runs during the request-response process. It can read or change request data, check permissions, log information, or pass control to the next middleware.

In Express, middleware commonly receives `req`, `res`, and `next`.

```js
function requestLogger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next(); // Continue to the next middleware or route.
}

app.use(requestLogger);
```

### Common middleware uses

- Logging requests.
- Parsing JSON bodies (`express.json()`).
- Authentication and authorization.
- Checking input.
- Handling errors.
- Enabling CORS with a suitable configuration.

**Important:** If middleware neither sends a response nor calls `next()`, the request may remain unfinished. Do not call `next()` after already sending a response.

---

## 33. Working with Databases

A database stores application data so it can be used after the server restarts.

Popular database choices include:

- **PostgreSQL:** a relational SQL database.
- **MySQL:** a relational SQL database.
- **SQLite:** a small relational database stored in a file.
- **MongoDB:** a document-oriented NoSQL database.
- **Redis:** an in-memory data store often used for caching and other fast data tasks.

### What is SQL?

SQL is a language used to work with relational databases. MySQL and PostgreSQL are database systems that use SQL.

Example SQL:

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO users (id, name, email)
VALUES (1, 'Alex', 'alex@example.com');

SELECT id, name, email FROM users;
```

### Connect Node.js to a database

You normally install a driver or an Object-Relational Mapper (ORM) / Object-Document Mapper (ODM), then use its API.

Examples of tools:

- PostgreSQL: `pg` or Prisma.
- MySQL: `mysql2` or Prisma.
- MongoDB: the official `mongodb` driver or Mongoose.
- SQLite: Node.js built-in SQLite support in supported Node.js versions, or a library such as `better-sqlite3`.

Read the selected tool's current documentation before using it. Connection setup, transactions, migrations, and security depend on the database.

### Example idea: CRUD

CRUD means:

- **Create:** add a record.
- **Read:** get a record.
- **Update:** change a record.
- **Delete:** remove a record.

A user API often has routes such as:

```text
POST   /users       Create a user
GET    /users       Get all users
GET    /users/:id   Get one user
PATCH  /users/:id   Update part of a user
DELETE /users/:id   Delete a user
```

Never build SQL by joining untrusted user input into a query string. Use parameterized queries or a safe query builder to reduce SQL injection risk.

---

## 34. Error Handling

An error is a problem that stops an operation from completing normally. Good error handling helps the application fail safely and makes debugging easier.

### try...catch

```js
try {
  const result = JSON.parse('{"name":"Alex"}');
  console.log(result.name);
} catch (error) {
  console.error("Could not parse JSON:", error.message);
}
```

### Throw a custom error

```js
function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }

  return a / b;
}

try {
  console.log(divide(10, 0));
} catch (error) {
  console.error(error.message);
}
```

### Handle promise errors

```js
async function loadData() {
  try {
    const response = await fetch("https://example.com/data");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Loading failed:", error.message);
    throw error; // Pass the error to the caller when it must handle it.
  }
}
```

Do not silently ignore errors. Also, do not send internal stack traces, database details, passwords, or secret values to public API clients.

### Express error-handling middleware

```js
function errorHandler(error, req, res, next) {
  console.error(error);

  if (res.headersSent) {
    return next(error);
  }

  res.status(500).json({
    message: "Something went wrong"
  });
}

app.use(errorHandler); // Register after routes and other middleware.
```

---

## 35. Input Validation

**Validation** means checking that user input is present and has the correct type, length, and format before using it.

Example:

```js
function validateUser(data) {
  if (!data || typeof data !== "object") {
    return "A user object is required";
  }

  if (typeof data.name !== "string" || data.name.trim().length < 2) {
    return "Name must contain at least 2 characters";
  }

  if (typeof data.email !== "string" || !data.email.includes("@")) {
    return "A valid email address is required";
  }

  return null;
}
```

This example is intentionally simple. Checking for `@` is not complete email validation. Real projects should use a well-maintained validation library and verify important information when necessary.

Validate data on the server even when the browser already validates it. A client can send requests without using your website's form.

---

## 36. Authentication and Password Security

**Authentication** asks: "Who are you?"

**Authorization** asks: "What are you allowed to do?"

A common authentication flow:

1. A user registers with an email and password.
2. The server validates the input.
3. The server hashes the password with a password-hashing algorithm.
4. The server stores the password hash, not the original password.
5. During login, the server checks the submitted password against the stored hash.
6. The server creates a session or issues a token.
7. Protected routes check the user's identity and permissions.

### Password rules

- Never store plain-text passwords.
- Do not use fast general-purpose hashes such as plain SHA-256 for password storage.
- Use a dedicated password-hashing algorithm such as Argon2id, scrypt, or bcrypt with appropriate settings.
- Use HTTPS in production.
- Add rate limiting to login and password-reset endpoints.
- Never log passwords or tokens.

### Sessions and tokens

- **Session authentication:** the server stores session state and the browser usually stores a session cookie.
- **Token authentication:** the client sends a token with requests. JWT is one token format, not a complete authentication system by itself.

Choose a design carefully. Secure cookie settings, token expiration, refresh behavior, logout, CSRF protection, and permissions all matter.

---

## 37. Testing

Testing checks whether your code behaves as expected.

Common test levels:

- **Unit test:** checks one small function or module.
- **Integration test:** checks whether multiple parts work together.
- **End-to-end test:** checks a complete user or application flow.

Node.js includes a built-in test runner.

Create `math.js`:

```js
export function add(a, b) {
  return a + b;
}
```

Create `math.test.js`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { add } from "./math.js";

test("add returns the sum of two numbers", () => {
  assert.equal(add(2, 3), 5);
});
```

Run tests:

```bash
node --test
```

Other popular testing tools include Vitest, Jest, and Supertest. Choose tools that fit your project and learn how to test both successful and failing cases.

---

## 38. Debugging and Logging

**Debugging** means finding and fixing the cause of a problem.

### Use console methods

```js
console.log("Normal information");
console.warn("Warning message");
console.error("Something failed");
console.table([
  { name: "Alex", age: 22 },
  { name: "Sam", age: 24 }
]);
```

### Read the error message

When an error occurs:

1. Read the error type and message.
2. Look at the file name and line number in the stack trace.
3. Open that line in your editor.
4. Check the values and function calls around it.
5. Reproduce the problem with a small example.
6. Fix the cause, then run the test again.

### Use Node.js inspector

Run:

```bash
node --inspect-brk app.js
```

This starts the program with the debugger available and pauses at the beginning. You can connect with supported developer tools, such as Chrome DevTools, to add breakpoints and inspect variables.

### Logging in real projects

For larger applications, use a structured logger such as Pino or Winston. Avoid logging secrets, authentication headers, passwords, or private user data.

---

## 39. Security Best Practices

Security must be considered from the beginning, not added only at the end.

- Keep Node.js and dependencies updated to supported versions.
- Validate all input on the server.
- Use parameterized database queries.
- Store secrets in environment variables or a secure secret manager.
- Do not upload `.env`, private keys, or credentials to GitHub.
- Use HTTPS in production.
- Configure CORS for the origins that really need access; do not use `*` carelessly with credentials.
- Set request body size limits.
- Add rate limiting to public endpoints where appropriate.
- Use secure cookie settings when using cookies.
- Give database users only the permissions they need.
- Avoid exposing stack traces and internal details to clients.
- Review dependencies and remove packages you do not use.
- Use security headers with a suitable configuration.
- Back up important data and test restoring it.

A package being popular does not automatically make every use of it secure. Read its documentation and understand how it handles data.

---

## 40. Performance Basics

Performance means how efficiently an application uses time, memory, CPU, and network resources.

Useful habits:

1. Prefer asynchronous I/O for server operations.
2. Avoid large CPU-heavy tasks on the event loop.
3. Use streams for large files rather than loading everything into memory.
4. Add database indexes for queries that need them, and check query performance.
5. Use pagination when returning large collections.
6. Cache data only when you understand how it becomes stale.
7. Compress responses where useful.
8. Measure performance before optimizing.
9. Use worker threads or background jobs for suitable CPU-heavy tasks.
10. Close resources and clean up timers and event listeners when they are no longer needed.

Do not guess what is slow. Measure it first.

---

## 41. Deploy a Node.js App

**Deployment** means making an application available on a server or hosting platform so other people can use it.

A basic deployment process:

1. Finish and test the application locally.
2. Put the code in a Git repository.
3. Choose a hosting provider that supports your Node.js app.
4. Set the Node.js version or runtime supported by the provider.
5. Configure environment variables in the hosting dashboard.
6. Install dependencies with the lock file.
7. Run the start command, such as `npm start`.
8. Connect a database if the application needs one.
9. Configure a domain and HTTPS when required.
10. Check logs, health, backups, and monitoring after deployment.

### Listen on the provided port

Hosting platforms often provide a port through an environment variable. Use it instead of always hardcoding `3000`:

```js
const port = process.env.PORT || 3000;

server.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port ${port}`);
});
```

The correct host binding depends on the hosting environment. Local development may use `127.0.0.1`; many container platforms need the app to listen on `0.0.0.0`.

### Production checklist

- Use a supported Node.js release.
- Set production environment variables.
- Do not use test data or test credentials.
- Keep secrets out of source control.
- Use a production database with backups.
- Handle errors and log useful information.
- Add a health-check route if your platform needs one.
- Confirm that the app restarts safely after a crash or deployment.

---

## 42. Common Node.js Errors and Fixes

### 1. `require is not defined in ES module scope`

**Cause:** Your project is using ES modules, usually because `package.json` contains `"type": "module"`, but your code uses CommonJS `require()`.

**Fix:** Use `import`:

```js
import fs from "node:fs";
```

Or move that CommonJS code to a `.cjs` file.

### 2. `Cannot use import statement outside a module`

**Cause:** Node.js is treating the file as CommonJS.

**Fix:** Add `"type": "module"` to `package.json`, or rename the file to `.mjs`.

### 3. `__dirname is not defined in ES module scope`

**Cause:** `__dirname` is a CommonJS variable.

**Fix:** Create it with `fileURLToPath(import.meta.url)` and `path.dirname()`. See [Node.js Modules](#12-nodejs-modules).

### 4. `Cannot find module` or `ERR_MODULE_NOT_FOUND`

**Possible causes:**

- The file path is wrong.
- The package is not installed.
- The import extension is missing in a relative ES module import.
- The file name has a spelling or capitalization mistake.

**Fix:** Check the exact path, install the missing package, and include extensions such as `./routes.js` in relative ESM imports.

### 5. `EADDRINUSE: address already in use`

**Cause:** Another process is already using the port.

**Fix:** Stop the other server, or choose another port such as `3001`. On Windows, `netstat -ano | findstr :3000` can help identify the process using port 3000. Use the process ID carefully before stopping anything.

### 6. `ENOENT: no such file or directory`

**Cause:** Node.js cannot find the path you provided. A folder may not exist, or a relative path may be resolved from a different working directory than you expected.

**Fix:** Check the path, create required folders with `mkdir(..., { recursive: true })`, and use an absolute path when needed.

### 7. `Cannot read properties of undefined`

**Cause:** Your code tried to read a property from a value that is `undefined`.

**Fix:** Check where the value comes from. Confirm that the data exists and that the property name is correct before using it.

### 8. `Unexpected token` while parsing JSON

**Cause:** The text is not valid JSON, or the request body is empty or incomplete.

**Fix:** Check the input, set the correct `Content-Type`, collect the full request body, and handle `JSON.parse()` with `try...catch`.

### 9. `ERR_STREAM_WRITE_AFTER_END` or headers already sent

**Cause:** Your code tried to write to a response after it was already finished, or it sent more than one response for the same request.

**Fix:** After sending a response with `res.end()` or an Express `res.send()` / `res.json()`, return from that route handler. Make sure every request path sends only one response.

### 10. A file is created in the wrong folder

**Cause:** A relative path is normally resolved from `process.cwd()`, which is the directory where the process was started.

**Fix:** Print `process.cwd()` to see the current working directory. Use `path.join()` with an absolute base directory when the file must be stored relative to your project.

### 11. `npm` or `node` is not recognized

**Cause:** Node.js may not be installed correctly, or its installation folder may not be in PATH.

**Fix:** Reinstall using the official installer or configure your version manager, then reopen the terminal.

---

## 43. A to Z Node.js Glossary

| Letter | Term | Easy meaning |
|---|---|---|
| A | API | A defined way for software systems to communicate. |
| A | Asynchronous | Code that can continue while waiting for an operation to finish. |
| B | Backend | The server-side part of an application. |
| B | Buffer | A place in memory for binary bytes. |
| C | Callback | A function passed to another function to be called later or at a chosen time. |
| C | CommonJS | A Node.js module system that uses `require()` and `module.exports`. |
| C | CLI | A command-line interface used from a terminal. |
| D | Dependency | A package or module that another part of a project needs. |
| E | Event | A signal that something happened. |
| E | Event Loop | The mechanism that coordinates asynchronous callbacks in Node.js. |
| E | Express | A popular web framework for Node.js. |
| F | File System (`fs`) | Node.js features for reading and writing files. |
| G | Global | A value available without importing it in the current scope. |
| H | HTTP | A protocol used for communication between clients and servers. |
| I | I/O | Input and output, such as file or network operations. |
| J | JSON | A text format for storing and exchanging data. |
| K | Kernel | The core part of an operating system; Node.js can use operating-system support for I/O work. |
| L | LTS | Long-Term Support; a release line intended for stable use over a longer period. |
| M | Middleware | A function that runs during a request-response process. |
| M | Module | A reusable unit of code, often a file or package. |
| N | Node.js | A runtime for running JavaScript outside a browser. |
| N | npm | A package manager commonly used with Node.js. |
| O | ORM | A tool that helps work with a database using program objects and methods. |
| P | Package | Reusable code distributed for installation. |
| P | Promise | An object representing the future result of an asynchronous operation. |
| Q | Query | A request for data, often sent to a database. |
| R | REST | A common style for designing network APIs around resources. |
| R | Runtime | The environment that executes a program. |
| S | Server | A program that receives requests and sends responses. |
| S | Stream | A way to process data in pieces. |
| T | Thread | A path of execution in a process. |
| U | URL | An address used to identify a resource. |
| V | V8 | The JavaScript engine used by Node.js. |
| W | Worker Thread | A separate JavaScript thread useful for certain CPU-heavy tasks. |
| X | XML | A markup format sometimes used to exchange structured data. |
| Y | Yarn | A package manager alternative to npm. |
| Z | Zero-downtime deployment | A deployment approach designed to avoid interrupting service. |

---

## 44. Useful npm Commands

| Command | Purpose |
|---|---|
| `npm init -y` | Create a `package.json` quickly |
| `npm install` | Install dependencies from the project files |
| `npm install package-name` | Install a package |
| `npm install -D package-name` | Install a development dependency |
| `npm uninstall package-name` | Remove a package |
| `npm update` | Update dependencies within allowed version ranges |
| `npm run` | List available scripts |
| `npm start` | Run the `start` script |
| `npm run dev` | Run the `dev` script, if defined |
| `npm test` | Run the `test` script, if defined |
| `npm list` | Show installed packages |
| `npm outdated` | Show packages with newer versions available |
| `npm audit` | Check dependencies for known security advisories |
| `npm cache verify` | Verify npm's local cache |

Before updating dependencies in an important project, read release notes and run your tests.

---

## 45. Practice Projects

The best way to learn Node.js is to build projects. Start small and add features one by one.

### Beginner projects

1. **Command-line calculator** – read numbers and an operation from the terminal.
2. **Notes app** – create, read, update, and delete notes in JSON files.
3. **File organizer** – move files into folders based on their extensions.
4. **Simple timer** – use `setTimeout()` and `setInterval()`.
5. **Random quote API** – return one quote as JSON.

### Intermediate projects

6. **Task Manager API** – create, read, update, and delete tasks.
7. **User Management API** – store users in a database and validate input.
8. **URL Shortener** – create short IDs that point to longer URLs.
9. **Weather API client** – request data from an external API and handle errors.
10. **Blog backend** – users, posts, comments, database operations, and authentication.

### Advanced projects

11. **Uptime Monitoring API** – save URLs, check their availability on a schedule, and record results.
12. **Real-time chat app** – use WebSocket technology for live messages.
13. **Job queue service** – process background work reliably.
14. **File upload service** – accept, validate, and store files safely.
15. **E-commerce backend** – products, orders, users, payments, and permissions.

For every project, write a README, use Git, validate user input, handle errors, and test important features.

---

## 46. A Suggested Learning Roadmap

Follow this order. Do not rush to advanced topics before you understand the basics.

| Level | Topics | Practice result |
|---|---|---|
| 1. Setup | Node.js, npm, terminal, running files | Run your first script |
| 2. JavaScript review | Functions, arrays, objects, classes, modules | Organize code into files |
| 3. Node basics | Built-in modules, `process`, environment variables | Build a command-line tool |
| 4. Files | `fs`, `path`, JSON, errors | Build a notes app |
| 5. Asynchronous JavaScript | Callbacks, promises, `async`/`await`, event loop | Read files and call APIs |
| 6. Node features | Events, buffers, streams, timers | Build a file-processing tool |
| 7. HTTP | Server, request, response, methods, status codes | Build a basic HTTP server |
| 8. APIs | REST, routing, validation, middleware | Build a CRUD API |
| 9. Databases | SQL or NoSQL, CRUD, indexes, relationships | Connect an API to a database |
| 10. Security | Authentication, authorization, password hashing, rate limits | Protect API routes |
| 11. Quality | Testing, debugging, logging, Git | Test and document your project |
| 12. Production | Deployment, environment configuration, monitoring | Publish your backend |

### What should you know before learning Node.js?

You do not need to master every JavaScript topic, but you should understand:

- Variables: `const`, `let`.
- Data types: strings, numbers, booleans, `null`, and `undefined`.
- Conditions: `if`, `else`, and `switch`.
- Loops: `for`, `while`, and array methods.
- Functions, parameters, and return values.
- Arrays and objects.
- Scope and modules.
- Callbacks and promises.

---

## 47. Final Checklist

Use this checklist to check your progress:

- [ ] I understand what Node.js is and why developers use it.
- [ ] I can install Node.js and check its version.
- [ ] I can run a JavaScript file from the terminal.
- [ ] I understand npm, `package.json`, and lock files.
- [ ] I can use ES modules and understand CommonJS.
- [ ] I can import built-in Node.js modules.
- [ ] I can use `process` and environment variables.
- [ ] I can read, write, append, and delete files.
- [ ] I understand file paths and the current working directory.
- [ ] I can work with JSON.
- [ ] I understand callbacks, promises, and `async`/`await`.
- [ ] I have a basic understanding of the event loop.
- [ ] I can use timers, events, buffers, and streams.
- [ ] I can create a basic HTTP server.
- [ ] I understand HTTP methods and status codes.
- [ ] I can build a REST API.
- [ ] I can use Express and middleware.
- [ ] I can connect an application to a database.
- [ ] I can validate input and handle errors.
- [ ] I understand authentication and password safety.
- [ ] I can write and run tests.
- [ ] I can debug a Node.js application.
- [ ] I know basic security and performance practices.
- [ ] I can deploy and monitor a backend project.

---

## 48. Official Learning Resources

Use official documentation when you need exact details or when an API changes.

- [Node.js – Introduction](https://nodejs.org/learn/getting-started/introduction-to-nodejs)
- [Node.js – Learn](https://nodejs.org/learn)
- [Node.js – API Documentation](https://nodejs.org/api/)
- [Node.js – Releases and Support Schedule](https://nodejs.org/en/about/previous-releases)
- [Node.js – Event Loop](https://nodejs.org/learn/asynchronous-work/event-loop-timers-and-nexttick)
- [Node.js – Don't Block the Event Loop](https://nodejs.org/learn/asynchronous-work/dont-block-the-event-loop)
- [npm Documentation](https://docs.npmjs.com/)
- [Express Documentation](https://expressjs.com/)
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

---

## Final Words

You do not need to memorize every Node.js method. Learn what each tool is for, understand the basic ideas, and practise by building real projects.

Start with small programs. Read error messages carefully. Search the official documentation when something is unclear. Use Git to save your progress, and explain what your own code does.

**Keep learning, keep building, and improve one step at a time.**

---

**Author:** Abdullah Raihan Akash  
**Topic:** Node.js A to Z  
**Purpose:** Beginner-friendly learning and revision notes
