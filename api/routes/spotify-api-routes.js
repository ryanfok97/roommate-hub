var express = require('express');
var router = express.Router();
var spotifyController = require('../controllers/spotify-api-controller');
var spotifyAdminController = require('../controllers/spotify-admin-controller');

// /spotify/search?query=
router.get('/search', (req, res) => {
    spotifyController.search(req, res);
});

router.put('/resume', (req, res) => {
    spotifyAdminController.resume(res);
});

router.put('/pause', (req, res) => {
    spotifyAdminController.pause(res);
});

router.put('/next', (req, res) => {
    spotifyAdminController.playNextTrack(res);
});

router.get('/devices', (req, res) => {
    spotifyAdminController.getDevices(res);
})

module.exports = router;