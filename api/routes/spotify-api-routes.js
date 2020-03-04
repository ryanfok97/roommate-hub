var express = require('express');
var router = express.Router();
var spotifyController = require('../controllers/spotify-api-controller');
var spotifyAdminController = require('../controllers/spotify-admin-controller');

// /spotify/search?query=
router.get('/search', (req, res) => {
    spotifyController.search(req, res);
});

router.get('/devices', (req, res) => {
    spotifyAdminController.api.getDevices(res);
})

module.exports = router;