'use strict';

const google = require('googleapis').google,
      calendar = google.calendar("v3");

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const KEYS = './credentials/google-api-credentials.json';
const CALENDARS = [
    'fokb@uw.edu',
    'ktsh99@uw.edu'
];

const client = new google.auth.JWT(
    KEYS.client_email,
    KEYS,
    KEYS.private_key,
    SCOPES,
    null,
    null,
);

async function listEvents(res) {    
    var response = [];

    for (let cid of CALENDARS) {
        let currResponse = await requestEvents(cid);
        response.push({
            creator: currResponse.data.summary,
            events: currResponse.data.items
        });
    }

    res.json(response);
}

async function requestEvents(cid) {
    const TODAY = new Date((new Date()).setHours(0, 0, 0, 0));
    return await calendar.events.list({
        auth: client,
        timeMin: TODAY.toISOString(),
        timeMax: (new Date(TODAY.setDate(TODAY.getDate() + 1))).toISOString(),
        calendarId: cid,
        showDeleted: false,
        singleEvents: true
    });
}

exports.listEvents = (res) => {
    listEvents(res);
};