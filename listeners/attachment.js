module.exports = (controller) => {
  controller.hears(['attachment'], ['direct_message', 'direct_mention'], function (bot, message) {
    var text = 'Beep Beep Boop is a ridiculously simple hosting platform for your Slackbots.'
    var attachments = [{
      fallback: text,
      pretext: 'We bring bots to life. :sunglasses: :thumbsup:',
      title: 'Host, deploy and share your bot in seconds.',
      image_url: 'https://storage.googleapis.com/beepboophq/_assets/bot-1.22f6fb.png',
      title_link: 'https://beepboophq.com/',
      text: text,
      color: '#7CD197'
    }]

    bot.reply(message, {
      attachments: attachments
    }, function (err, resp) {
      console.log(err, resp)
    })
  })
}
