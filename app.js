const express = require('express');
require("dotenv").config();
const translate = require('translate-google')

const MongoStore = require("connect-mongo");
const mongoose = require('mongoose');

const app = express()
const port = 3000


async function callbackTest(valor, callBack) {
    let result = await valor.map((e, i) => {
        return {
            novaProp: `${i} : ${e}`
        }
    })
    if (!callBack) {
        return result
    } else {
        return callBack(result)
    }
}
let novoArray = callbackTest(['valor1', 'valor2', 'Valor3', 'valor1', 'valor2', 'Valor3', 'valor1', 'valor2', 'Valor3', 'valor1', 'valor2', 'Valor3', 'valor1', 'valor2', 'Valor3'])
console.log(novoArray)

callbackTest(
    ['valor1', 'valor2', 'Valor3', 'valor1', 'valor2', 'Valor3', 'valor1', 'valor2', 'Valor3', 'valor1', 'valor2', 'Valor3', 'valor1', 'valor2', 'Valor3'],
    (resultadoDaFuncaoMae) => { console.log(resultadoDaFuncaoMae) }
)


//---imports

// um projeto precisa de 01 DB que armazenará COLLECTIONS
//EXEMPLO DA FAMÁRCIA: criaremos um DB chamado yagoPharma. essa DB armazena todos os dados da farmaácia. Esses dados ficam separados
//em 'gavetas', que chamaremos de Collections.
// Cada collection armazena uma família de documentos. 
// collection1: filiais;
// collection2: funcionarios;
// collection3: remédios ;
// Cada collection armazena objetos que têm os mesmos tipos de características, claro, com valores diferentes.

//------ AULA 03
mongoose.connect('mongodb+srv://matheus:caixaApp10@cluster0.kin8f.mongodb.net/yagoPharma?retryWrites=true&w=majority', { /* endereço do banco de dados */
    useNewUrlParser: true,
    useUnifiedTopology: true
})


//------ AULA 01

var functions = require('./functions/functions')

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
var Product = require('./models/Products.js');

app.get('/', (req, res) => {
    res.send('Hello World!')
})

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