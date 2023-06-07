const morgan = require('morgan')
const express = require('express')
const multer = require('multer')
const path = require('path')
const app = express()

app.set('port',process.env.PORT||3300)



app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(morgan('dev'))

app.use(require ("./routes/usuario.routes"))
app.use(require ("./routes/raiz.routes"))
app.use(require('./routes/juegos.routes'))

module.exports = app;
