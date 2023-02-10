const express = require('express');
require("dotenv").config();
const MongoStore = require("connect-mongo");
const mongoose = require('mongoose');
const passport = require('passport')
const flash = require("req-flash");
const session = require('express-session')
const cors = require('cors');
const app = express()
const port = 3000




const translate = require('translate-google')

const tradutor = async (mensagem, callback) => {
    translate(mensagem, { to: 'pt' }).then(async (res) => {
        if (res) {
            return callback(res)
        }
    }
    ).catch(err => {
        callback('erro na tradução!')
    })
}

mongoose.connect(process.env.MONGO_URL, { /* endereço do banco de dados */
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(
    cors({
        origin: '*',
        credentials: true
    })
);



app.use(
    session(
        {
            cookie: process.env.DEVELOPMENT //null para desenvolvimento e configurada para produção
                ? null
                : { secure: true, maxAge: 4 * 60 * 60000, sameSite: 'none' },
            secret: process.env.SECRET,
            resave: false,
            saveUninitialized: false,
            store: process.env.DEVELOPMENT
                ? null
                : MongoStore.create(
                    {
                        mongoUrl: process.env.MONGO_URL,

                    },
                    (err, resposta) => {
                        console.log(`${err}/${resposta}`)
                    }
                )
        }));


var functions = require('./functions/functions');


function traduzir(mensagem, funcao) {
    translate(mensagem, { to: 'pt' }).then(res => {
        funcao(res)
    }).catch(err => {
        if (!err) {
            return `${res}`
        }
    })
}


// Importar as collections
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // ...

var Product = require('./models/Products.js');
var User = require('./models/Users')
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

var Affiliate = require('./models/Affiliates')

app.get('/', (req, res) => {
    res.send('Você está acessando o servidor principal')
})



app.get('/traduzir', (req, res) => {
    let msg = req.query.msg;
    tradutor(msg,
        (resposta) => {
            res.send(resposta)
        }
    )
})


//novo comentário feito no dia 10fev2023, a partir de um backup de dez/22
app.get('/products', (req, res) => {

    if (req.query.identificador) {
        Product.findById(req.query.identificador,
            (err, found) => {
                if (err) {
                    res.send(Object.values(err.errors).map(val => val.message))
                } else if (!found) {
                    res.send('nada encontrado')
                } else {
                    res.send(found)
                }
            }
        )
    } else {
        Product.find({}).then((objetosEncontrados) => {
            res.send(objetosEncontrados)
        })
    }
});

app.get('/products/:identificador', (req, res) => {

    Product.findById(req.params.identificador,
        (err, found) => {
            if (err) {
                res.send(Object.values(err.errors).map(val => val.message))
            } else if (!found) {
                res.send('nada encontrado')
            } else {
                res.send(found)
            }
        }
    )
})

app.post('/theProduct', (req, res) => {
    console.log(req.query)
    let newObject = req.query;


    let newProduto = new Product(newObject);

    newProduto.save((err, objetoSalvo) => {
        if (err || !objetoSalvo) {
            console.log(err)
            res.send(Object.values(err.errors).map(val => val.message))
        } else {
            res.send(objetoSalvo)
        }
    })
})

// 
app.post('/update/:identificador', async (req, res) => {
    console.log(req.query)

    let newObj = {}
    let keys = Object.keys(req.query)

    keys.forEach((o, i) => {
        console.log(o)
        newObj[`${o}`] = req.query[`${o}`]
    })


    Product.findByIdAndUpdate(
        '12343',
        newObj,
        { multi: true },
        async (err, savedObj) => {
            if (err) {
                functions.traduzir(err.message,
                    (resposta) => { res.send(resposta) }
                )

            } else if (!savedObj) {
                return res.json(`O objeto não foi encontrado ou não foi salvo`)
            } else {
                return res.json(`O objeto foi salvo!`)
            }
        }
    )

})



app.post('/', (req, res) => {
    console.log(req)
    //a info que vem como forma de PARAMS do client, é lida como req.query pelo server! 
    res.send(req.query)
})

app.post('/retornaQuadrado', (req, res) => {
    res.send(`${functions.square(req.query.numero)}`)
})

//------ AULA 02

var internalData = require('./db/exportData');
const { find } = require('./models/Products.js');

//Cada app.METHOD que eu crio, é uma porta de acesso ao meu servidor!
app.post('/vanillaLogin', async (req, res) => {

    console.log(req.query)
    /* 
para usar a função filter(), é necessário aplicar sua formatação default:
array.filter((each,index)=>{
    return **Condição de verificação**
})
Lembrando que 'each' é cada objeto do array passando pelo looping, e index é sua posição do array
*/
    const arrayFiltrado = await internalData.users().filter((each, index) => {
        return each.username === req.query.username && each.password === req.query.password
    })
    console.log(internalData.users())
    res.send(arrayFiltrado);

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})