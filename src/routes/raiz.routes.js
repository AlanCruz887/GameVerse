const principalController = require('../controllers/principal.controller')
const {Router} = require('express')
const router = Router()

router.get('/',principalController.index)


module.exports = router