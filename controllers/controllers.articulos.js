const { response } = require('express');
const Articulo  = require('../models/articulos')

const getArt = async(req, res = response) => {

    const articulo = await Articulo.find()
                            .populate('usuario', 'nombre img')
                            .populate('ley', 'nombre img')
            
        res.json({
            ok: true,
            articulo
        })
}

const getArtById = async(req, res = response) => {
    const id  = req.params.id;

    try {

        const articulos = await Articulo.findOneAndUpdate(id)
                            .populate('usuario', 'nombre img')
                            .populate('leyes', 'nombre img')
            
        res.json({
            ok: true,
            articulos
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg:'hable con el admin'
        })
        
        
    }
    
}
const crearArt = async (req, res = response) => {
    
    const uid = req.uid;
    const articulo = new Articulo({
        usuario: uid,
        ...req.body});
    
        console.log(articulo);
    
    
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
const actualizarArt = async(req, res = response) => {
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const articulo = await Articulo.findById( id );

        if ( !articulo ) {
            return res.status(404).json({
                ok: true,
                msg: 'leyes no encontrado por id',
            });
        }

        const cambiosArticulo = {
            ...req.body,
            usuario: uid
        }

        const articuloActualizado = await Articulo.findOneAndUpdate( id, cambiosArticulo, { new: true } );


        res.json({
            ok: true,
            articulo: articuloActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}
const borrarArt = async(req, res = response) => {
    const id  = req.params.id;
    

    try {
        
        const articulo = await Articulo.findById( id );

        if ( !articulo ) {
            return res.status(404).json({
                ok: true,
                msg: 'articulo no encontrado por id',
            });
        }

       

        await Articulo.findByIdAndDelete(id);


        res.json({
            ok: true,
            
            msg: 'articulo borrada'
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
    getArt,
    crearArt,
    actualizarArt,
    borrarArt,
    getArtById
}
