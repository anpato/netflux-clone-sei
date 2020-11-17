const Aws = require('../utils/Aws')
const Redis = require('../utils/Redis')
const GetAvatars = async (req, res) => {
  try {
    Redis.client.get('avatars', (err, reply) => {
      if (err) return console.log(err)
      res.send(reply)
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetAvatars
}
