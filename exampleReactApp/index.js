/**
 * Application Entry Point
 * @description Bootstrap the server, so we can initiate Babel
 * @author Todd Runham
 */

require('babel-core/register')({});
require('babel-polyfill');

var server = require('./server').default;

server.listen('9009');

