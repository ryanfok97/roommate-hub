const express = require('express')
var cors = require('cors')
const app = express()
const port = 3001

var whitelist = ['http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const calendarApi = require('./calendarApi')

app.get('/', cors(corsOptions), (req, res) => calendarApi.listEvents().then((results) => res.send(results)))

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))