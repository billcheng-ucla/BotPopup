const config = require('./config/config');
const express = require('express');
const app = express();
const basicAuth = require('express-basic-auth');
const dashbot = require('dashbot')(config.DASHBOT_API_KEY).google;

console.log('BotPopup initiated');

app.use(basicAuth({
  users: { 'admin': 'supersecret' }
}));

app.get('/', (request, response) => {
  response.send('hello world. but this is not the asdf');
});

app.post('/', (request, response) => {
  const sampleResponse = {
    speech: "Thanks, you order has been received.",
    displayText: "Thanks, you order has been received.",
    data: {},
    contextOut: [],
    source: ""
  }
  response.json(sampleResponse);
});

app.listen(config.HTTP_PORT, () => console.log(`BotPopup listening on port ${config.HTTP_PORT}!`))
