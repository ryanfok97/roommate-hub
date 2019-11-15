var Data = require('../server-data/data');

const credentials = require('../credentials/spotify-api-credentials.json');

var SpotifyWebApi = require('spotify-web-api-node');

// Create the api object with the credentials
var spotifyApi = new SpotifyWebApi(credentials);

// Authorize api object on start (get access token)
authorize();
tokenRefreshInterval = setInterval(authorize, 1000 * 60 * 60); // refresh every hour

function authorize() {
    // Retrieve an access token.
    spotifyApi.clientCredentialsGrant().then(
        function(data) {
            console.log('The access token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);

            // Save the access token so that it's used in future calls
            spotifyApi.setAccessToken(data.body['access_token']);
        },
        function(err) {
            console.log('Something went wrong when retrieving an access token', err);
        }
    );
};

function search(req, res) {
    if (!req.query.query) {
        console.error("Query must be non-empty.");
        res.status(400).send("Query must be non-empty.");
    }
    //spotifyApi.searchTracks(req.query.track, { market: 'US' })
    spotifyApi.search(req.query.query, ['track', 'album', 'playlist'], { market: 'US' })
    .then(function(data) {
        console.log('Search by "' + req.query.track + '"', data.body);
        res.json(data.body);
    }, function(err) {
        console.error(err);
    });
}

function getQueue(req, res) {
    res.status(200).json(Data.queue);
}

function addTrackToQueue(req, res) {
    Data.addTrack(req.query.uris);
    res.status(200).send("Current queue: " + Data.queue);
}

module.exports.getQueue = (req, res) => {
    getQueue(req, res);
}

module.exports.search = (req, res) => {
    search(req, res);
}

module.exports.addTrackToQueue = (req, res) => {
    addTrackToQueue(req, res);
}