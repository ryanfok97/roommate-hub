import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';
import _ from 'lodash';

class CalendarColumnHeaders extends Component {
  generateCalendarColumnHeader(name, i) {
    return (
      <Grid item xs key={i}>
        <Typography variant='h5'>
          {name}
        </Typography>
      </Grid>
    );
  }

  render() {
    let columnHeaders = this.props.selectedCalendar === 0 ? 
      _.map(this.props.roommates, (roommate, i) => this.generateCalendarColumnHeader(roommate.name, i))
      : this.generateCalendarColumnHeader(this.props.roommates[this.props.selectedCalendar - 1].name);

    return columnHeaders;
  }
}

export default CalendarColumnHeaders;