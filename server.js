const config = require('./config/config');
const express = require('express');
const app = express();
const basicAuth = require('express-basic-auth');
const dashbot = require('dashbot')(config.DASHBOT_API_KEY).google;
const bodyParser = require('body-parser');
const slackHelper = require('./slack_helper');
const request = require('request');
const DialogflowApp = require('actions-on-google').DialogflowApp;
const transaction = require('./transaction');

console.log('BotPopup initiated');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', (request, response) => {
  response.send('hello world. but this is not the asdf');
});

app.post('/confirm_order', (req, response) => {
  //const rawPayload = JSON.parse(req.body.payload);
  //const payload = rawPayload.callback_id;

  let orderUpdate = new OrderUpdate(actionOrderId, false)
    .setOrderState(Transactions.OrderState.FULFILLED,
      'Order has been delivered!')
    .setUpdateTime(currentTime);

  let bearer = 'Bearer ' + tokens.access_token;
  let options = {
    method: 'POST',
    url: 'https://actions.googleapis.com/v2/conversations:send',
    headers: {
      'Authorization': bearer
    },
    body: {
      'custom_push_message': {
        'order_update': orderUpdate
      }
    },
    json: true
  };
  request.post(options, function (err, httpResponse, body) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(body);
  });
  response.json({
    'text': 'Order confirmed'
  });
});


app.get('/auth', (req, res) => {
  const client_id = req.query.client_id;
  const redirect_uri = req.query.redirect_uri;
  const state = req.query.state;
  const response_type = req.query.response_type;

  if (!client_id == config.CLIENT_ID) {

  }

  if (!redirect_uri.match(/oauth-redirect\.googleusercontent\.com\/r\/.*/)) {

  }
});

app.use(basicAuth({
  users: { 'admin': 'supersecret' }
}));

app.post('/', (request, response) => {
  const payload = request;
  slackHelper({
    "text": "A customer just ordered a coffee. Please confirm.",
    "attachments": [
      {
        "text": "Confirm Order?",
        "fallback": "Failed to confirm order",
        "callback_id": 'order_callback_id',
        "color": "#3AA3E3",
        "attachment_type": "default",
        "actions": [
          {
            "name": "order",
            "text": "Confirm",
            "type": "button",
            "value": "confirm"
          },
          {
            "name": "order",
            "text": "Cancel",
            "style": "danger",
            "type": "button",
            "value": "cancel",
            "confirm": {
              "title": "Are you sure?",
              "text": "The customer will be very dissapointed... :(",
              "ok_text": "Yes",
              "dismiss_text": "No"
            }
          }
        ]
      }
    ]
  });


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

app.post('/talk_user', (request, response) => {
  console.log(request.body);
  response.end();
});

app.post('/cancel_order', (request, response) => {
  console.log(request.body);
});

app.use(basicAuth({
  users: { 'admin': 'supersecret' }
}));

app.listen(config.HTTP_PORT, () => console.log(`BotPopup listening on port ${config.HTTP_PORT}!`))
