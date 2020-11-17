const UserController = require('../Controllers/UserController')
const Router = require('express').Router()

Router.get('/', UserController.GetUsers)
Router.post('/login', UserController.LoginUser)
Router.post('/register', UserController.RegisterUser)
Router.get('/session', UserController.VerifyUserSession)
module.exports = Router
