const principalController = require('../controllers/principal.controller')
const {Router} = require('express')
const { route } = require('./juegos.routes')
const router = Router()

router.get('/login',principalController.login)

router.get('/account',principalController.account)

module.exports = router