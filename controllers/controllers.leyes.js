const { response, json } = require('express');

const  Leyes = require('../models/leyes');

const getLeyes = async (req, res = response) => {

    const leyes = await Leyes.find().populate('usuario','nombre img')
        res.json({
            ok: true,
            leyes
        })
}
const crearLeyes = async(req, res = response) => {

    const uid = req.uid;
    const leyes = new Leyes({
        usuario: uid,
        ...req.body});
    

    console.log(uid);
    
try {

    const leyesDB = await leyes.save();

    res.json({
        ok: true,
        leyes: leyesDB
    });
    
} catch (error) {
    console.log(error);
    res.status(500).json({
            ok: false,
            msdg:'hable con el Admin'
    });
    
}

    
}
const actualizarLeyes = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarLeyes'
    })
}
const borrarLeyes = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarLeyes'
    })
}

module.exports = {
    getLeyes,
    crearLeyes,
    actualizarLeyes,
    borrarLeyes
}
