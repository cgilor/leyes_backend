const express = require('express');
require('dotenv').config();
const cors =require('cors');
const { dbConnection } = require('./database/config');


//servidor express
const app = express();
//cgil pass: gd0DAYnyjEEPHLr3 DB mongo mongodb+srv://cgil:gd0DAYnyjEEPHLr3@cluster0.mno12.mongodb.net/leyesmxdb
//rutas
// cors
app.use(cors());

//base de datos
dbConnection();

//rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola mundo'
    });
});

app.listen( process.env.PORT, () => {
     console.log('Servidor running' + process.env.PORT);
});