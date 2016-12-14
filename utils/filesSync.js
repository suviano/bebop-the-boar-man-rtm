const fs = require('fs')
const path = require('path')

module.exports = {
  writeServicesFiles: (servicesJSON, callback) => {
    fs.writeFile(
      path.join(__dirname, '../servicesConf/restApiConfig.json'),
      JSON.stringify(servicesJSON),
      callback)
  }
}
