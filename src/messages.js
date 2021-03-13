const moment = require('moment');

function formatMessage(username,image, text){
  return {
    username,
    image,
    text,
    time: moment().format('h:mm a')
  }
}

module.exports = formatMessage;
