const crypto = require('crypto')

function hashMessage(message) {
  let hash = crypto
    .createHash("sha256")
    .update(message)
    .digest("hex")
  return hash
}

module.exports = {
  hashMessage
}

