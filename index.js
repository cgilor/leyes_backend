const express = require('express');
require('dotenv').config();
const cors =require('cors');
const { dbConnection } = require('./database/config');

//servidor express
const app = express();

// cors
app.use(cors());

//lectura y parseo de body
app.use(express.json());

//base de datos
dbConnection();

//rutas
app.use('/api/usuarios', require ('./routes/rutasUsuarios'));
app.use('/api/leyes', require ('./routes/rutasLeyes'));
app.use('/api/articulos', require ('./routes/rutasArt'));
app.use('/api/todo', require ('./routes/busquedas'));
app.use('/api/login', require ('./routes/auth'));
app.use( '/api/upload', require('./routes/uploads') );



app.listen( process.env.PORT, () => {
     console.log('Servidor running' + process.env.PORT);
});