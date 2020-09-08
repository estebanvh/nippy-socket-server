const io = require('../server');
let event = require('../events/event');

var functionEmitir = null;
let conexiones = new Map;

io.on("connection", (client) => {

    client.emit("conectado");

    if (!functionEmitir) {

        functionEmitir = (dia) => {
            client.to(dia.idInscripcion.user).emit("caducaDia", dia.idInscripcion);
        }

        event.emit('functionEmitir', functionEmitir);
    }

    client.on("registrar", (datos) => {
        conexiones.set(client.id, datos.id);
        client.join(datos.id);
    });

    client.on("disconnect", () => {
        client.leave(conexiones.get(client.id));
        conexiones.delete(client.id);
    })

});

module.exports = functionEmitir;