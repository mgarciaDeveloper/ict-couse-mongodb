var mongoose = require('mongoose')
const { type } = require('os')
var passportLocalMongoose = require('passport-local-mongoose')

var theSchema = {
    //característica: JS Type (essa característica é um Número ? É uma string ? )
    username: {
        type: String
    },
    address: {
        type: String
    },
    age: {
        type: Number
    },
    income: {
        type: String,
        default:'até 8000',
        enum:['Prefiro Não informar','até 2000', 'até 5000', 'até 8000', 'até 10000', 'até 15000', 'até 20000', 'mais de 20000']
    }

};
const UsersSchema = new mongoose.Schema(theSchema);
UsersSchema.plugin(passportLocalMongoose)
//vamos criar a collection!!
const User = mongoose.model('User', UsersSchema) //são dois campos: o nome da collection e o schema da collection

module.exports = User;