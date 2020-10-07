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


const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';
    
    switch( tipo ) {
        case 'medicos':
            const articulos = await Articulo.findById(id);
            if ( !articulos ) {
                console.log('No es un médico por id');
                return false;
            }

            pathViejo = `./uploads/articulos/${ articulos.img }`;
            borrarImagen( pathViejo );

            medico.img = nombreArchivo;
            await medico.save();
            return true;

        break;
        
        case 'hospitales':
            const leyes = await Leyes.findById(id);
            if ( !leyes ) {
                console.log('No es un hospital por id');
                return false;
            }

            pathViejo = `./uploads/leyes/${ leyes.img }`;
            borrarImagen( pathViejo );

            hospital.img = nombreArchivo;
            await hospital.save();
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

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

        break;
    }


}



module.exports = { 
    actualizarImagen
}
