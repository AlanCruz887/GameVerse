const {Router} = require('express')
const router = Router()
const carritoController = require("../controllers/carritos.controller")



router.post('/insertar',carritoController.insertarCliente)


module.exports = router