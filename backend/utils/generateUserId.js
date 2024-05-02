const crypto = require('crypto');

function generateEmailHash(email) {
  const hash = crypto.createHash('sha256');
  hash.update(email);
  return hash.digest('hex');
}
module.exports = generateEmailHash

