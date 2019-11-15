var Data = require('../server-data/data');
var SpotifyWebApi = require('spotify-web-api-node');

var trackTimeout;

var credentials = {
    clientId: '365de91bc43d485cbd5b268b96c6be2e', 
    clientSecret: '96f07e8d7313410ea4a5bda15247880d', 
    redirectUri:'http://localhost:3002/spotify/callback' 
}

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
async function playNextTrack(req, res) {
    console.log(Data.queue);
    if (Data.queue.length > 0) {
        await spotifyApi.play({
            'uris': [Data.next()],
            'device_id': '6ba22e6e31de058aa6014842317225574a3a8539',
            "position_ms": 0
        }).catch((err) => {
            console.error(err);
            res.status(500).send("Error playing next track");
        });
  
        // set trackTimeout
        const currentlyPlaying = await spotifyApi.getMyCurrentPlaybackState().catch((err) => {
            console.error(err);
            res.status(500).send("Error getting current track after play");
        });
        console.log(currentlyPlaying);
        setTrackTimeout(res, currentlyPlaying.body.item.duration_ms);
        res.status(200).send('Playing: ' + currentlyPlaying.body.item.name);
    } else {
        res.status(400).send("No tracks in queue");
    }
}

async function resume(res) {
    await spotifyApi.play({
        'device_id': '6ba22e6e31de058aa6014842317225574a3a8539'
    }).catch((err) => {
        console.error(err);
        res.status(500).send("Error resuming track");
    });

    // set trackTimeout
    const currentlyPlaying = await spotifyApi.getMyCurrentPlaybackState().catch((err) => {
        console.error(err);
        res.status(500).send("Error getting current track after play");
    });

    console.log(currentlyPlaying.body.item);
    setTrackTimeout(res, currentlyPlaying.body.item.duration_ms - currentlyPlaying.body.progress_ms);
    res.status(200).send('Resumed: ' + currentlyPlaying.body.item.name);
}

async function pause(res) {
    await spotifyApi.pause({
        'device_id': '6ba22e6e31de058aa6014842317225574a3a8539'
    }).catch((err) => {
        console.error(err);
        res.status(500).send("Error pausing track");
    });

    // stop trackTimeout, will start again on resume
    clearTimeout(trackTimeout);
    res.status(200).send("Paused track");
}

module.exports.callback = (req, res) => {
    callback(req, res);
}

module.exports.playNextTrack = (req, res) => {
    playNextTrack(req, res);
}

module.exports.resume = (res) => {
    resume(res);
}

module.exports.pause = (res) => {
    pause(res);
}

/**************************************************
 * HELPER METHODS                                 *
 **************************************************/

/*
 * Return true if a track is currently playing, else return false
 */
async function isCurrentlyPlaying(res) {
  const currentlyPlaying = await spotifyApi.getMyCurrentPlaybackState().catch((err) => {
      console.log(err);
      res.status(500).send("Error getting currently playing track");
  });
  return currentlyPlaying.body.is_playing
}

/* 
 * Reset trackTimeout to given time (in ms)
 * trackTimeout calls playNextTrack() on timeout
 */
function setTrackTimeout(res, timeRemaining) {
  clearTimeout(trackTimeout);
  trackTimeout = setTimeout((res) => {
      playNextTrack(res);
  }, timeRemaining);
}