const express = require('express');
const entrenadorEsquema = require('../modelo/entrenador')
require('dotenv').config();
const jwt = require('jsonwebtoken');
const router = express.Router();

// crear entrenador
router.post('/entrenadores', (req, res) =>{
    const entrenador = entrenadorEsquema(req.body);
    entrenador 
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// todos los entrenadores
router.get('/entrenadores', (req, res) =>{
    entrenadorEsquema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// buscar un entrenador
router.get('/entrenadores/:name', (req, res) => {
    entrenadorEsquema
        .find({name: req.params.name})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// actualizar un entrenador
router.put('/entrenadores/:name', (req, res) => {
    const { name } = req.params;
    const {pokemones} = req.body
    entrenadorEsquema
        .updateOne({name: name},{ $set: {pokemones}})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// elimiar entrenador
router.delete('/entrenadores/:id', (req, res) => {
    const { id } = req.params;
    entrenadorEsquema
        .deleteOne({_id: id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

module.exports = router;