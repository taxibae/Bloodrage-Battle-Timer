var express = require('express');
var config = require('../appconf');

function setSocketevent(io) {
    io.sockets.on('connection', function(socket){
        console.log('Socket is connected. id : ' + socket.id);
        socket.on('showNameData', function(data){
            console.log(data);
            socket.emit('isShowNameWorked', data + ' is King of the world.');
        });
    });

    io.sockets.on('disconnect', function(socket){
        console.log('Socket is discnnected. id : ' + socket.id);
    });
}



module.exports.setSocketevent = setSocketevent;