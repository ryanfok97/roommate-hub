const google = require('googleapis').google,
  calendar = google.calendar("v3");

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const KEYS = './credentials/calendar-api-credentials.json';
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

var moment = require('moment');

const listEvents = async () => {    
  var response = [];

  for (let cid of CALENDARS) {
    let currResponse = await requestEvents(cid);
    response.push({
      email: currResponse.data.summary,
      events: currResponse.data.items
    });
  }   

  return response;
}

const requestEvents = async (cid) => {
  const TODAY = moment().startOf('day');
  return await calendar.events.list({
    auth: client,
    timeMin: TODAY.clone().subtract(7, 'days').toISOString(),
    timeMax: TODAY.clone().add(7, 'days').toISOString(),
    calendarId: cid,
    showDeleted: false,
    singleEvents: true
  });
}

module.exports = {
  listEvents
}