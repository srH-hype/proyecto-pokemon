const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const entrenadorRuta = require('./rutas/entrenadores');
const cors = require('cors');
const corsOpi ={
    origin : 'http://localhost:5500',
    credetials: true,
    optionsSuccessStatus:200
};

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: false}))
const port = process.env.PORT || 7000;

// middleware
app.use(express.json());
app.use('/', entrenadorRuta);


//rutas
app.get('/', (req, res)=>{
    let hola ={
        saludo: 'Hola'
    }

    jwt.sign({hola}, process.env.SECRETO, (err, token)=>{
        res.json({
            token
        });
    });
});

// conexion mongodb
mongoose.connect(process.env.MONGO_URI).then(()=> console.log('Conectado a Mongo'))
.catch((error) => console.error(error));

app.listen(port, ()=> console.log('Server escuchando en puerto', port));