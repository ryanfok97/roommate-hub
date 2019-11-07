const credentials = require('../credentials/spotify-api-credentials.json');
console.log(credentials);

var SpotifyWebApi = require('spotify-web-api-node');

// Create the api object with the credentials
var spotifyApi = new SpotifyWebApi(credentials);

// Authorize api object on start
authorize();

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
    //spotifyApi.searchTracks(req.query.track, { market: 'US' })
    spotifyApi.search(req.query.query, ['album', 'artist', 'playlist', 'track'], { market: 'US' })
    .then(function(data) {
        console.log('Search by "' + req.query.track + '"', data.body);
        res.json(data.body);
    }, function(err) {
        console.error(err);
    });
}

exports.search = (req, res) => {
    search(req, res);
}