var express = require('express');
var router = express.Router();
var spotifyController = require('../controllers/spotify-api-controller');

// /spotify/search?query=
router.get('/search', (req, res) => {
    spotifyController.search(req, res);
});

router.get('/queue', (req, res) => {
    spotifyController.getQueue(req, res);
})

router.post('/queue/add', (req, res) => {
    spotifyController.addTrackToQueue(req, res);
})

module.exports = router;