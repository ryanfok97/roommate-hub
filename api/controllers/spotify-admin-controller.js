var serverData = require('../server-data/data');
var SpotifyWebApi = require('spotify-web-api-node');

var trackTimeout;

var credentials = require('../credentials/spotify-api-credentials.json')

var spotifyApi = new SpotifyWebApi(credentials);

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
            return obj.spotifyObject.uri;
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
const handleResume = (user) => {
    if (!serverData.isPlaying) {
        resume();
        serverData.setIsPlaying(true);
        spotifyApi.getMyCurrentPlaybackState().then((currentlyPlaying) => {
            // set track timeout
            const timeRemaining = currentlyPlaying.body.item.duration_ms - currentlyPlaying.body.progress_ms;
            setTrackTimeout(timeRemaining, io);
        })
        .catch((err) => {
            console.error(err);
        });
        console.log('RESUME (' + user + ') successful');
    } else {
        console.log('RESUME (' + user + ') failed');
    }
}

const handlePause = (user) => {
    if (serverData.isPlaying) {
        pause();
        clearTimeout(trackTimeout);
        serverData.setIsPlaying(false);
        console.log('PAUSE (' + user + ') successful');
    } else {
        console.log('PAUSE (' + user + ') failed');
    }
}

const handleNext = (user, io) => {
    if (serverData.hasNext()) {
        playNextTrack();
        setTrackTimeout(serverData.lastPlayed.duration_ms, io);
        serverData.setIsPlaying(true);
        console.log('NEXT (' + user + ') successful');
    } else {
        console.log('NEXT (' + user + ') failed');
    }
}

const handleAddToQueue = (obj) => {
    serverData.addToQueue(obj);
    console.log('ADD TO QUEUE (' + obj.user + ') successful: ');
    console.log('    User: ' + obj.user);
    console.log('    Type: ' + obj.spotifyObject.type);
    console.log('    Name: ' + obj.spotifyObject.name);
    if (obj.spotifyObject.type === 'track' || obj.spotifyObject.type === 'album') {
        const artists = obj.spotifyObject.artists.map((artist) => artist.name);
        console.log('    Artist(s): ' + artists);
    } else {
        console.log('    Owner: ' + obj.spotifyObject.owner.display_name);
    }
}

const handleRemoveFromQueue = (user, index) => {
    const removed = serverData.removeFromQueue(index);
    if (removed.length > 0) {
        console.log('REMOVE FROM QUEUE (' + user + ') successful: ');
        console.log('    User: ' + removed[0].user);
        console.log('    Name: ' + removed[0].spotifyObject.name);
        const artists = removed[0].spotifyObject.artists.map((artist) => artist.name);
        console.log('    Artist(s): ' + artists);
    }
}

const handleDeviceChange = (user, deviceId) => {
    serverData.deviceId = deviceId;
    console.log('DEVICE CHANGE (' + user + ') successful: ' + deviceId);
}

const handleNewUser = (socket) => {
    serverData.addUser(socket.userName);

    // initialize data for user
    socket.emit('spotify init device', serverData.deviceId);
    socket.emit('spotify init queue', serverData.queue);
    socket.emit('spotify init current status', serverData.isPlaying);
    socket.emit('spotify init current playback', serverData.lastPlayed);
    socket.emit('spotify init users', serverData.users);

    console.log('NEW USER (' + socket.userName + ') successful: ' + serverData.users);
}

const handleDisconnect = (user) => {
    serverData.removeUser(user);
    console.log('REMOVE USER (' + user + '): ' + serverData.users);
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
        handleResume: (user) => handleResume(user),
        handlePause: (user) => handlePause(user),
        handleNext: (user, io) => handleNext(user, io),
        handleAddToQueue: (obj) => handleAddToQueue(obj),
        handleRemoveFromQueue: (user, index) => handleRemoveFromQueue(user, index),
        handleDeviceChange: (user, deviceId) => handleDeviceChange(user, deviceId),
        handleNewUser: (socket) => handleNewUser(socket),
        handleDisconnect: (user) => handleDisconnect(user),
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