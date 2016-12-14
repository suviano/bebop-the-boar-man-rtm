const filesSync = require('../utils/filesSync')

module.exports = (controller) => {
  controller.hears('remove services', [
    'direct_mention', 'direct_message'
  ], function (bot, message) {
    filesSync.writeServicesFiles({
      'hosts': {}
    }, (err) => {
      if (err) {
        bot.reply(message, `Service can not be deleted \n${err}`)
      } else {
        bot.reply(message, 'Service drop :thumbsup:')
      }
    })
  })
}
