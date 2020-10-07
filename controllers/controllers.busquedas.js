const { response } = require ('express');
const Usuario = require('../models/usuario');
const Leyes = require('../models/leyes');
const Articulo = require('../models/articulos');

const getTodo = async (req, res =response) => {

    const busquedas = req.params.busquedas;
    const regex = new RegExp( busquedas, 'i');


    const [usuarios, leyes, articulos] = await Promise.all([

        Usuario.find({nombre: regex}),
        Leyes.find({nombre: regex}),
        Articulo.find({nombre: regex}),

    ])

    
    res.json({
        ok:true,
        usuarios,
        leyes,
        articulos
    });
}

const getDocumentosColeccion = async(req, res = response ) => {

    const tabla    = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex    = new RegExp( busqueda, 'i' );

    let data = [];

    switch ( tabla ) {
        case 'articulos':
            data = await Articulo.find({ nombre: regex })
                                .populate('usuario', 'nombre img')
                                .populate('leyes', 'nombre img');
        break;

        case 'leyes':
            data = await Leyes.find({ nombre: regex })
                                    .populate('usuario', 'nombre img');
        break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            
        break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
            });
    }
    
    res.json({
        ok: true,
        resultados: data
    })

}


module.exports = {
    getTodo,
    getDocumentosColeccion
}