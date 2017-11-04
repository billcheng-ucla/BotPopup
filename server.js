var express = require('express');
var app = express();
const dashbot = require('dashbot')(process.env.DASHBOT_API_KEY).google;
const DialogflowApp = require('actions-on-google').DialogflowApp;

console.log('BotPopup initiated');

app.post('/', function (request, response) {
  const assistant = new DialogflowApp({request: request, response: response});
  dashbot.configHandler(assistant);
});
