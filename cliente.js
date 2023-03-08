const net = require('net');
const readline = require('readline-sync')

const options = {
    port: 4000,
    host: '127.0.0.1'
}

const client = net.createConnection(options)

client.on('connect', ()=>{
    console.log('Iniciar combate')
    sendLine()
})

client.on('data', (data)=>{
    console.log('Movimiento: ' + data)
    sendLine()
})

client.on('error', (err)=>{
    console.log(err.message)
})

function sendLine() {
    var line = readline.question('\ndigite su movimiento (1-826)\t')
    if (line == "0") {
        client.end()
    }else{
        client.write(line.toString());
    }
}

