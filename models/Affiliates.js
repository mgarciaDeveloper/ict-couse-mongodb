var mongoose = require('mongoose');

//criar uma collection de filiais: cnpj, nome, endereço ({lat, lng}) , telefone, email, 
// funcionários(ref. por ID),, produtos

//1. criar o schema
//2. Seto o mongoose model baseaddo no schema
//3. criar o model/colection
//4. exportar o model

const affiliate = {
    cnpj: {
        type: Number,
        required: true,
    },
    nome: {
        type: String,
        required: true,
    },
    endereco: {
        lat: {
            type: Number,
            required: true,
        },
        lng: {
            type: Number,
            required: true,
        },
    },
    telefone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    funcionarios: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    },
    produtos: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
}
const affiliateSchema = new mongoose.Schema(affiliate);
const Affiliate = mongoose.model('Affiliate', affiliateSchema);
module.exports = Affiliate;


