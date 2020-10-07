const { Schema, model, models } = require('mongoose');

const LeyesSchema = Schema ({

    nombre: {
        type: String,
        required: true

    },
    
    img: {
        type: String,
       

    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

module.exports = model('Leyes', LeyesSchema);