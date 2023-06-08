const {Router} = require('express')
const router = Router()
const usuarioController = require("../controllers/usuario.controller")



router.post('/insertarCliente',usuarioController.insertarCliente)


module.exports = router