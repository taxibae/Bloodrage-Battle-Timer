var express = require('express');
var config = require('../appconf');
var randomGenerator = require('random-string');

var mRoom = {};
var mPeople = {};

function setSocketevent(io) {
    io.sockets.on('connection', function(socket){
        console.log('Socket is connected. id : ' + socket.id);
        socket.on('setuser', function(user){
            mPeople[socket.id] = {
                name: user.username,
                status: 'robby'
            }
            console.log(mPeople[socket.id].name + 'is logged in. All user data is :');
            console.log(mPeople);
        });
        socket.on('disconnectuser', function(user){
            for(var key in socket.rooms){
                console.log(' room delete : ' + key);
                delete mRoom[key];
            }
            delete mPeople[socket.id]
            socket.disconnect(true);
            console.log('disconnected');
        });
        socket.on('makeroom', function (data) {
            do{
                var roomid = randomGenerator({
                    length: 16
                });
            }
            while(mRoom[roomid]);
            socket.join(roomid, function(){
                mRoom[roomid] = data;
                mRoom[roomid].roomid = roomid;
                mRoom[roomid].id = socket.id;
                mRoom[roomid].time = 120;
                mRoom[roomid].autogame = false;
                mRoom[roomid].status = 'robby';
                mRoom[roomid].users = {};
                for(var i = 0 ; i < data.player ; i++){
                    mRoom[roomid].users['p' + (i + 1)] = {
                        id: null,
                        name: null,
                        isEmpty: true
                    };
                }
                console.log('Room initialization : ');
                console.log(mRoom[roomid]);
                var userBuffer = Object.keys(io.sockets.adapter.rooms[roomid].sockets);
                for(var i = 0; i < io.sockets.adapter.rooms[roomid].length; i++){
                    var userid = userBuffer[i];
                    mRoom[roomid].users['p' + (i + 1)].id = userid;
                    if(typeof mPeople[userBuffer[i]] === 'undefined') {
                        emitError(socket ,'user information not matched.')
                    } else {
                        mRoom[roomid].users['p' + (i + 1)].name = mPeople[userid].name;
                        mRoom[roomid].users['p' + (i + 1)].isEmpty = false;
                        console.log('user information injection : ');
                        console.log(mRoom[roomid].users['p' + (i + 1)]);
                    }
                }
                console.log('Room is created. : ');
                console.log(mRoom[roomid]);
                socket.emit('makeroomExec', mRoom[roomid]);
            });
        });
        socket.on('getroom', function(data){
            socket.emit('getroomExec', mRoom);
        });
        socket.on('joinroom', function(data){
            // We need Test return!
            console.log('Join requested by : ');
            console.log(data);
            var flag = false;
            var emptyPlayerSeat;
            if(typeof mRoom[data.roomid] === 'undefined'){
                emitError(socket, 'Roomname ' + data.roomid + ' Not Exists.' );
            } else if (mRoom[data.roomid].status === 'pending'){
                emitError(socket, 'Roomname ' + data.roomid + ' already start.' );
            } else {
                for(var p in mRoom[data.roomid].users){
                    if(mRoom[data.roomid].users[p].isEmpty === true){
                        flag = true;
                        emptyPlayerSeat = p;
                        break;
                    }
                }
                if(flag === false){
                    emitError(socket, 'Roomname ' + data.roomid + ' is Full.' );
                    
                } else {
                    socket.join(data.roomid, function(){
                        mRoom[data.roomid].users[emptyPlayerSeat] = {
                            id: socket.id,
                            name: mPeople[socket.id].name,
                            isEmpty: false
                        }
                        console.log('joined room status : ');
                        console.log(mRoom[data.roomid]);
                        io.to(data.roomid).emit('joinroomExec', mRoom[data.roomid]);
                    });
                }
            }
        });
        socket.on('leaveroom', function(user){
            console.log('leaveroom requested by : ' + user.name)
        });
    });

    var emitError = function(socket, instruction){
        socket.emit('errorOccured', instruction);
    }

    io.sockets.on('disconnect', function(reason){
        console.log('User 1 disconnected because '+ reason);
    });
}

module.exports.setSocketevent = setSocketevent;