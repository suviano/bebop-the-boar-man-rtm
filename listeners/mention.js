module.exports = (controller) => {
  controller.hears('.*', ['mention'], function (bot, message) {
    bot.reply(message, 'You really do care about me. :heart:')
  })
}
