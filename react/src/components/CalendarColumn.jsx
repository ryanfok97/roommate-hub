import React, { Component } from 'react';
import { Card, Typography } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import _ from 'lodash';

var moment = require('moment');

const theme = createMuiTheme({
  overrides: {
    MuiCard: {
      root: {
        '&.event': {
          backgroundColor: '#0fa3b1', // 2.5 vh per 30 minutes
          position: 'relative',
          overflow: 'hidden'
        },
      }
    },
    MuiTypography: {
      root: {

      }
    }
  }
});

var moment = require('moment');

class CalendarColumn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div style={{ position: 'relative' }}>
          {_.map(this.props.events, (event) => {
            let start = moment(event.start.dateTime);
            let end = moment(event.end.dateTime);
            console.log(end.diff(start, 'minutes'));
            return (
              <Card 
                className='event' 
                style={{ 
                  position: 'absolute', 
                  height: (end.diff(start, 'minutes') / 30) * 2.5 + 'vh', 
                  width: '90%', 
                  top: ((start.hours() - 7) * 5) + (start.minutes() === 30 ? 2.5 : 0) + 'vh', 
                  left: '5%' 
                }}
              >
                <Typography>
                  {event.summary}
                </Typography>
                <Typography>
                  {moment(event.start.dateTime).format('hh:mm')} - {moment(event.end.dateTime).format('hh:mm')}
                </Typography>
              </Card>
            );
          })}
        </div>
      </ThemeProvider>
    );
  }
}

export default CalendarColumn;