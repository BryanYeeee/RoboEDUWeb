let app = require('../app');
let debug = require('debug')('roboedusite:server');
let http = require('http');
require('dotenv').config()

let port = process.env.PORT

app.set('port', port);

let server = http.createServer(app);

server.listen(port, () => {
    console.log("Connected to " + port);
});