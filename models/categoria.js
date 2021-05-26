const {Schema, model} = require('mongoose');
const { message } = require('../dictionary/dictionary');

const CategoriaSchema = Schema({

    nombre: {
        type: String,
        require: [true, message.nombre_req]
    },
    estado: {
        type: Boolean,
        default: true,
        require: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    }

});

CategoriaSchema.methods.toJSON = function(){
    const { __v, estado, ...data } = this.toObject();
    return data
}

module.exports = model( 'Categoria', CategoriaSchema );