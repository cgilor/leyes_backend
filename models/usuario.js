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

UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})



module.exports = model( 'Usuario', UsuarioSchema );
