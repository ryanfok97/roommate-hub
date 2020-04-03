import React, { Component } from 'react';
import { Card, Typography } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiCard: {
      root: {
        backgroundColor: '#0fa3b1', // 1.25 vh per 15 minutes
        position: 'relative',
        overflow: 'hidden'
      },
    },
    MuiTypography: {
      root: {
        paddingLeft: 16,
        paddingRight: 16,
        '&.eventSummary': {
          paddingTop: 16,
        }
      }
    }
  }
});

var moment = require('moment');

class CalendarEvent extends Component {
  
  render() {
    let start = moment(this.props.event.start.dateTime);
    let end = moment(this.props.event.end.dateTime);

    return (
      <ThemeProvider theme={theme}>
        <Card 
          style={{ 
            position: 'absolute', 
            height: (end.diff(start, 'minutes') / 15) * 1.25 + 'vh', // accurate to every 15 mins
            width: '90%', 
            top: ((start.hours() - 7) * 5) + (start.minutes() === 30 ? 2.5 : 0) + 'vh', 
            left: '5%' 
          }}
        >
          <Typography className='eventSummary'>
            {this.props.event.summary}
          </Typography>
          <Typography>
            {moment(this.props.event.start.dateTime).format('hh:mm')} - {moment(this.props.event.end.dateTime).format('hh:mm')}
          </Typography>
        </Card>
      </ThemeProvider>
    );
  }
}

export default CalendarEvent;