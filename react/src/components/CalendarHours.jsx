import React, { Component } from 'react';
import { ThemeProvider, Grid, Typography } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import _ from 'lodash';

const theme = createMuiTheme({
  overrides: {
    MuiGrid: {
      item: {
        height: '5vh'
      }
    }
  }
});

class CalendarHours extends Component {
  generateCalendarHours(hour) {
    return (
      <Grid item xs={12}>
        <Typography>
          {hour % 12 + 1}:00
        </Typography>
      </Grid>
    );
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Grid item xs={12} id='allDay'>
          <Typography>
            ALL DAY
          </Typography>
        </Grid>
        {_.map(_.range(7, 22, 1), (hour) => this.generateCalendarHours(hour))}
      </ThemeProvider>
    );
  }
}

export default CalendarHours;