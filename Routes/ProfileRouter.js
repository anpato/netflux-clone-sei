const ProfileController = require('../Controllers/ProfileController')

const Router = require('express').Router()

Router.post('/', ProfileController.CreateProfile)
Router.get('/:account_id', ProfileController.GetProfile)

module.exports = Router
