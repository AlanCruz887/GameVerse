const express = require('express');
const router = express.Router();
const juegoController = require('../controllers/juego.controller');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');


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
router.post('/insertarjuego', upload.single('imagen'), async (req, res, next) => {
  try {
    // Redimensionar y recortar la imagen antes de guardarla
    const resizedImageName = `resized-${req.file.filename}`;
    const resizedImagePath = `./public/uploads/${resizedImageName}`;
    await sharp(req.file.path)
      .resize({ width: 700 ,height:350}) // Especificar solo el ancho deseado, la altura se ajustará automáticamente
      .toFile(resizedImagePath);

    // Eliminar la imagen original
    fs.unlinkSync(req.file.path);

    // Llamar al controlador para insertar el juego con el nombre de la imagen redimensionada
    req.body.imagen = resizedImageName;
    juegoController.insertarJuego(req, res, next);
  } catch (error) {
    // Manejar el error si ocurre durante la redimensión de la imagen
    console.error(error);
    res.status(500).send('Error al procesar la imagen.');
  }
});




router.get('/', juegoController.obtenerJuegos);

module.exports = router;
