const { response } = require('express');
const Articulo  = require('../models/articulos')

const getArt = async(req, res = response) => {

    const articulo = await Articulo.find()
                            .populate('usuario', 'nombre')
                            .populate('leyes', 'nombre')
        res.json({
            ok: true,
            articulo
        })
}
const crearArt = async (req, res = response) => {
    
    const uid = req.uid;
    const articulo = new Articulo({
        usuario: uid,
        ...req.body});
    

    console.log(uid);
    
try {

    const articuloDB = await articulo.save();

    res.json({
        ok: true,
        articulo: articuloDB
    });
    
} catch (error) {
    console.log(error);
    res.status(500).json({
            ok: false,
            msdg:'hable con el Admin'
    });
    
}

}
const actualizarArt = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarArt'
    })
}
const borrarArt = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarArt'
    })
}

module.exports = {
    getArt,
    crearArt,
    actualizarArt,
    borrarArt
}
