module.exports = (controller) => {
  controller.hears('help', ['direct_message', 'direct_mention'], function (bot, message) {
    var help = 'I will respond to the following messages: \n' +
      '`bot hi` for a simple message.\n' +
      '`bot attachment` to see a Slack attachment message.\n' +
      '`@<your bot\'s name>` to demonstrate detecting a mention.\n' +
      '`bot help` to see this again.' +
      '`bot services up` will check services' +
      '`bot setup services{...}` to save a service'
    bot.reply(message, help)
  })
}
