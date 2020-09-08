require('./config/config');
//socket server
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
module.exports = io;
require('./socket/socket');


server.listen(3100, () => {
    console.log("Socket server up");

    const agenda = require('./agenda/agenda');
    agenda.on('ready', function() {
        agenda.every('1 minute', 'caducaDias');
        agenda.processEvery('1 minute');
        agenda.start();
    });
});