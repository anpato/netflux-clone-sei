const express = require('express')
const compression = require('compression')
const helmet = require('helmet')
const bodyparser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const AppRouter = require('./Routes/AppRouter')
const Redis = require('./utils/Redis')
const Aws = require('./utils/Aws')
const path = require('path')
const PORT = process.env.PORT || 3001
const app = express()

app.use(helmet({ contentSecurityPolicy: false }))
app.use(compression())
app.use(cors())
app.use(express.static(path.join(__dirname, 'client', 'build')))
app.use(morgan('dev'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.disable('X-Powered-By')
app.use('/api', AppRouter)
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
)

app.listen(PORT, async () => {
  Redis.connect()
  Aws.init()
  const files = await Aws.getFiles()
  Redis.client.set('avatars', JSON.stringify(files))
  console.log(`App Listening On Port: ${PORT}`)
})
