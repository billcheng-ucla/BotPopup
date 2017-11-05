const config = require('./config/config');
const request = require('request');

const slackHelper = (messageToSlack) => {
  request.post(
    {
      method: 'POST',
      url: `${config.SLACK_WEBHOOK_HOST}${config.SLACK_WEBHOOK_ORDERS_CHANNEL}`,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(messageToSlack)
    },
    (error, response, body) => {
      if (!error && response.statusCode == 200) {
        console.log(body)
      }
    }
  );
};

module.exports = slackHelper;
