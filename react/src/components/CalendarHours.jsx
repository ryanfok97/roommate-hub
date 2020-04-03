import React, { Component } from 'react';
import { ThemeProvider, Grid, Typography } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import _ from 'lodash';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0fa3b1'
    }
  },
  overrides: {
    MuiGrid: {
      item: {
        height: '5vh'
      }
    },
    MuiTypography: {
      root: {
        textAlign: 'right'
      }
    }
  }
});

class CalendarHours extends Component {
  generateCalendarHours(hour, i) {
    return (
      <Grid item xs={12} key={i}>
        <Typography color='primary'>
          {hour % 12 + 1}:00
        </Typography>
      </Grid>
    );
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Grid item xs={12} id='allDay'>
          <Typography color='primary'>
            ALL DAY
          </Typography>
        </Grid>
        {_.map(_.range(7, 22, 1), (hour, i) => this.generateCalendarHours(hour, i))}
      </ThemeProvider>
    );
  }
}

export default CalendarHours;