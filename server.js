var express = require('express');
var app = express();
const dashbot = require('dashbot')(process.env.DASHBOT_API_KEY).google;
const DialogflowApp = require('actions-on-google').DialogflowApp;

console.log('BotPopup initiated');

app.get('/', (request, response) => {
  response.send('hello world');
});

app.post('/', (request, response) => {
  const assistant = new DialogflowApp({request: request, response: response});
  dashbot.configHandler(assistant);
});

app.listen(process.env.SERVER_PORT, () => console.log(`BotPopup listening on port ${process.env.SERVER_PORT}!`))
