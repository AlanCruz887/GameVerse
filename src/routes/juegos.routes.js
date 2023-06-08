const express = require('express');
const router = express.Router();
const juegoController = require('../controllers/juego.controller');
const multer = require('multer');

// Configuración de multer para la subida de archivos
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function (req, file, cb) {
    // Generar un nombre único para el archivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage: storage });

// Ruta para insertar un juego con la subida de una imagen
router.post('/insertarjuego', upload.single('imagen'), juegoController.insertarJuego);

module.exports = router;
