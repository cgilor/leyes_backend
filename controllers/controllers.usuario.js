const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helper/jwt');
//const { actualizarUsuario } = require('../routes/rutasUsuarios');

const getUsuarios = async (req, res) => {

    const desde = Number(req.query.desde) || 0; 
    //const total = Usuario.count();

    const [usuarios, total] = await Promise.all([
        Usuario
                .find({}, 'nombre email img')
                .skip(desde)
                .limit(5),

        Usuario.countDocuments()
    ]);

    res.json({
        ok: true,
        usuarios,
        total
    });
}

const crearUsuario = async (req, res = response) => {
    const { email, password, nombre } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail){
            return res.status(400).json({
                ok: false,
                msg: "el mail ya existe"
            });
        }
        const usuario = new Usuario(req.body);
        // encriptar pass
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);


        await usuario.save();

        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        });
        
    }

}

const actualizarUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No exist usuario'
            });
        }

        const campos = req.body;
        if(usuarioDB.email === req.body.email){
            delete campos.email;
        } else{
            const existeEmail = await Usuario.findOne({email: req.body.email});
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya exite ese Email'
                });
            }
        }
        delete campos.password;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});


        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
        
    }

}


module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario
}