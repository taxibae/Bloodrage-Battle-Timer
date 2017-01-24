var express = require('express');
var config = require('../appconf');

var mRoom = {};

function setSocketevent(io) {
    io.sockets.on('connection', function(socket){
        console.log('Socket is connected. id : ' + socket.id);
        socket.on('setuser', function(data){
            socket.user = {};
            socket.user.id = socket.id;
            socket.user.name = data.username;
            console.log(socket.user.name + 'is logged in.');
        });
        socket.on('disconnectuser', function(data){
            for(var key in socket.rooms){
                console.log(' room delete : ' + key);
                delete mRoom[key];
            }
            socket.disconnect(true);
            console.log('disconnected');
        });
        socket.on('makeroom', function (data) {
            if(mRoom[data.title]) {
                //make random room
            }
            socket.join(data.title, function(){
                mRoom[data.title] = data;
                mRoom[data.title].id = socket.id;
                mRoom[data.title].status = 'robby';
            });
        });
        socket.on('getroom', function(data){
            socket.emit('getroomExec', mRoom);
        });
        socket.on('joinroom', function(data){
            if(typeof mRoom[data.title] === 'undefined'){
                socket.emit('error', 'Roomname ' + data.title + ' Not Exists.' );
            } else {
                socket.join(data.title);
            }
            
        });
    });

    io.sockets.on('disconnect', function(reason){
        console.log('User 1 disconnected because '+ reason);
    });
}

module.exports.setSocketevent = setSocketevent;