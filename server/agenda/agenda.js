const mongoose = require('mongoose');
let functionEmitir = require('../socket/socket');
let event = require('../events/event');

const notificaciones = new Map();

let connection = async() => {
    await mongoose.connect(process.env.DB_URI, {
        user: process.env.MONGO_USER,
        pass: encodeURIComponent(process.env.MONGO_PASS),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });

};

connection();

const Agenda = require('agenda');
const { diasCaducados, eliminarDia } = require('../DAO/dia.dao');
const { actualizar } = require('../DAO/reto-user.dao');

const agenda = new Agenda({
    db: {
        address: process.env.DB_URI,
        options: {
            useUnifiedTopology: true
        }
    }
});

event.on('functionEmitir', (funcion) => {
    functionEmitir = funcion;
});

agenda.define('caducaDias', async function(job) {
    console.log('################################');
    console.log("Caduca dias. Time: " +
        new Date());
    let dias = [];

    dias = await diasCaducados(new Date().getTime());

    dias.forEach((dia) => {
        actualizar(dia.idInscripcion);
        eliminarDia(dia.idInscripcion);

        if (functionEmitir) {
            functionEmitir(dia);
        }

    });

});


module.exports = agenda;