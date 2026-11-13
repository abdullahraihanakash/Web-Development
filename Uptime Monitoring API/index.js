/*Title: Project Initial file
Description: Initial file to start the node server
Author: Abdullah Raihan Akash
Date: 1/11/2026
*/

// Dependencies
import server from './server.js';
import workers from './workers.js';

// App object
const app = {};

// Initialize the application
app.init = () => {
    //start the server
    server.init();

    //start the workers
    workers.init();
}

// Start the application by calling the init function
app.init();

export default app;