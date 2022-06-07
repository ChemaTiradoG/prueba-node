/**
 * Main application file http server
 */

const express = require('express');
const environment = require('../environment/environment');
const http = require('http');
const expressConfig = require('../config/express');

// Setup server
const app = express();
const server = http.createServer(app);
expressConfig(app);

server.listen(environment.port, () => {
    console.log(`Express server listening on ${environment.port}, in ${environment.descripcion} mode.`);
});
