const { path } = require('./configs/config');
const socketPasser = require('./socketPasser');
const { isValidObject, isRequiredObject, isDefinedObject } = require('../commons/functions/validateObj') //Keeping this public
global.arrayUser = [];
socket = function (io) {
    //Listening for connection client.
    io.on('connection', function (socketIo) {
        socketIo.on("joinRoom", (idRoom) => {
            socketIo.join(`${idRoom}`)
        })
        
        socketIo.on("joinUser", (userid) => {
            socketIo.join(`${userid}`)
        })
        socketIo.on(path.SER_PAT, function (req) {
            socketPasser(req, socketIo, io);
        });
    });
}

module.exports.socket = socket
