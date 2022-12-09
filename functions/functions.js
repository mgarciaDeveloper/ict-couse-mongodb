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



module.exports = { traduzir, square, helloWorld }