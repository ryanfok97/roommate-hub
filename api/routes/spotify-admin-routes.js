var express = require('express');
var router = express.Router();
var spotifyAdminController = require('../controllers/spotify-admin-controller');

router.get('/login', (req, res) => {
    res.redirect('https://accounts.spotify.com/authorize?client_id=365de91bc43d485cbd5b268b96c6be2e&response_type=code&redirect_uri=http://localhost:3002/spotify/callback&scope=user-modify-playback-state%20user-read-playback-state&state=some-state-of-my-choice');
});

router.get('/callback', (req, res) => {
    spotifyAdminController.callback(req, res);
});

// router.post('/scrub', (req, res) => {
//     spotifyApi.seek
// });

module.exports = router;