const Usuario = require('../models/usuario');
const fs = require('fs');

const Articulo = require('../models/articulos');
const Leyes = require('../models/leyes');


const borrarImagen = ( path ) => {
    if ( fs.existsSync( path ) ) {
        // borrar la imagen anterior
        fs.unlinkSync( path );
    }
}


const actualizarImagen = async(tipo, id, url) => {

    let pathViejo = '';
    
    switch( tipo ) {
        case 'articulos':
            const articulos = await Articulo.findById(id);
            if ( !articulos ) {
                console.log('No es un médico por id');
                return false;
            }

            pathViejo = `./uploads/articulos/${ articulos.img }`;
            borrarImagen( pathViejo );

            articulos.img = url;
            await articulos.save();
            return true;

        break;
        
        case 'leyes':
            const leyes = await Leyes.findById(id);
            if ( !leyes ) {
                console.log('No es un leyes por id');
                return false;
            }

            pathViejo = `./uploads/leyes/${ leyes.img }`;
            borrarImagen( pathViejo );

            leyes.img = url;
            await leyes.save();
            return true;

        break;
        
        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if ( !usuario ) {
                console.log('No es un usuario por id');
                return false;
            }

            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen( pathViejo );

            usuario.img = url;
            await usuario.save();
            return true;

        break;
    }


}



module.exports = { 
    actualizarImagen
}
