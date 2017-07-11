// module.exports = function(io) {
//     //get the socket when establish a connection
//
//   io.on('connection', (socket) => {
//       console.log(socket);
//
//       //get identity or initial value (session id, problem id, etc) in message
//       var message = socket.handshake.query['message'];
//       console.log(message);
//       //send message back to the unique socket id
//       io.to(socket.id).emit('message', 'hello from server');
//   })
// };


var redisClient = require('../modules/redisClient');
const TIMEOUT_IN_SECONDS = 3600;

module.exports = function(io) {
    // collaboration sessions
    var collaborations = [];
    // map from socketId to sessionId
    var socketIdToSessionId = [];

    //to indicate redis path for this project
    var sessionPath = "/temp_sessions";

    io.on('connection', socket => {
        //we use problemId as sessionId
        let sessionId = socket.handshake.query['sessionId'];

        socketIdToSessionId[socket.id] = sessionId;
        // if session exists, add socket.id to corresponding collaboration session participants list
        if (sessionId in collaborations) {
            collaborations[sessionId]['participants'].push(socket.id);
        //if session does not exist, see if redis has that session, if no, then add a new session
        } else {
            //try to get data from redis
            redisClient.get(sessionPath + '/' + sessionId, function(data) {
                if (data) {
                    console.log("session terminiated previsouly; pulling back from Redis.");
                    collaborations[sessionId] = {
                        'cachedChangeEvents': JSON.parse(data),
                        'participants': []
                    };
                } else {
                    console.log("creating new session");
                    collaborations[sessionId] = {
                        'cachedChangeEvents': [],
                        'participants': []
                    };
                 }
                collaborations[sessionId]['participants'].push(socket.id);
            });
        }


        // socket event listeners
        socket.on('change', delta => {
            console.log( "change " + socketIdToSessionId[socket.id] + " " + delta ) ;

            let sessionId = socketIdToSessionId[socket.id];

            if (sessionId in collaborations) {
                //event array: key is "change" and value is event, and add date for debug purpose
                collaborations[sessionId]['cachedChangeEvents'].push(["change", delta, Date.now()]);
            }

            forwardEvents(socket.id, 'change', delta);
        });

        //handle cursor move events
        socket.on('cursorMove', cursor => {
            console.log( "cursorMove " + socketIdToSessionId[socket.id] + " " + cursor ) ;
            cursor = JSON.parse(cursor);
            cursor['socketId'] = socket.id;
            forwardEvents(socket.id, 'cursorMove', JSON.stringify(cursor));
        });

        socket.on('restoreBuffer', () => {
            let sessionId = socketIdToSessionId[socket.id];
            console.log('restoring buffer for session: ' + sessionId + ', socket: ' + socket.id);
            if (sessionId in collaborations) {
                let changeEvents = collaborations[sessionId]['cachedChangeEvents'];
                for (let i = 0; i < changeEvents.length; i++) {
                    socket.emit(changeEvents[i][0], changeEvents[i][1]);
                }
            }
        });

        socket.on('disconnect', function() {
            let sessionId = socketIdToSessionId[socket.id];
            console.log('socket ' + socket.id + 'disconnected.');

            if (sessionId in collaborations) {
                let participants = collaborations[sessionId]['participants'];
                let index = participants.indexOf(socket.id);
                //if server crashed or someone counterfeited a session, it might cause problem since index might = 0
                if (index >= 0) {

                    //delete marker for this user
                    forwardEvents(socket.id, 'removeMarker', socket.id);
                    console.log('delete marker emitted');

                    //delete this participant
                    participants.splice(index, 1);
                    if (participants.length == 0) {
                        console.log("last participant left. Storing in Redis.");
                        let key = sessionPath + "/" + sessionId;
                        let value = JSON.stringify(collaborations[sessionId]['cachedChangeEvents']);
                        redisClient.set(key, value, redisClient.redisPrint);
                        redisClient.expire(key, TIMEOUT_IN_SECONDS);
                        delete collaborations[sessionId];
                    }
                }
            }
        });

        function forwardEvents(socketId, eventName, dataString) {
            let sessionId = socketIdToSessionId[socketId];

            //if sessionId already exists in collaborations, broadcast change
            if (sessionId in collaborations) {
                let participants = collaborations[sessionId]['participants'];
                for (let i =0; i < participants.length; i++) {
                    //exclude oneself from receiver list
                    if(socket.id != participants[i]){
                        //send change to everyone
                        io.to(participants[i]).emit(eventName, dataString);
                    }
                }
                collaborations[sessionId]['cachedChangeEvents'].push([eventName, dataString, Date.now()]);
            } else {
                console.log("WARNING: could not tie socket_id to any collaboration");
            }
        }
    });
};
