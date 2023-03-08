const net = require('net');
const fetch = require('node-fetch');
const amqp = require('amqplib/callback_api');

const server = net.createServer()

let move 

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    server.on('connection', (socket)=>{
        socket.on('data', (data)=>{
            console.log('\nEl cliente uso: ' + data)
            fetch(`https://pokeapi.co/api/v2/move/${data}/`)
            .then((res) => res.json())
            .then((data) => {
              move = data.name;
              console.log(move);
              socket.write(move);
            });
        })
    
        socket.on('close', ()=>{
            console.log('Combate finalizada')
        })
    
        socket.on('error', (err)=>{
            console.log(err.message)
        })
    })
    
    server.listen(4000, ()=>{
        console.log('Servidor Combate esta escuchando en la puerta', server.address().port)
    })
    var queue = 'task_queue';
    var msg = process.argv || "Iniciar Servidor";

    channel.assertQueue(queue, {
      durable: true
    });
    channel.sendToQueue(queue, Buffer.from(msg), {
      persistent: true
    });
    console.log(" [x] Sent '%s'", msg);
  });
  setTimeout(function() {
    connection.close();
    process.exit(0)
  }, 50000);
});