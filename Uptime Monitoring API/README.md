# Uptime Monitoring API

A simple RESTful API built with **Node.js** to monitor websites and
URLs. Users can register, log in, create website checks, and monitor
whether their websites are up or down. The project also includes a
background worker and Twilio SMS notification integration.

> **Project status:** Core API and CRUD testing completed during
> development. Review the security and production-readiness notes before
> deploying this project publicly.

------------------------------------------------------------------------

## Table of Contents

1.  [About the Project](#about-the-project)
2.  [Main Features](#main-features)
3.  [Technologies Used](#technologies-used)
4.  [What I Learned: A to Z](#what-i-learned-a-to-z)
5.  [Project Structure](#project-structure)
6.  [How the Project Works](#how-the-project-works)
7.  [Installation and Setup](#installation-and-setup)
8.  [Run the Project](#run-the-project)
9.  [API Documentation](#api-documentation)
10. [Step-by-Step Postman Testing](#step-by-step-postman-testing)
11. [Additional Testing Checklist](#additional-testing-checklist)
12. [Problems I Faced and How I Solved
    Them](#problems-i-faced-and-how-i-solved-them)
13. [Security Notes](#security-notes)
14. [Future Improvements](#future-improvements)
15. [Author](#author)

------------------------------------------------------------------------

## About the Project

Uptime Monitoring API is a backend project that checks whether a website
is available.

For example, a user can add a website such as `example.com`. The API
stores the check details. A background worker periodically sends an HTTP
or HTTPS request to that website and checks its response status code.

The website status can be:

-   **UP:** The website returns a response code included in the check's
    `successCodes` list.
-   **DOWN:** The website returns an unexpected response, cannot be
    reached, or does not respond before the timeout.

The project is built to practise backend development, REST APIs,
authentication, file handling, background jobs, and API testing.

## Main Features

-   User registration
-   User login and token generation
-   Token expiration and token management
-   Create a website check
-   Read a check
-   Update a check
-   Delete a check
-   Store data in JSON files
-   Move deleted check files to a trash folder
-   Background worker for periodic website checks
-   Website UP/DOWN status calculation
-   Last checked time tracking
-   SMS notification integration using Twilio
-   Request validation and error handling

Some features depend on valid configuration. For example, SMS delivery
requires a working Twilio account and an authorized sender number.

## Technologies Used

  Technology           Purpose
  -------------------- -------------------------------------------------
  JavaScript           Main programming language
  Node.js              JavaScript runtime
  HTTP / HTTPS         Send website requests and create the API server
  REST API             Define API endpoints
  JSON                 Store and exchange data
  File System (`fs`)   Create, read, update, and delete files
  Postman              Test API endpoints
  Twilio               Send SMS notifications
  Yarn / npm           Manage project scripts and packages
  Git and GitHub       Version control and project hosting
  VS Code              Code editor

------------------------------------------------------------------------

## What I Learned: A to Z

This project helped me practise the following concepts.

### 1. JavaScript Fundamentals

-   Variables: `const`, `let`
-   Strings, numbers, booleans, arrays, and objects
-   Functions and callbacks
-   Arrow functions
-   Conditions and comparison operators
-   Loops and array methods
-   Error handling with `try...catch`
-   Modules and imports/exports
-   Working with JSON data

### 2. Node.js

-   What Node.js is and why it is used for backend development
-   Running JavaScript outside a browser
-   Creating a server with Node.js
-   Using built-in Node.js modules
-   Understanding asynchronous operations
-   Using callbacks to handle results

### 3. ES Modules

-   Using `import` and `export`
-   Default exports and named exports
-   Using `.js` files as ES modules
-   Understanding the `"type": "module"` setting in `package.json`
-   Using `import.meta.url` and `fileURLToPath()` to work with the
    current file path

### 4. HTTP and HTTPS

-   HTTP request and response
-   Request methods: GET, POST, PUT, DELETE
-   HTTP status codes
-   Request headers
-   URL paths and query parameters
-   Sending HTTP and HTTPS requests
-   Handling response, timeout, and error events

### 5. REST API Development

-   Creating REST API routes
-   Separating route handlers from server logic
-   Reading request data
-   Parsing JSON request bodies
-   Sending JSON responses
-   Handling unknown routes
-   Validating user input

### 6. Authentication

-   User registration
-   Password hashing
-   Login using phone number and password
-   Generating authentication tokens
-   Verifying tokens
-   Token expiration
-   Protecting user and check routes

### 7. File System

-   Creating directories
-   Creating JSON files
-   Reading files
-   Updating files
-   Deleting files
-   Listing files in a directory
-   Handling file-system errors
-   Organizing data into users, tokens, checks, and trash folders

### 8. Background Workers

-   Separating background work from API request handling
-   Running periodic checks
-   Sending HTTP/HTTPS requests to websites
-   Checking response status codes
-   Handling request errors and timeouts
-   Updating website status
-   Tracking the last checked time

### 9. SMS Integration

-   Understanding an external API integration
-   Preparing an SMS payload
-   Sending an HTTPS request to Twilio
-   Handling successful and failed SMS requests
-   Understanding that external credentials and an authorized sender are
    required

### 10. Testing and Debugging

-   Testing endpoints with Postman
-   Testing successful and unsuccessful requests
-   Checking response status codes
-   Checking JSON files created by the API
-   Reading Node.js error messages
-   Debugging import/export and file-path problems
-   Testing authentication and authorization

------------------------------------------------------------------------

## Project Structure

The exact files may change as the project grows. A typical structure for
this project is:

``` text
Uptime Monitoring API/
│
├── data/
│   ├── users/
│   ├── tokens/
│   ├── checks/
│   └── trash/
│       └── checks/
│
├── lib/
│   └── data.js
│
├── index.js
├── server.js
├── routes.js
├── workers.js
├── utilities.js
├── environment.js
├── notification.js
├── package.json
├── yarn.lock
└── README.md
```

### Important files

  -----------------------------------------------------------------------
  File                                Responsibility
  ----------------------------------- -----------------------------------
  `index.js`                          Starts the application

  `server.js`                         Creates the HTTP server and handles
                                      incoming requests

  `routes.js`                         Contains route handlers for users,
                                      tokens, and checks

  `workers.js`                        Runs periodic website checks

  `utilities.js`                      Contains helper functions such as
                                      JSON parsing and hashing

  `environment.js`                    Holds environment-specific
                                      configuration

  `notification.js`                   Handles Twilio SMS requests

  `lib/data.js`                       Handles JSON file storage
                                      operations
  -----------------------------------------------------------------------

### Data folders

-   `data/users/` stores user records.
-   `data/tokens/` stores authentication tokens.
-   `data/checks/` stores website check records.
-   `data/trash/checks/` stores deleted check records.

The application may create these folders when it first saves data.

------------------------------------------------------------------------

## How the Project Works

The basic workflow is:

1.  A user registers with their details.
2.  The user logs in with their phone number and password.
3.  The API creates an authentication token.
4.  The user sends the token in the request header to access protected
    routes.
5.  The user creates a website check.
6.  The API saves the check in a JSON file.
7.  The background worker reads saved checks.
8.  The worker sends a request to each website.
9.  The worker compares the response code with the check's
    `successCodes`.
10. The worker updates the website status and last checked time.
11. When the website changes from UP to DOWN or DOWN to UP, the
    notification code can send an SMS through Twilio.

### Website status example

Suppose a check has:

``` json
{
  "protocol": "https",
  "url": "example.com",
  "method": "get",
  "successCodes": [200, 201, 301],
  "timeOutSeconds": 5
}
```

If the website returns `200`, the result is UP because `200` is in
`successCodes`.

If the website returns `404`, the result is DOWN because `404` is not in
the list.

------------------------------------------------------------------------

## Installation and Setup

### Requirements

Install these tools before starting:

-   Node.js
-   npm (included with Node.js) or Yarn
-   Visual Studio Code
-   Postman
-   Git

Check Node.js and npm:

``` bash
node --version
npm --version
```

Check Yarn if you use it:

``` bash
yarn --version
```

### 1. Clone the repository

``` bash
git clone https://github.com/abdullahraihanakash/Web-Development.git
```

Open the project folder in VS Code. If this project is inside a
subfolder, move into that folder:

``` bash
cd "Uptime Monitoring API"
```

### 2. Install dependencies

Use the package manager that matches the lock file in the project.

With Yarn:

``` bash
yarn install
```

With npm:

``` bash
npm install
```

### 3. Configure environment variables

Keep private values such as secret keys and Twilio credentials outside
the source code.

Create a `.env` file if the project has been updated to load environment
variables. Add the variable names required by your configuration, for
example:

``` env
NODE_ENV=staging
PORT=3000
SECRET_KEY=replace_with_a_long_random_secret
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_FROM_PHONE=your_authorized_twilio_number
```

These names are examples. Match them to the names used by your actual
configuration code.

Add `.env` to `.gitignore`. Never upload real passwords, API keys,
tokens, or Twilio credentials to GitHub.

> If your current version still uses hard-coded configuration in
> `environment.js`, move those values to environment variables before
> publishing the repository.

------------------------------------------------------------------------

## Run the Project

Start the server using the script configured in `package.json`.

For example:

``` bash
yarn start
```

Or:

``` bash
npm start
```

If there is no start script, you can run the entry file directly:

``` bash
node index.js
```

Expected terminal output:

``` text
listening to port 3000
```

The exact message may be different in your code.

Keep the terminal running while testing with Postman.

------------------------------------------------------------------------

## API Documentation

Base URL:

``` text
http://localhost:3000
```

### User endpoints

  Method   Endpoint              Purpose
  -------- --------------------- -----------------
  POST     `/user`               Register a user
  GET      `/user?phone=PHONE`   Get a user
  PUT      `/user`               Update a user
  DELETE   `/user?phone=PHONE`   Delete a user

### Token endpoints

  Method   Endpoint               Purpose
  -------- ---------------------- ---------------------------
  POST     `/token`               Log in and create a token
  GET      `/token?id=TOKEN_ID`   Get a token record
  PUT      `/token`               Extend a token
  DELETE   `/token?id=TOKEN_ID`   Delete a token

### Check endpoints

  Method   Endpoint               Purpose
  -------- ---------------------- ------------------------
  POST     `/check`               Create a website check
  GET      `/check?id=CHECK_ID`   Get a website check
  PUT      `/check`               Update a website check
  DELETE   `/check?id=CHECK_ID`   Delete a website check

**Authentication:** Protected routes require a valid token in the
`token` request header.

> The exact response messages and status codes depend on the
> route-handler implementation. Use the expected results in the test
> guide as a guide, then compare them with your actual code.

------------------------------------------------------------------------

# Step-by-Step Postman Testing

This section is written as a practical testing guide. Follow the steps
in order. Use your own test phone number and save the IDs returned by
the API.

## Before Testing

1.  Start the Node.js server.
2.  Open Postman.
3.  Create a collection named `Uptime Monitoring API`.
4.  Use `http://localhost:3000` as the base URL.
5.  Keep the server terminal open so you can see logs.
6.  Use a test account. Do not use a real user's private information.

### Important test data

For examples in this guide:

-   Test phone: `01712345678`
-   Test password: `Test123456`
-   Base URL: `http://localhost:3000`

Use your own test values if these values already exist in your data
folder.

------------------------------------------------------------------------

## Step 1 --- Test the Sample API

### 1. Postman Configuration

-   Method: `GET`
-   URL: `http://localhost:3000/sample`
-   Body: None

Click **Send**.

### 2. Expected Result

The sample route should return the sample response configured in
`routes.js`. In the current project, it returns a sample message with a
successful response.

### 3. What this test checks

-   The server is running.
-   The route is registered.
-   The server can return a response.

------------------------------------------------------------------------

## Step 2 --- Test the Not Found API

### 1. Postman Configuration

-   Method: `GET`
-   URL: `http://localhost:3000/this-route-does-not-exist`
-   Body: None

Click **Send**.

### 2. Expected Result

`404 Not Found`

The response should indicate that the requested route does not exist.

### 3. What this test checks

The not-found handler works for unknown routes.

------------------------------------------------------------------------

## Step 3 --- User Registration API (POST)

### 1. Postman Configuration

-   Method: `POST`
-   URL: `http://localhost:3000/user`
-   Select **Body → raw → JSON**.

Use this JSON:

``` json
{
  "firstName": "Abdullah",
  "lastName": "Akash",
  "phone": "01712345678",
  "password": "Test123456",
  "tosAgreement": true
}
```

Click **Send**.

### 2. Expected Result

A successful response, usually `200 OK`, with the saved user
information. The password should not be returned as plain text.

### 3. Verify the user file

Open:

``` text
data/users/01712345678.json
```

Check that the user data exists. The stored password should be hashed,
not plain text.

### 4. Error tests

  -----------------------------------------------------------------------
  Test                    How to test             Expected result
  ----------------------- ----------------------- -----------------------
  Missing first name      Remove `firstName`      400

  Missing last name       Remove `lastName`       400

  Missing phone           Remove `phone`          400

  Missing password        Remove `password`       400

  Agreement missing/false Set `tosAgreement` to   400
                          `false`                 

  Invalid phone           Use a phone with the    400
                          wrong length or         
                          characters              

  Duplicate user          Send the same           400
                          registration request    
                          again                   
  -----------------------------------------------------------------------

The exact status code depends on your handler. Confirm that invalid
input is rejected and no unwanted user file is created.

------------------------------------------------------------------------

## Step 4 --- User Login and Token Creation (POST)

### 1. Postman Configuration

-   Method: `POST`
-   URL: `http://localhost:3000/token`
-   Select **Body → raw → JSON**.

``` json
{
  "phone": "01712345678",
  "password": "Test123456"
}
```

Click **Send**.

### 2. Expected Result

A successful response containing token information. For example:

``` json
{
  "phone": "01712345678",
  "id": "YOUR_GENERATED_TOKEN_ID",
  "expires": 1794110000000
}
```

The token ID is generated by the application. Your ID will be different.

### 3. Save the token ID

Copy the returned `id`. You will need it for protected API requests.

In Postman, you can add this header to protected requests:

  Key       Value
  --------- -------------------------
  `token`   Your generated token ID

### 4. Error tests

  Test               How to test                  Expected result
  ------------------ ---------------------------- -----------------
  Wrong password     Use an incorrect password    400
  Unknown phone      Use a phone not registered   400
  Missing password   Remove password              400
  Missing phone      Remove phone                 400

------------------------------------------------------------------------

## Step 5 --- User GET, PUT, and DELETE API Testing

Complete GET and PUT first. Keep User DELETE until the end of all tests
that need this user.

### Step 5.1 --- GET User API

#### 1. Postman Configuration

-   Method: `GET`
-   URL:

``` text
http://localhost:3000/user?phone=01712345678
```

#### 2. Headers

  Key       Value
  --------- ---------------------
  `token`   Your valid token ID

No request body is required.

Click **Send**.

#### 3. Expected Result

`200 OK` with the user's information.

The password must not appear in the response.

### Step 5.2 --- PUT User API

#### 1. Postman Configuration

-   Method: `PUT`
-   URL: `http://localhost:3000/user`

#### 2. Headers

  Key       Value
  --------- ---------------------
  `token`   Your valid token ID

#### 3. Body → raw → JSON

``` json
{
  "phone": "01712345678",
  "firstName": "Abdullah Raihan",
  "lastName": "Akash"
}
```

Click **Send**.

#### 4. Expected Result

A successful response, usually `200 OK`.

### 5. Verify the update

Send the GET User request again. Confirm that the updated first and last
names are returned.

### Step 5.3 --- DELETE User API

> Run this only after finishing Check, Token, and other tests that need
> this user.

#### 1. Postman Configuration

-   Method: `DELETE`
-   URL:

``` text
http://localhost:3000/user?phone=01712345678
```

#### 2. Headers

  Key       Value
  --------- ---------------------
  `token`   Your valid token ID

No body is required if your route reads the phone from the query string.

Click **Send**.

#### 3. Expected Result

A successful deletion response, usually `200 OK`.

#### 4. Verify deletion

Send GET User again with the same phone number and token. The user
should no longer be found.

Also inspect `data/users/`. The user's JSON file should be removed.

**Important:** Check how your current code handles related tokens and
checks when a user is deleted. A robust implementation should also
revoke that user's tokens and handle their checks so that orphaned data
is not left behind.

------------------------------------------------------------------------

## Step 6 --- Check Creation, GET, PUT, and DELETE API Testing

A check describes a website that the user wants to monitor.

### Step 6.1 --- Create a Check (POST)

#### 1. Postman Configuration

-   Method: `POST`
-   URL:

``` text
http://localhost:3000/check
```

#### 2. Headers

  Key       Value
  --------- ---------------------
  `token`   Your valid token ID

#### 3. Body → raw → JSON

``` json
{
  "protocol": "https",
  "url": "example.com",
  "method": "get",
  "successCodes": [200, 201, 301],
  "timeOutSeconds": 5
}
```

Do not add `https://` to the `url` value. The protocol is already
provided separately.

Click **Send**.

#### 4. Expected Result

A successful response, usually `200 OK`, containing the new check
object.

Example:

``` json
{
  "id": "YOUR_GENERATED_CHECK_ID",
  "userPhone": "01712345678",
  "protocol": "https",
  "url": "example.com",
  "method": "get",
  "successCodes": [200, 201, 301],
  "timeOutSeconds": 5
}
```

Your generated ID will be different. Save it for the next steps.

#### 5. Verify the check file

Open:

``` text
data/checks/
```

A JSON file with the generated check ID should exist.

### Step 6.2 --- GET Check API

#### 1. Postman Configuration

-   Method: `GET`
-   URL:

``` text
http://localhost:3000/check?id=YOUR_CHECK_ID
```

Replace `YOUR_CHECK_ID` with the real ID returned by Step 6.1.

#### 2. Headers

  Key       Value
  --------- ---------------------
  `token`   Your valid token ID

No body is required.

Click **Send**.

#### 3. Expected Result

`200 OK` with the check details.

#### 4. Error test

Try a wrong Check ID:

``` text
http://localhost:3000/check?id=wrongid
```

Expected: `404 Not Found` or the error response configured in your
handler.

### Step 6.3 --- Update Check API (PUT)

#### 1. Postman Configuration

-   Method: `PUT`
-   URL:

``` text
http://localhost:3000/check
```

#### 2. Headers

  Key       Value
  --------- ---------------------
  `token`   Your valid token ID

#### 3. Body → raw → JSON

``` json
{
  "id": "YOUR_CHECK_ID",
  "method": "get",
  "successCodes": [200, 201]
}
```

Replace `YOUR_CHECK_ID` with your real Check ID.

Click **Send**.

#### 4. Expected Result

A successful response, usually `200 OK`, with the updated check object.

#### 5. Verify the update

Send the GET Check request again:

``` text
http://localhost:3000/check?id=YOUR_CHECK_ID
```

Confirm that `successCodes` is now `[200, 201]`.

### Step 6.4 --- DELETE Check API

#### 1. Postman Configuration

-   Method: `DELETE`
-   URL:

``` text
http://localhost:3000/check?id=YOUR_CHECK_ID
```

Replace `YOUR_CHECK_ID` with the ID created in Step 6.1.

#### 2. Headers

  Key       Value
  --------- ---------------------
  `token`   Your valid token ID

#### 3. Body

None. No request body is required.

Click **Send**.

#### 4. Expected Result

A successful deletion response, usually `200 OK`.

Example response:

``` json
{
  "message": "Check deleted successfully"
}
```

This is only an example. Your actual message may be different.

#### 5. Verify Check Deletion

Send the GET request again:

``` text
http://localhost:3000/check?id=YOUR_CHECK_ID
```

Expected: `404 Not Found`, because the check should no longer be in
`data/checks/`.

#### 6. Verify Trash Folder

Open the project in VS Code. Check this folder structure:

``` text
Uptime Monitoring API/
└── data/
    ├── checks/
    └── trash/
        └── checks/
            └── YOUR_CHECK_ID.json
```

The deleted check file should be moved to `data/trash/checks/`, if that
is how your trash helper is implemented.

#### 7. Verify User's Check List

Open the user's JSON file:

``` text
data/users/01712345678.json
```

Find the `_check` array. The deleted Check ID should no longer be there.

Example:

``` json
{
  "firstName": "Abdullah",
  "lastName": "Akash",
  "phone": "01712345678",
  "_check": []
}
```

This verifies that the relationship between the user and the deleted
check was updated.

#### 8. Error Testing

  Test                 Request                              Expected result
  -------------------- ------------------------------------ -----------------
  Missing ID           `/check`                             400
  Invalid ID           `/check?id=wrongid`                  404
  Missing token        Send without token header            400 or 403
  Invalid token        Send a wrong token                   400 or 403
  Already deleted ID   Send the same DELETE request again   404

The exact status codes depend on your route handlers. The important
point is that the API must reject invalid requests safely.

------------------------------------------------------------------------

## Step 7 --- Token API Testing

Test token creation before testing token GET, PUT, and DELETE.

### Step 7.1 --- Create Token (POST)

#### 1. Postman Configuration

-   Method: `POST`
-   URL: `http://localhost:3000/token`
-   Body → raw → JSON

``` json
{
  "phone": "01712345678",
  "password": "Test123456"
}
```

Click **Send**.

#### 2. Expected Result

A successful response containing the phone number, generated token ID,
and expiration time.

Save the token ID.

### Step 7.2 --- GET Token API

#### 1. Postman Configuration

-   Method: `GET`
-   URL:

``` text
http://localhost:3000/token?id=YOUR_TOKEN_ID
```

No body is required.

Click **Send**.

#### 2. Expected Result

The token record should be returned if the token exists.

> This endpoint reads a token record. Do not treat it as proof that the
> caller is authorized to use that token. Review the route's
> authorization rules separately.

### Step 7.3 --- PUT Token API

First, check the exact fields expected by your `tokenHandler` in
`routes.js`.

For the current project, the token update request uses the token ID to
extend its expiry.

#### 1. Postman Configuration

-   Method: `PUT`
-   URL: `http://localhost:3000/token`
-   Body → raw → JSON

``` json
{
  "id": "YOUR_TOKEN_ID"
}
```

Click **Send**.

#### 2. Expected Result

A successful response if the token exists and has not expired. Verify
that the `expires` value has been extended.

If your current handler expects a different body shape, follow the
implementation in `routes.js`.

### Step 7.4 --- DELETE Token API

#### 1. Postman Configuration

-   Method: `DELETE`
-   URL:

``` text
http://localhost:3000/token?id=YOUR_TOKEN_ID
```

No body is required unless your handler requires one.

Click **Send**.

#### 2. Expected Result

A successful deletion response.

#### 3. Verify deletion

Send GET Token again using the same ID. The token should no longer be
found.

**Security check:** Token PUT and DELETE must verify that the requester
is authorized to modify or delete the token. Do not expose token
management to unauthenticated users.

------------------------------------------------------------------------

## Step 8 --- Input Validation Testing

Input validation prevents invalid data from entering the application.

Use the relevant POST or PUT endpoint and change one field at a time.

  -----------------------------------------------------------------------
  Test                    How to test             Expected behaviour
  ----------------------- ----------------------- -----------------------
  Empty body              Send `{}`               Reject request

  Invalid JSON            Send malformed JSON     Return a client error

  Missing required field  Remove one required     Reject request
                          field                   

  Wrong data type         Send a number instead   Reject request
                          of a string             

  Invalid protocol        Use `ftp`               Reject request

  Invalid method          Use `connect`           Reject request

  Invalid phone           Use an invalid phone    Reject request
                          value                   

  Empty success codes     Use `[]`                Reject request

  Invalid success code    Use a value outside the Reject request
                          allowed HTTP range      

  Invalid timeout         Use `0` or a value      Reject request
                          greater than the        
                          allowed maximum         

  Duplicate user          Register the same phone Reject duplicate
                          twice                   
  -----------------------------------------------------------------------

### Example: invalid protocol

``` json
{
  "protocol": "ftp",
  "url": "example.com",
  "method": "get",
  "successCodes": [200],
  "timeOutSeconds": 5
}
```

Expected: the API rejects the request.

### Example: invalid timeout

``` json
{
  "protocol": "https",
  "url": "example.com",
  "method": "get",
  "successCodes": [200],
  "timeOutSeconds": 10
}
```

If your application allows only 1--5 seconds, this request should be
rejected.

------------------------------------------------------------------------

## Step 9 --- Authentication and Authorization Testing

These tests check whether protected routes are properly secured.

Use a test user and a valid token.

  -----------------------------------------------------------------------
  Test                    How to test             Expected behaviour
  ----------------------- ----------------------- -----------------------
  Missing token           Remove the `token`      Reject request
                          header                  

  Invalid token           Send a random token     Reject request

  Expired token           Use an expired token    Reject request

  Deleted token           Delete a token, then    Reject request
                          reuse it                

  Wrong password          Login with the wrong    Reject login
                          password                

  Another user's check    User A tries to read    Reject access
                          User B's check          

  Update another user's   User A tries to update  Reject access
  check                   User B's check          

  Delete another user's   User A tries to delete  Reject access
  check                   User B's check          

  Deleted user            Try protected requests  Reject access
                          after user deletion     
  -----------------------------------------------------------------------

### How to test another user's check

1.  Register User A and User B with different phone numbers.
2.  Log in as User B.
3.  Create a check as User B.
4.  Save the Check ID.
5.  Log in as User A.
6.  Send GET, PUT, and DELETE requests for User B's Check ID using User
    A's token.
7.  The API must not allow User A to access or modify User B's check.

A secure API should verify both the token and the ownership of the
requested resource.

------------------------------------------------------------------------

## Step 10 --- File System and Data Storage Testing

Check the JSON files in the `data/` directory.

  -----------------------------------------------------------------------
  Test                    How to test             Expected behaviour
  ----------------------- ----------------------- -----------------------
  User file creation      Register a user         File appears in
                                                  `data/users/`

  Token file creation     Log in                  File appears in
                                                  `data/tokens/`

  Check file creation     Create a check          File appears in
                                                  `data/checks/`

  Read file               GET an existing record  Data is returned

  Update file             PUT a record            JSON file contains
                                                  updated data

  Delete check            DELETE a check          File moves to trash if
                                                  implemented

  Missing file            Request an unknown ID   API handles the error

  Empty directory         List an empty data      No server crash
                          directory               

  Invalid JSON file       Put invalid JSON in a   Error is handled safely
                          test file               

  Duplicate file          Try creating an         Duplicate is rejected
                          existing record         

  Restart server          Stop and restart the    Existing JSON data
                          server                  remains
  -----------------------------------------------------------------------

Do not manually edit important data files while the server is running
unless you are doing a controlled test.

------------------------------------------------------------------------

## Step 11 --- Background Worker Testing

The worker is one of the most important parts of this project. It checks
saved websites automatically.

Before testing, confirm:

-   The server and worker start correctly.
-   The check is saved in `data/checks/`.
-   The worker reads the correct timeout property (`timeOutSeconds`).
-   The worker uses the correct notification file import path.
-   The website URL is built correctly from protocol and URL.

### Step 11.1 --- Test a Website That Is UP

Create a check for:

``` json
{
  "protocol": "https",
  "url": "example.com",
  "method": "get",
  "successCodes": [200, 201, 301],
  "timeOutSeconds": 5
}
```

Wait for the next worker cycle.

Expected behaviour:

-   The website responds with a code in `successCodes`.
-   The check state becomes `up`.
-   `lastChecked` is updated.

### Step 11.2 --- Test a Website That Is DOWN

Use a test URL that you control and that reliably returns a response
code not included in `successCodes`, or a deliberately unreachable test
host.

Example check:

``` json
{
  "protocol": "https",
  "url": "example.com",
  "method": "get",
  "successCodes": [404],
  "timeOutSeconds": 5
}
```

This example is only useful if the actual response from the website is
not 404. The expected result depends on the real response code.

Expected behaviour: if the response code is not in the `successCodes`
list, the check state becomes `down`.

### Step 11.3 --- Test a Non-success HTTP Response

Use a test endpoint that returns a known status code, such as an HTTP
testing service endpoint that you have verified.

For example, a test service may provide a URL path that returns status
`404` or `500`.

Set `successCodes` to `[200]`.

Expected: the check state becomes `down` when the response is not 200.

### Step 11.4 --- Test Timeout

Use a controlled endpoint that delays its response longer than the
configured timeout.

Set `timeOutSeconds` to a short value allowed by the application.

Expected:

-   The request times out.
-   The check state becomes `down`.
-   The worker does not process the same request outcome more than once.

### Step 11.5 --- Test Last Checked

1.  Create a check.
2.  Record its current `lastChecked` value.
3.  Wait for a worker cycle.
4.  Read the check again.
5.  Confirm that `lastChecked` has changed.

### Step 11.6 --- Test State Change

1.  Create a check for a working test endpoint.
2.  Confirm the state becomes `up`.
3.  Change the test endpoint so it returns a non-success response, or
    update the check to use a success code that does not match the
    response.
4.  Wait for the next worker cycle.
5.  Confirm the state becomes `down`.
6.  Restore the successful response and confirm the state can return to
    `up`.

### Step 11.7 --- Test Periodic Checking

1.  Start the application.
2.  Create one or more checks.
3.  Keep the terminal open.
4.  Wait for more than one worker interval.
5.  Confirm the worker checks the saved records repeatedly.

If the worker is configured to run once per minute, wait long enough to
observe at least two cycles.

### Step 11.8 --- Test Multiple Checks

1.  Create several checks for different test URLs.
2.  Wait for the worker.
3.  Confirm that each check is processed.
4.  Confirm that one failed check does not stop the worker from
    processing the others.

------------------------------------------------------------------------

## Step 12 --- Twilio SMS Notification Testing

SMS testing requires valid Twilio credentials, a Twilio-authorized
sender number, and a destination number that your Twilio account is
allowed to message.

### Step 12.1 --- Test DOWN Notification

1.  Configure Twilio credentials securely.
2.  Create a check for a test endpoint that returns a non-success
    response.
3.  Wait for the worker.
4.  Confirm that the check changes to `down`.
5.  Confirm that the notification function is called.
6.  If the Twilio account and phone setup are valid, check whether the
    SMS arrives.

### Step 12.2 --- Test UP Notification

1.  Make the test endpoint return a successful response.
2.  Wait for the worker.
3.  Confirm that the check changes from `down` to `up`.
4.  Confirm that the notification function is called.
5.  Check SMS delivery if Twilio is configured.

### Step 12.3 --- Test Unchanged State

1.  Keep the website in the same state.
2.  Wait for another worker cycle.
3.  Confirm that no duplicate state-change SMS is sent.

### Step 12.4 --- Test Twilio Errors

Test with invalid credentials only in a safe development environment.

Expected behaviour:

-   The application handles the Twilio error.
-   The server does not crash.
-   The error is logged without exposing secrets.
-   A failed SMS request does not corrupt the check data.

------------------------------------------------------------------------

## Step 13 --- Performance and Reliability Testing

These are additional tests for improving the project.

  -----------------------------------------------------------------------
  Test                    How to test             What to check
  ----------------------- ----------------------- -----------------------
  Multiple users          Register several test   Each user has separate
                          users                   data

  Maximum checks          Try creating more than  Extra check is rejected
                          the allowed limit       

  Multiple checks         Create several checks   Worker processes them

  Slow response           Use a delayed test      Timeout works
                          endpoint                

  Large request body      Send a large JSON body  Server handles or
                                                  rejects it safely

  Restart server          Stop and start the      Data remains available
                          server                  

  Repeated requests       Send many requests      No unexpected crash

  Worker overlap          Make a check take       Same job is not
                          longer than the worker  processed concurrently
                          interval                

  Invalid host            Use an unreachable test Worker handles network
                          host                    errors
  -----------------------------------------------------------------------

Use a controlled test environment. Do not send high-volume traffic to
websites you do not own or have permission to test.

------------------------------------------------------------------------

## Step 14 --- Security Testing

Security checks should be completed before public deployment.

-   Confirm passwords are hashed before saving.
-   Confirm passwords are never returned in API responses.
-   Keep secret keys and Twilio credentials outside source code.
-   Add `.env` to `.gitignore`.
-   Use cryptographically secure random tokens.
-   Verify token expiration.
-   Verify token ownership and resource ownership.
-   Protect token update and delete operations.
-   Validate all user input.
-   Prevent users from accessing other users' checks.
-   Avoid returning stack traces or private server details to clients.
-   Consider rate limiting login and other sensitive routes.
-   Use HTTPS when deploying publicly.
-   Review file paths to prevent path traversal.
-   Avoid logging passwords, tokens, and API credentials.

------------------------------------------------------------------------

## Problems I Faced and How I Solved Them

During development, I faced several errors. Here are the important ones
and their solutions.

### 1. `require is not defined in ES module scope`

**Problem:** Node.js showed an error because the project used ES modules
but the code used `require()`.

**Why it happened:** The project's `package.json` contained:

``` json
{
  "type": "module"
}
```

**Solution:** Use ES module imports:

``` js
import http from 'node:http';
```

Or use the `.cjs` extension only when a file must use CommonJS.

### 2. `__dirname is not defined in ES module scope`

**Problem:** `__dirname` was not available in an ES module.

**Solution:** Create it using `fileURLToPath()`:

``` js
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

### 3. Data files were not created in the expected folder

**Problem:** JSON files were not appearing in the expected `users`,
`checks`, or other folders.

**Why it happened:** The base directory or path joining logic was
incorrect.

**Solution:** Build the base path from the location of the data library
file and use `path.join()` consistently.

Example:

``` js
lib.basedir = path.join(__dirname, '..', 'data');
```

Also check that the create function makes the required directory before
writing the file.

### 4. `parseJSON is not defined`

**Problem:** The code called `parseJSON()` directly even though it was a
method on the utilities object.

**Solution:** Import the utilities module and call the method through
the object:

``` js
import utilities from './utilities.js';

const parsedData = utilities.parseJSON(realData);
```

### 5. `userHandler is not defined`

**Problem:** The route table referred to `userHandler`, but the handler
was defined as a property of another object.

**Solution:** Use the correct reference, for example:

``` js
user: handler.userHandler
```

Always check the exact name and scope of a function before exporting or
using it.

### 6. Missing export from `routes.js`

**Problem:** The server tried to import a route or handler that was not
exported.

**Solution:** Export the required named values from `routes.js` and make
sure the import names match:

``` js
export const routes = {
  sample: handler.sampleHandler,
  user: handler.userHandler,
  token: handler.tokenHandler,
  check: handler.checkHandler
};
```

The exact exports must match the actual server imports.

### 7. `ERR_STREAM_WRITE_AFTER_END`

**Problem:** The server attempted to send a response after the response
had already ended.

**Solution:** Check every request path and make sure a response is sent
only once. Return after sending a response so that later code does not
try to write again.

### 8. `url.parse()` deprecation warning

**Problem:** Node.js showed a warning about the old `url.parse()` API.

**Solution:** Plan to use the modern WHATWG `URL` API:

``` js
const parsedUrl = new URL(request.url, `http://${request.headers.host}`);
```

Use the correct base URL for the incoming request and handle invalid
URLs safely. A deprecation warning is not always a fatal error, but
updating the code is recommended.

### 9. Timeout property name mismatch

**Problem:** The check creation code stored `timeOutSeconds`, but the
worker used `timeoutSeconds`.

**Solution:** Use the same property name everywhere:

``` js
timeout: originalCheckData.timeOutSeconds * 1000
```

This is important because JavaScript property names are case-sensitive.

### 10. Notification import filename mismatch

**Problem:** The worker imported a plural filename while the actual file
was named `notification.js`.

**Solution:** Make the import path match the real file name exactly:

``` js
import notifications from './notification.js';
```

### 11. Token and user relationship problems

**Problem:** Authentication and resource ownership require checking more
than whether a token file exists.

**Solution:** Verify that the token belongs to the user making the
request and that the requested check belongs to that user. Also review
what happens to related tokens and checks when a user is deleted.

### 12. Twilio configuration problems

**Problem:** SMS requests can fail if the Account SID, Auth Token, or
sender number is incorrect.

**Solution:** Use the correct values from the Twilio Console. The
Account SID and Auth Token are different values. The sender number must
be authorized by Twilio.

Never publish real Twilio credentials in a public repository. If a real
credential was committed, rotate it.

### 13. Worker response and timeout handling

**Problem:** HTTP requests can produce response, error, and timeout
events. A request may trigger more than one event.

**Solution:** Use a guard so each check outcome is processed only once.
Consume the response stream when appropriate and destroy timed-out
requests safely.

------------------------------------------------------------------------

## Security Notes

This project is a learning project. Do not deploy it publicly with
development credentials or unreviewed authentication logic.

Before publishing or deploying:

1.  Remove real secrets from `environment.js` and other source files.
2.  Put secrets in environment variables.
3.  Add `.env` to `.gitignore`.
4.  Rotate any credentials that may already have been exposed.
5.  Check Git history. Removing a secret from the latest file does not
    remove it from old commits.
6.  Review token PUT and DELETE authorization.
7.  Use secure random token generation.
8.  Review user deletion and related data cleanup.
9.  Add rate limiting and stronger request validation.
10. Use HTTPS in production.

------------------------------------------------------------------------

## Future Improvements

-   Add a database such as MongoDB or PostgreSQL instead of JSON file
    storage.
-   Build a frontend dashboard.
-   Show website status in real time.
-   Add uptime history and response-time charts.
-   Add email notifications.
-   Add user roles and stronger authorization.
-   Add rate limiting.
-   Add automated tests with a test framework.
-   Add API documentation with OpenAPI / Swagger.
-   Add structured logging.
-   Add Docker support.
-   Deploy the API to a cloud server.
-   Add monitoring for the monitoring service itself.
-   Improve worker scheduling and prevent overlapping jobs.
-   Add retry logic for temporary network failures.
-   Add pagination for users and checks.
-   Add a health-check endpoint for the API server.

------------------------------------------------------------------------

## Author

**Abdullah Raihan Akash**

-   GitHub:
    [abdullahraihanakash](https://github.com/abdullahraihanakash)
-   Project Repository:
    [Web-Development](https://github.com/abdullahraihanakash/Web-Development)

------------------------------------------------------------------------

## Final Note

This project is part of my journey to become a better software engineer.
While building it, I practised JavaScript, Node.js, REST API
development, authentication, file-system operations, background workers,
third-party API integration, debugging, and Postman testing.

I created this README so that I can revise what I learned and other
developers can follow the steps to understand and test the project.
