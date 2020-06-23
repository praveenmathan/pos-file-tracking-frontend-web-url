//Lambda handler function
const app = require('./dist/server').default;
const awsServerlessExpress = require("aws-serverless-express");
const binaryMimeTypes = [
    'application/javascript',
    'application/json',
    'application/octet-stream',
    'application/xml',
    'font/eot',
    'font/opentype',
    'font/otf',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/svg+xml',
    'text/comma-separated-values',
    'text/css',
    'text/html',
    'text/javascript',
    'text/plain',
    'text/text',
    'text/xml'
]
const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);

exports.ssr = function (event, context) {
    awsServerlessExpress.proxy(server, event, context);
}