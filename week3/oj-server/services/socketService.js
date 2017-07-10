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


//var redisClient = require('../modules/redisClient');
//const TIMEOUT_IN_SECONDS = 3600;

module.exports = function(io) {
    // collaboration sessions
    var collaborations = [];
    // map from socketId to sessionId
    var socketIdToSessionId = [];

    //var sessionPath = "/temp_sessions";

    io.on('connection', socket => {
        //we use problemId as sessionId
        let sessionId = socket.handshake.query['sessionId'];

        socketIdToSessionId[socket.id] = sessionId;
        // if session exists, add socket.id to corresponding collaboration session participants list
        if (sessionId in collaborations) {
            collaborations[sessionId]['participants'].push(socket.id);
        //if session does not exist, add a new session
        } else {
            // redisClient.get(sessionPath + '/' + sessionId, function(data) {
            //     if (data) {
            //         console.log("session terminiated previsouly; pulling back from Redis.");
            //         collaborations[sessionId] = {
            //             'cachedChangeEvents': JSON.parse(data),
            //             'participants': []
            //         };
            //     } else {
                    console.log("creating new session");
                    collaborations[sessionId] = {
                        'cachedChangeEvents': [],
                        'participants': []
                    };
                 //}
                collaborations[sessionId]['participants'].push(socket.id);
            //});
        }


        // socket event listeners
        socket.on('change', delta => {
            console.log( "change " + socketIdToSessionId[socket.id] + " " + delta ) ;
            let sessionId = socketIdToSessionId[socket.id];
            //if sessionId already exists in collaborations, broadcast change
            if (sessionId in collaborations) {
                let participants = collaborations[sessionId]['participants'];
                for (let i =0; i < participants.length; i++) {
                    //exclude oneself from receiver list
                    if(socket.id != participants[i]){
                        //send change to everyone
                        io.to(participants[i]).emit("change", delta);
                    }
                }
                collaborations[sessionId]['cachedChangeEvents'].push(["change", delta, Date.now()]);
            } else {
                console.log("WARNING: could not tie socket_id to any collaboration");
            }

            //forwardEvents(socket.id, 'change', delta);
        });
    });
};
