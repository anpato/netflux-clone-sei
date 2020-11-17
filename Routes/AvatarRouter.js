const AvatarController = require('../Controllers/AvatarController')

const Router = require('express').Router()

Router.get('/', AvatarController.GetAvatars)

module.exports = Router
