const filesSync = require('../utils/filesSync')

module.exports = (controller) => {
  controller.hears('.*', ['direct_message', 'direct_mention'], function (bot, message) {
    bot.reply(message, 'Sorry <@' + message.user + '>, I don\'t understand. \n')
  })
}
