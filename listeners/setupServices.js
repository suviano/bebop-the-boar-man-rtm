const filesSync = require('../utils/filesSync')
const joinErrors = require("../utils/joinSet").joinErrors

var validService = servicesJSON => {
  let errorsToFix = new Set()
  if (servicesJSON['hosts']) {
    for (let serviceJSON in servicesJSON['hosts']) {
      serviceJSON = serviceJSON.replace(/(\"<|>\")/g, '\"')
      if (!servicesJSON['hosts'][serviceJSON].hasOwnProperty('routes')) {
        errorsToFix.add(`\`routes\` must be in ${[servicesJSON]}`)
      } else if (servicesJSON[
          'hosts'][serviceJSON].routes.constructor != Array) {
        errorsToFix.add('\`routes\` must be a array')
      } else {
        let requireKeysInRoute = ['name', 'type']
        requireKeysInRoute.map(key => {
          servicesJSON['hosts'][serviceJSON].routes.forEach(route => {
            if (!(key in route)) {
              errorsToFix.add(`missing the key \`${key}\` in the route`)
            }
          })
        })
      }
    }
  } else {
    errorsToFix.add('This json should have a ' +
      'key `hosts` with a array as value')
  }
  return errorsToFix
}

var saveFiles = (servicesJSON, callback) => {
  let restApisConfig = require('../restApiConfig.json')
  let index = 0
  for (let serviceJSON in servicesJSON['hosts']) {
    index++
    let _serviceJSON = serviceJSON.replace(/(<|>)/g, '')
    restApisConfig['hosts'][_serviceJSON] = servicesJSON['hosts'][serviceJSON]
    restApisConfig['hosts'][_serviceJSON].image = servicesJSON[
      'hosts'][serviceJSON].image.replace(/(<|>)/g, '')
    if (index ===  Object.keys(servicesJSON['hosts']).length - 1) {
      filesSync.writeServicesFiles(restApisConfig, callback)
    }
  }
}

module.exports = (controller) => {
  controller.hears('setup services', [
    'direct_mention', 'direct_message'
  ], (bot, message) => {
    let servicesString = message.text.replace(
      'setup services', '').replace(/`/g, '').trim()
    let servicesJSON, errorsToFix

    try {
      servicesJSON = JSON.parse(servicesString)
      errorsToFix = validService(servicesJSON)
    } catch (err) {
      console.log(`${err.name} | ${err.message} | SyntaxError |${err}`)
      if (err.name === 'SyntaxError') {
        bot.reply(message, `This JSON have some syntax errors! ${err.message}`)
      } else {
        bot.reply(message, 'Hey try again is not working!!! ')
      }
      bot.reply(message, 'Make sure you json is valid :grin:\n' +
        ' use http://jsonlint.com/ to check')
    }

    if (errorsToFix.size === 0) {
      saveFiles(servicesJSON, (err) => {
        if (err) {
          bot.reply(message, `Json coun't not be saved\n${err}`)
        } else {
          bot.reply(message, 'Everyting ok! Saved :thumbsup:')
        }
      })
    } else {
      errorsToFix = joinErrors(errorsToFix)
      bot.reply(message, errorsToFix)
    }
  })
}
