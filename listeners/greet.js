module.exports = (controller) => {
  controller.hears(['hello', 'hi'], ['direct_mention'], function (bot, message) {
    bot.reply(message, 'Hello.')
  })

  controller.hears(['hello', 'hi'], ['direct_message'], function (bot, message) {
    bot.reply(message, 'Hello.')
    bot.reply(message, 'It\'s nice to talk to you directly.')
  })
}
