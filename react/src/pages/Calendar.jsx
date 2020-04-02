import React, { Component } from 'react';
import { ThemeProvider, Typography, Grid, Container, Card, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import NavBar from '../components/NavBar';
import _ from 'lodash';
import SelectCalendar from '../components/SelectCalendar';
import CalendarHours from '../components/CalendarHours';
import CalendarColumns from '../components/CalendarColumns';
import CalendarHeader from '../components/CalendarHeader';

const calendarClient = require('../calendarClient');
var moment = require('moment');

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0fa3b1'
    }
  },
  overrides: {
    MuiGrid: {
      container: {
        maxWidth: 'lg',
        '&#calendarHeaderContainer': {
          height: 'fit-content'
        },
        '&#calendarContainer': {
          alignContent: 'baseline'
        },
      }
    },
    MuiListItemIcon: {
      root: {
        minWidth: 'auto'
      }
    },
    MuiCard: {
      root: {
        background: '#ffffff'
      }
    },
    MuiTypography: {
      root: {
      }
    }
  }
});

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roommates: [
        {
          name: 'brandon',
          email: 'fokb@uw.edu'
        },
        {
          name: 'kadison',
          email: 'ktsh99@uw.edu'
        }
      ],
      selectedCalendar: 0,
      date: moment()
    };

    this.onCalendarSelect = this.onCalendarSelect.bind(this);
    this.onBackClick = this.onBackClick.bind(this);
    this.onForwardClick = this.onForwardClick.bind(this);
  }

  componentDidMount() {
    calendarClient.listEvents((res) => {
      this.setState({
        roommates: _.merge(this.state.roommates, res)
      });
      console.log(this.state.roommates);
    });
  }

  onCalendarSelect(i) {
    this.setState({
      selectedCalendar: i
    });
  }

  onBackClick() {
    this.setState({
      date: this.state.date.subtract(1, 'days')
    });
  }

  onForwardClick() {
    this.setState({
      date: this.state.date.add(1, 'days')
    });
  }

  generateCalendarColumnHeader(name) {
    return (
      <Grid item xs>
        <Typography variant='h5'>
          {name}
        </Typography>
      </Grid>
    );
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <NavBar page={1}></NavBar>
          <Container style={{ marginTop: 92 }} maxWidth='lg'>
            <Grid container spacing={4}>
              <SelectCalendar roommates={this.state.roommates} onCalendarSelect={this.onCalendarSelect} />
              <Grid container item xs={10} spacing={0} id='calendarContainer'>
                <Grid container item xs={12} id='calendarHeaderContainer'>
                  <CalendarHeader date={this.state.date} onBackClick={this.onBackClick} onForwardClick={this.onForwardClick} />
                </Grid>
                <Grid container item xs={12} spacing={0}>
                  <Grid container item xs={12} spacing={1}>
                    <Grid item xs={1} />
                    {this.state.selectedCalendar === 0 ? 
                      _.map(this.state.roommates, (roommate) => this.generateCalendarColumnHeader(roommate.name))
                      : this.generateCalendarColumnHeader(this.state.roommates[this.state.selectedCalendar - 1].name)}
                  </Grid>
                  <Grid container item xs={1}>
                    <CalendarHours />
                  </Grid>
                  <Grid container item xs={11}>
                    <CalendarColumns date={this.state.date} roommates={this.state.roommates} selectedCalendar={this.state.selectedCalendar} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </div>
      </ThemeProvider>
    );
  }
}

export default Calendar;