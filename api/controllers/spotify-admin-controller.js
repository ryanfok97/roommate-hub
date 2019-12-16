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
        const next = serverData.next();
        spotifyApi.play({
            'uris': queueUris, // use spotify queue functionality to play next track on track end
            'device_id': serverData.deviceId,
            "position_ms": 0
        })
        // .then(setTrackTimeout(next.duration_ms))
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
        // .then(spotifyApi.getMyCurrentPlaybackState().then((currentlyPlaying) => {
        //     // set track timeout
        //     const timeRemaining = currentlyPlaying.body.item.duration_ms - currentlyPlaying.body.progress_ms;
        //     setTrackTimeout(timeRemaining);
        // }))
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
        // stop track timeout
        .then(clearTimeout(trackTimeout))
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
    })
}

module.exports.callback = (req, res) => {
    callback(req, res);
}

module.exports.playNextTrack = () => {
    playNextTrack();
}

module.exports.resume = () => {
    resume();
}

module.exports.pause = () => {
    pause();
}

module.exports.getDevices = (res) => {
    getDevices(res);
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
 * trackTimeout calls playNextTrack() on timeout
 */
function setTrackTimeout(timeRemaining) {
    console.log('SET TIMEOUT: ' + timeRemaining);
    clearTimeout(trackTimeout);
    trackTimeout = setTimeout(() => {
        console.log('hi');
        playNextTrack();
    }, timeRemaining);
}