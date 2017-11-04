const dashbot = require('dashbot')(process.env.DASHBOT_API_KEY).google;
const DialogflowApp = require('actions-on-google').DialogflowApp;

app.post('/', function (request, response) {
  const assistant = new DialogflowApp({request: request, response: response});
  dashbot.configHandler(assistant);
}
