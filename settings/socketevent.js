var express = require('express');
var config = require('../appconf');

var userdata = {};

function setSocketevent(io) {
    io.sockets.on('connection', function(socket){
        console.log('Socket is connected. id : ' + socket.id);
        socket.on('setuser', function(data){
            socket.user = {};
            socket.user.id = socket.id;
            socket.user.name = data.username;
            console.log(socket.user.name + 'is logged in.');
        });
        socket.on('makeroom', function (data) {
            console.log('Joining the room : ' + data);
            socket.join(data);
            roomId = data;
        });
    });

    io.sockets.on('disconnect', function(reason){
        console.log('User 1 disconnected because '+ reason);
    });
}

module.exports.setSocketevent = setSocketevent;