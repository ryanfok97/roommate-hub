var serverData = require('../server-data/data');

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
    .then((data) => {
        console.log('Search by "' + req.query.track + '"',);
        res.json(data.body);
    })
    .catch((err) => {
        console.error(err);
    });
}

module.exports.getAlbumTracks = async (album) => {
    const tracks = await spotifyApi.getAlbumTracks(album)
    .catch((err) => {
        console.err(err);
    });
    return tracks;
}

module.exports.getPlaylistTracks = async (playlist) => {
    const tracks = await spotifyApi.getPlaylistTracks(playlist)
    .catch((err) => {
        console.err(err);
    });
    return tracks;
}

module.exports.search = (req, res) => {
    search(req, res);
}