const translate = require('translate-google')

function square(num) {
    let floatNum = parseFloat(num)
    return floatNum * floatNum
}

function helloWorld() {
    return 'helloWorld'
}





function traduzir(mensagem, funcaoRetorno) {
    translate(mensagem, { to: 'pt' }).then(res => {
        console.log(res)
        funcaoRetorno(res)
    }).catch(err => {
        if (!err) {
            return `${res}`
        }
    })
}

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

/* callbackTest(
    ['valor1', 'valor2', 'Valor3', 'valor1', 'valor2', 'Valor3', 'valor1', 'valor2', 'Valor3', 'valor1', 'valor2', 'Valor3', 'valor1', 'valor2', 'Valor3'],
    (resultadoDaFuncaoMae) => { console.log(resultadoDaFuncaoMae) }
) */


module.exports = { traduzir, square, helloWorld, callbackTest }