const { Schema, model } = require('mongoose');

const ArticuloSchema = Schema ({

    nombre: {
        type: String,
        required: true

    },

    texto: {
        type: String,
    },
    
    img: {
        type: String,
       

    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }, 
    
    leyes: {
        type: Schema.Types.ObjectId,
        ref: 'Leyes',
        required: true
    }
    
});

module.exports = model('Articulo', ArticuloSchema);