const { response, json } = require('express');

const  Leyes = require('../models/leyes');
const Articulo  = require('../models/articulos');

const getLeyes = async (req, res = response) => {

    const leyes = await Leyes.find()
        res.json({
            ok: true,
            leyes
        })
}

const getArtByLeyId = async (req, res = response) => {

    const leyesId = req.params.id;

    const articulos = await Articulo.find({leyes: leyesId })
        res.json({
            ok: true,
            articulos
        })

        console.log(leyesId);
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
const actualizarLeyes = async(req, res = response) => {
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const leyes = await Leyes.findById( id );

        if ( !leyes ) {
            return res.status(404).json({
                ok: true,
                msg: 'leyes no encontrado por id',
            });
        }

        const cambiosLeyes = {
            ...req.body,
            usuario: uid
        }

        const leyesActualizado = await Leyes.findOneAndUpdate( id, cambiosLeyes, { new: true } );


        res.json({
            ok: true,
            leyes: leyesActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}
const borrarLeyes = async(req, res = response) => {
    const id  = req.params.id;
    

    try {
        
        const leyes = await Leyes.findById( id );

        if ( !leyes ) {
            return res.status(404).json({
                ok: true,
                msg: 'leyes no encontrado por id',
            });
        }

       

        await Leyes.findByIdAndDelete(id);


        res.json({
            ok: true,
            
            msg: 'ley borrada'
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    getLeyes,
    getArtByLeyId,
    crearLeyes,
    actualizarLeyes,
    borrarLeyes
}
