const { createClient } = require('redis')
require('dotenv').config()
class Redis {
  constructor(connUrl) {
    this.connUrl = connUrl || ''
    this.client = null
  }

  connect() {
    this.client = createClient(this.connUrl)
    this.client.on('error', (error) =>
      console.log('Redis Connection Error:', error.stack)
    )
    console.log(`Redis Connected: ${this.connUrl}`)
  }
}

module.exports = new Redis(process.env.REDIS_URL)
