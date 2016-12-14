module.exports = {
  joinErrors: (errorsToFix) => {
    let message = ''
    errorsToFix.forEach(erro => {
      message += erro + '\n'
    })
    return message
  }
}
