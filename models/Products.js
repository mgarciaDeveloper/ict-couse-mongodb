var mongoose = require('mongoose')
//crie uma collection com os seguintes campos:
// preço; nome; descrição; categoria(Dermatológico - banho - pomada - cápsula);
//quantidade;
const product = {
    preco: {
        type: Number,
        required: true,
    },
    nome: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    categoria: {
        type: String,
        required: true,
        enum: ['Dermatológico', 'Banho', 'Pomada', 'Cápsula'],
        default: 'Dermatológico',
    },
    quantidade: {
        type: Number,
        required: true,
    },

}

const productSchema= new mongoose.Schema(product);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

