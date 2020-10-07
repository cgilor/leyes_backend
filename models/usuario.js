const { Schema, model, models } = require('mongoose');

const UsuarioSchema = Schema ({

    nombre: {
        type: String,
        require: true

    },
    email: {
        type: String,
        require: true,
        unique: true

    },
    password: {
        type: String,
        require: true

    },
    img: {
        type: String,
       

    },
    role: {
        type: String,
        require: true,
        default: 'USER_ROLE'
    }
});



module.exports = model('Usuario', UsuarioSchema);