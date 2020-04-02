import React, { Component } from 'react';
import { ThemeProvider, Grid, Card } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import _ from 'lodash';
import CalendarColumn from './CalendarColumn';

var moment = require('moment');

const theme = createMuiTheme({
  overrides: {
    MuiCard: {
      root: {
        '&.calendarColumn': {
          width: '100%'
        }
      }
    }
  }
});

class CalendarColumns extends Component {
  generateCalendarColumn(i) {
    return (
      <Grid container item xs key={i}>
        <Card className='calendarColumn'>
          <CalendarColumn events={_.filter(this.props.roommates[i].events, (event) => {
            if (!event.start.dateTime || !event.end.dateTime) {
              return false;
            } else {
              let min = this.props.date.clone().hour(8).startOf('hour');
              let max = this.props.date.clone().hour(22).startOf('hour');

              let start = moment(event.start.dateTime);
              let end = moment(event.end.dateTime);

              return start.isBetween(min, max) || end.isBetween(min, max);
            }
          })} />
        </Card>
      </Grid>
    )
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        {this.props.selectedCalendar === 0 ? 
          _.map(this.props.roommates, (roommate, i) => this.generateCalendarColumn(i))
          : this.generateCalendarColumn(this.props.selectedCalendar - 1)}
      </ThemeProvider>
    );
  }
}

export default CalendarColumns;

