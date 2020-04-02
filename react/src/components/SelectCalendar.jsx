import React, { Component } from 'react';
import { ThemeProvider, Grid, Typography, Card, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import _ from 'lodash';
import CalendarIcon from '@material-ui/icons/DateRange';

const theme = createMuiTheme({
  overrides: {
    MuiGrid: {
      container: {
        alignContent: 'baseline'
      }
    }
  }

})

class SelectCalendar extends Component {
  generateCalendarSelectButton(text, i) {
    return (
      <ListItem
        button
        selected={this.props.selectedCalendar === i}
        onClick={() => this.props.onCalendarSelect(i)}
        key={i}
      >
        <ListItemText primary={text} />
        <ListItemIcon>
          <CalendarIcon />
        </ListItemIcon>
      </ListItem>
    );
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Grid container item xs={2}>
          <Grid item xs={12}>
            <Typography variant='h4'>
            calendar
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
            select calendar
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Card>
            <List component="nav">
              {this.generateCalendarSelectButton('all calendars', 0)}
              {_.map(this.props.roommates, (roommate, i) => this.generateCalendarSelectButton(roommate.name, i + 1))}
            </List>
            </Card>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
}

export default SelectCalendar;