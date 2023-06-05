const {Router} = require('express')
const router = Router()
const usuarioController = require("../controllers/usuario.controller")



router.post('/insertar',usuarioController.insertarCliente)


module.exports = router