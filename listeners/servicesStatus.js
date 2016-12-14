const requestPromise = require('request-promise-native')

var options = (host, type) => {
  return {
    'uri': host,
    'method': type.toUpperCase(),
    'resolveWithFullResponse': true,
    'simple': false
  }
}

module.exports = (controller) => {
  controller.hears('service(s)? up', [
    'direct_mention', 'direct_message'
  ], (bot, message) => {
    let restApisConfig = require('../servicesConf/restApiConfig.json')
    let hosts = restApisConfig["hosts"]

    if (Object.keys(hosts).length) {
      for (let hostKey in hosts) {
        hosts[hostKey].routes.forEach((route) => {
          requestPromise(options(hostKey, route.type))
            .then((response) => {
              let answer = ''
              if (response.statusCode === 200) {
                answer = {
                  text: 'running fine :thumbsup:',
                  attachments: [{
                    text: `It's ok has return the code ${response.statusCode}`,
                    title: route.name,
                    title_link: hostKey,
                    image_url: hosts[hostKey].image,
                    color: '#2DE72D'
                  }]
                }
              } else {
                answer = {
                  text: 'meeh :thumbsdown:',
                  attachments: [{
                    text: `Something happend has return the code ${response.statusCode}`,
                    title: route.name,
                    title_link: hostKey,
                    image_url: hosts[hostKey].image,
                    color: '#E12E2E'
                  }]
                }
              }
              bot.reply(message, answer)
            }).catch((err) => {
              bot.reply(message, {
                text: `Eh.. :thinking_face: should look at it!!!`,
                attachments: [{
                  text: `${err}`,
                  title: route.name,
                  title_link: hostKey,
                  image_url: hosts[hostKey].image,
                  color: '#EE6D27'
                }]
              })
            })
        })
      }
    } else {
      bot.reply(message, 'Are not services to check may you want to setup one!')
    }
  })
}
