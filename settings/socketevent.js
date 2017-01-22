var express = require('express');
var config = require('../appconf');

function setSocketevent(io) {
    io.sockets.on('connection', function(socket){
        console.log('Socket is connected.');
        socket.on('showNameData', function(data){
            console.log(data);
            socket.emit('isShowNameWorked', data + ' is King of the world.');
        });
    });
}



module.exports.setSocketevent = setSocketevent;