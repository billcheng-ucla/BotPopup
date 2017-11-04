const config = require('./config/config');
const express = require('express');
const app = express();
const basicAuth = require('express-basic-auth');
const dashbot = require('dashbot')(config.DASHBOT_API_KEY).google;
const bodyParser = require('body-parser');

console.log('BotPopup initiated');

app.use(basicAuth({
  users: { 'admin': 'supersecret' }
}));

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send('hello world. but this is not the asdf');
});

app.post('/', (request, response) => {
  dashbot.logIncoming(request.body);
  const sampleResponse = {
    speech: "Thanks, you order has been received.",
    displayText: "Thanks, you order has been received.",
    data: {},
    contextOut: [],
    source: ""
  }
  dashbot.logOutgoing(request.body, sampleResponse);
  response.json(sampleResponse);
});

app.listen(config.HTTP_PORT, () => console.log(`BotPopup listening on port ${config.HTTP_PORT}!`))
