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
            
            nombreIndice:{
                type: String,
            },
            cuerpoIndice:{
                type: String,
            },
            subIndice:[
                {
                    
                    nombreSubIndice:{
                        type: String,
                    },
                    cuerpoSubIndice:{
                        type: String,
                    },
                    subIndice2:[
                        {
                            nomnbreSubIndice2:{
                                type: String,

                            },
                            CuerpoSubIndice:{
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