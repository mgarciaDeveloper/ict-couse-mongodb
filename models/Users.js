var mongoose = require('mongoose')

var theSchema = {
    //característica: JS Type (essa característica é um Número ? É uma string ? )
    cargo: {
        type: String,
        required: true,
        default: 'Atendente',
        enum: ['Atendente', 'Gerente', 'Caixa', 'Farmacêutico(a)']
    },
    name: {
        type: String,
        required: true,
    },


    pronome: {
        type: String,
        required: true,
        default: 'senhor',
        enum: ['senhor', 'senhora', 'senhorita', 'outro']
    },
    ingresso: Date
}

const UsersSchema = new mongoose.Schema(theSchema);

//vamos criar a collection!!
const User = mongoose.model('User', UsersSchema) //são dois campos: o nome da collection e o schema da collection

module.exports = User;