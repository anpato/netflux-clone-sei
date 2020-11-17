const Router = require('express').Router()
const UserRouter = require('./UserRouter')
const ProfileRouter = require('./ProfileRouter')
const AvatarRouter = require('./AvatarRouter')

Router.use('/users', UserRouter)
Router.use('/profiles', ProfileRouter)
Router.use('/avatars', AvatarRouter)

module.exports = Router
