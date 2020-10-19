const { Schema, model } = require('mongoose');

const ArticuloSchema = Schema ({

    nombre: {
        type: String,
        required: true

    },

    cuerpo: {
        type: String,
    },

    indiceArt:[
        {
        nombreI:{
            type: String,
                },
            
        cuerpoI:{
            type: String,
                },
            subIndice:[
                {
                    nombreSubI:{
                        type: String,
                               },
                    cuerpoSubI:{
                        type: String,
                               },
                    subIndice2:[
                        {
                            nombreSubI2:{
                                type: String,
                                        },
                            cuerpoSubI2:{
                                type: String,
                                        }
                        }
                    ]
                }
            ]

        }
    ],
    
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

ArticuloSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Articulo', ArticuloSchema);