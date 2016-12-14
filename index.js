var Botkit = require('botkit')

var token = process.env.SLACK_TOKEN

var controller = Botkit.slackbot({
  retry: Infinity,
  debug: false
})

if (token) {
  console.log('Starting in single-team mode')
  controller.spawn({
    token: token,
    retry: Infinity
  }).startRTM(function (err, bot, payload) {
    if (err) {
      throw new Error(err)
    }
    console.log('Connected to Slack RTM')
  })
} else {
  console.log('Starting in Beep Boop multi-team mode')
  require('beepboop-botkit').start(controller, {
    debug: true
  })
}

controller.on('bot_channel_join', function (bot, message) {
  bot.reply(message, "I'm here!")
})

controller.on('file_created', (bot, message) => {
  console.log('teste')
})

require('./listeners/greet')(controller)
require('./listeners/mention')(controller)
require('./listeners/help')(controller)
require('./listeners/attachment')(controller)
require('./listeners/removeServices')(controller)
require('./listeners/setupServices')(controller)
require('./listeners/servicesStatus')(controller)
require('./listeners/catch')(controller)
