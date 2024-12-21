const serverless = require('serverless-http');
const app = require('./index'); // Adjust the path to your Express app

module.exports = serverless(app , {
    framework: 'express' // Explicitly specify the framework
});
