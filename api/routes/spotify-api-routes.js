var express = require('express');
var router = express.Router();
var spotifyController = require('../controllers/spotify-api-controller');

// /spotify/search?query=
router.get('/search', (req, res) => {
    spotifyController.search(req, res);
});

module.exports = router;