var express = require('express');
var router = express.Router();
var calendarController = require('../controllers/calendar-api-controller');

router.get('/events', (req, res) => {
    calendarController.listEvents(res);
});

module.exports = router;