const { S3 } = require('aws-sdk')
require('dotenv').config()
class Aws {
  constructor(key, secret) {
    this.key = key
    this.secret = secret
    this.storage = null
  }

  init() {
    this.storage = new S3({
      accessKeyId: this.key,
      secretAccessKey: this.secret,
      region: 'us-east-1'
    })
  }

  async getFiles() {
    const files = await this.storage
      .listObjects({ Bucket: 'netflux-avatars' })
      .promise()
    return files.Contents.map(
      (file) =>
        `https://${files.Name}.${this.storage.endpoint.host}/${file.Key}`
    )
  }
}

module.exports = new Aws(process.env.AWS_KEY, process.env.AWS_SECRET)
