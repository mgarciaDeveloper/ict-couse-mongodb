var mongoose = require('mongoose')
const { type } = require('os')
var passportLocalMongoose = require('passport-local-mongoose')

var theSchema = {
    //característica: JS Type (essa característica é um Número ? É uma string ? )
    username: {
        type: String
    },
};
const UsersSchema = new mongoose.Schema(theSchema);
UsersSchema.plugin(passportLocalMongoose)
//vamos criar a collection!!
const User = mongoose.model('User', UsersSchema) //são dois campos: o nome da collection e o schema da collection

module.exports = User;