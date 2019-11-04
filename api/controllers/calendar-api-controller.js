'use strict';

const path = require('path'),
    google = require('googleapis').google,
    calendar = google.calendar("v3"),
    googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
// Then run again `node build_token.js`
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const KEYS = '../api/bin/credentials/roommate-hub-09b3443d0496.json';

const client = new google.auth.JWT(
    KEYS.client_email,
    KEYS,
    KEYS.private_key,
    SCOPES,
    null,
    null,
);

async function listEvents(res) {
    const TODAY = new Date((new Date()).setHours(0, 0, 0, 0));
    var response = await calendar.events.list({
        auth: client,
        calendarId: 'fokb@uw.edu',
        timeMin: TODAY.toISOString(),
        timeMax: (new Date(TODAY.setHours(24, 0, 0, 0)).toISOString()),
    });

    res.json(response.data.items.map((event) => {
        return {
            eventId: event.id,
            eventCreator: event.creator,
            eventName: event.summary,
            eventStart: event.start,
            eventEnd: event.end
        };
    }));
}

exports.listEvents = (res) => {
    listEvents(res);
};