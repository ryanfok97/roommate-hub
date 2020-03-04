var serverData = require('../server-data/data');
var SpotifyWebApi = require('spotify-web-api-node');

var trackTimeout;

var credentials = {
    clientId: '365de91bc43d485cbd5b268b96c6be2e', 
    clientSecret: '96f07e8d7313410ea4a5bda15247880d', 
    redirectUri:'http://localhost:3002/spotify/callback' 
}

var spotifyApi = new SpotifyWebApi(credentials);

//const DEVICE_ID = '44e8e24be11f9884039272bacaf3672e15f2dd69';//'6ba22e6e31de058aa6014842317225574a3a8539';

function callback(req, res) {
  // Get authorization code
  var code = req.query.code;

  // Get access and refresh tokens, refresh token when needed
  spotifyApi.authorizationCodeGrant(code).then(
      function(data) {
          console.log('The token expires in ' + data.body['expires_in']);
          console.log('The access token is ' + data.body['access_token']);
          console.log('The refresh token is ' + data.body['refresh_token']);
      
          // Set the access token on the API object to use it in later calls
          spotifyApi.setAccessToken(data.body['access_token']);
          spotifyApi.setRefreshToken(data.body['refresh_token']);
          res.status(200).send('Logged in and received access and refresh tokens!');
      },
      function(err) {
          console.log('Something went wrong!', err);
          res.status(500).send('Error retrieving tokens');
      }
  ).then(() => {
      // When our access token will expire
      var tokenExpirationEpoch;

      // Continually print out the time left until the token expires..
      var numberOfTimesUpdated = 0;

      setInterval(function() {
          console.log(
              'Time left: ' +
              Math.floor(tokenExpirationEpoch - new Date().getTime() / 1000) +
              ' seconds left!'
          );

          // OK, we need to refresh the token. Stop printing and refresh.
          if (++numberOfTimesUpdated > 5) {
              clearInterval(this);

              // Refresh token and print the new time to expiration.
              spotifyApi.refreshAccessToken().then(
                  function(data) {
                      tokenExpirationEpoch =
                      new Date().getTime() / 1000 + data.body['expires_in'];
                      console.log(
                      'Refreshed token. It now expires in ' +
                          Math.floor(tokenExpirationEpoch - new Date().getTime() / 1000) +
                          ' seconds!'
                      );
                  },
                  function(err) {
                      console.log('Could not refresh the token!', err.message);
                  }
              );
          }
      }, 1000);
  }).catch((err) => {
      console.error(err);
  });
}

/*
* If there are tracks in queue, play the next track and return spotify api response
* Otherwise, return 400 response "No tracks in queue"
*/
function playNextTrack() {
    if (!serverData.hasNext()) {
    } else if (!serverData.deviceId) {
    } else {
        const queueUris = serverData.queue.map((obj) => {
            return obj.track.uri;
        });
        serverData.next();
        spotifyApi.play({
            'uris': queueUris, // use spotify queue functionality to play next track on track end
            'device_id': serverData.deviceId,
            "position_ms": 0
        })
        .catch((err) => {
            console.error(err);
            return;
        });
    }
}

function resume() {
    if (!serverData.deviceId) {
    } else {
        spotifyApi.play({
            'device_id': serverData.deviceId
        })
        .catch((err) => {
            console.error(err);
        });
    }
}

function pause() {
    if (!serverData.deviceId) {
    } else {
        spotifyApi.pause({
            'device_id': serverData.deviceId
        })
        .catch((err) => {
            console.error(err);
        });
    }
}

async function getDevices(res) {
    await spotifyApi.getMyDevices()
    .then((data) => {
        res.status(200).send(data.body.devices);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error getting devices");
    });
}

/* SOCKET IO Functions */
function handleResume(io, socket) {
    if (!serverData.isPlaying) {
        resume();
        serverData.setIsPlaying(true);
        spotifyApi.getMyCurrentPlaybackState().then((currentlyPlaying) => {
            // set track timeout
            const timeRemaining = currentlyPlaying.body.item.duration_ms - currentlyPlaying.body.progress_ms;
            setTrackTimeout(timeRemaining, io);
        });
        io.emit('resume');
        console.log('RESUME (' + socket.userName + ') successful');
    } else {
        console.log('RESUME (' + socket.userName + ') failed');
    }
}

function handlePause(io, socket) {
    if (serverData.isPlaying) {
        pause();
        clearTimeout(trackTimeout);
        serverData.setIsPlaying(false);
        io.emit('pause');
        console.log('PAUSE (' + socket.userName + ') successful');
    } else {
        console.log('PAUSE (' + socket.userName + ') failed');
    }
}

function handleNext(io, socket) {
    if (serverData.hasNext()) {
        playNextTrack();
        serverData.setIsPlaying(true);
        setTrackTimeout(serverData.lastPlayed.duration_ms, io);
        io.emit('next', {
            queue: serverData.queue.slice(),
            currentPlayback: serverData.lastPlayed,
        });
        console.log('NEXT (' + socket.userName + ') successful');
    } else {
        console.log('NEXT (' + socket.userName + ') failed');
    }
}

function handleAddToQueue(io, socket, obj) {
    serverData.addToQueue(obj)
    .then(() => {
        io.emit('add to queue', serverData.queue);
        
        console.log('ADD TO QUEUE (' + socket.userName + ') successful: ');
        console.log('    User: ' + obj.user);
        console.log('    Type: ' + obj.spotifyObject.type);
        console.log('    Name: ' + obj.spotifyObject.name);
        if (obj.spotifyObject.type === 'track' || obj.spotifyObject.type === 'album') {
        const artists = obj.spotifyObject.artists.map((artist) => artist.name);
        console.log('    Artist(s): ' + artists);
        } else {
        console.log('    Owner: ' + obj.spotifyObject.owner.display_name);
        }
    });
}

function handleRemoveFromQueue(io, socket, index) {
    const removed = serverData.removeFromQueue(index);
    if (removed.length > 0) {
        io.emit('remove from queue', serverData.queue);
        console.log('REMOVE FROM QUEUE (' + socket.userName + ') successful: ');
        console.log('    User: ' + removed[0].user);
        console.log('    Name: ' + removed[0].track.name);
        const artists = removed[0].track.artists.map((artist) => artist.name);
        console.log('    Artist(s): ' + artists);
    }
}

function handleDeviceChange(socket, deviceId) {
    serverData.deviceId = deviceId;
    socket.broadcast.emit('device change', deviceId);
    console.log('DEVICE CHANGE (' + socket.userName + ') successful: ' + deviceId);
}

function handleNewUser(socket, user) {
    socket.userName = user;
    serverData.addUser(user);
    socket.broadcast.emit('new user', user);

    // initialize data
    socket.emit('init device', serverData.deviceId);
    socket.emit('init queue', serverData.queue);
    socket.emit('init current status', serverData.isPlaying);
    socket.emit('init current playback', serverData.lastPlayed);
    socket.emit('init users', serverData.users);

    console.log('NEW USER (' + user + ') successful: ' + serverData.users);
}

function handleDisconnect(socket) {
    if (socket.userName) {
        serverData.removeUser(socket.userName);
        socket.broadcast.emit('remove user', socket.userName);
        console.log('REMOVE USER (' + socket.userName + ') successful: ' + serverData.users);
    } else {
        console.log('REMOVE USER (' + socket.userName + ') failed');
    }
}

module.exports = {
    api: {
        callback: (req, res) => callback(req, res),
        playNextTrack: () => playNextTrack(),
        resume: () => resume(),
        pause: () => pause(),
        getDevices: (res) => getDevices(res),
    },
    socket: {
        handleResume: (io, socket) => handleResume(io, socket),
        handlePause: (io, socket) => handlePause(io, socket),
        handleNext: (io, socket) => handleNext(io, socket),
        handleAddToQueue: (io, socket, obj) => handleAddToQueue(io, socket, obj),
        handleRemoveFromQueue: (io, socket, index) => handleRemoveFromQueue(io, socket, index),
        handleDeviceChange: (socket, deviceId) => handleDeviceChange(socket, deviceId),
        handleNewUser: (socket, user) => handleNewUser(socket, user),
        handleDisconnect: (socket) => handleDisconnect(socket),
    }
}

/**************************************************
 * HELPER METHODS                                 *
 **************************************************/

function getCurrentTrack() {
    spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        return data.body.item;
    })
}

/* 
 * Reset trackTimeout to given time (in ms)
 * trackTimeout removes next song from queue on timeout
 */
function setTrackTimeout(timeRemaining, io) {
    clearTimeout(trackTimeout);
    trackTimeout = setTimeout(() => {
        // const next = serverData.next();
        // serverData.setIsPlaying(true);
        // setTrackTimeout(next.duration_ms, io);
        playNextTrack();
        io.emit('next', {
            queue: serverData.queue.slice(),
            currentPlayback: serverData.lastPlayed,
        });
        console.log("NEXT TRACK");
    }, timeRemaining);
    console.log('SET TIMEOUT: ' + timeRemaining);
}