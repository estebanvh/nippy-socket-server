require('./config/config');
//socket server
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
module.exports = io;
require('./socket/socket');


server.listen(process.env.PORT, () => {
    console.log("Socket server up");

    const agenda = require('./agenda/agenda');
    agenda.on('ready', function() {
        agenda.every(process.env.PERIODICIDAD, 'caducaDias');
        agenda.processEvery(process.env.PERIODICIDAD);
        agenda.start();
    });
});