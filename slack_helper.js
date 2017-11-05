const config = require('./config/config');
const request = require('request');

const slackHelper = (channel, messageToSlack) => {
  console.log(JSON.stringify(messageToSlack));
  var url;
  switch (channel) {
    case 'food':
      url = `https://${config.SLACK_WEBHOOK_HOST}${config.SLACK_WEBHOOK_FOOD_CHANNEL}`;
      break;
    case 'beverage':
      url = `https://${config.SLACK_WEBHOOK_HOST}${config.SLACK_WEBHOOK_BEVERAGES_CHANNEL}`;
      break;
    default:
      url = `https://${config.SLACK_WEBHOOK_HOST}${config.SLACK_WEBHOOK_ORDERS_CHANNEL}`;
      break;
  }
  request.post({
      method: 'POST',
      url: url,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(messageToSlack)
    },
    (error, response, body) => {
      if (!error && response.statusCode == 200) {
        console.log(body)
      } else {
        console.error(error);
      }
    }
  );
};

module.exports = slackHelper;