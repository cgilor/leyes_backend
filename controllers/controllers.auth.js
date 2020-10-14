const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const {generarJWT} = require('../helper/jwt');

const login = async (req, res = response ) => {


    const{ email, password } = req.body;
    
    try {

        const usuarioDB = await Usuario.findOne({ email });

        if(!usuarioDB){

            return res.status(404).json({
                ok: false,
                msg: 'email no valida'
            });
        }

        const validarPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validarPassword){
            return res.status(404).json({
                ok: false,
                msg: 'contraseña no valida'
            });
        }
        //generar token
        const token = await generarJWT(usuarioDB.id);

        

        res.json({
            ok: true,
            token
        });
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:' Hable con el Admin '
        });
    }
}

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    const token = await generarJWT(uid);

    const usuario = await Usuario.findById(uid);

    res.json({

        ok: true,
        token,
        usuario

    })
}

module.exports = {
    login,
    renewToken
}