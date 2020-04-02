import React, { Component } from 'react';
import { ThemeProvider, Typography, Grid, Container, Card, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import NavBar from '../components/NavBar';
import CalendarIcon from '@material-ui/icons/DateRange';
import BackIcon from '@material-ui/icons/NavigateBefore';
import ForwardIcon from '@material-ui/icons/NavigateNext';
import _ from 'lodash';

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
        '&#dateContainer': {
          height: 'fit-content',
          textAlign: 'center'
        },
        '&#dateAndArrowsContainer': {
          height: 'fit-content'
        },
        '&#calendarContainer': {
          alignContent: 'baseline'
        },
        '&#selectCalendarContainer': {
          alignContent: 'baseline'
        }
      },
      item: {
        '&.arrow': {
          alignSelf: 'center'
        },
        '&#backArrow': {
          textAlign: 'end'
        },
        '&.hour': {
          height: '5vh'
        }
      }
    },
    MuiListItemIcon: {
      root: {
        minWidth: 'auto'
      }
    },
    MuiCard: {
      root: {
        '&.calendarColumn': {
          width: '100%'
        },
        '&.event': {
          backgroundColor: '#0fa3b1', // 2.5 vh per 30 minutes
          position: 'relative',
        }
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
        'alfred',
        'ryan',
        'toni',
        'brandon',
        'sara',
        'kadison'
      ],
      selectedCalendar: 0
    };

    this.onCalendarSelect = this.onCalendarSelect.bind(this);
  }

  onCalendarSelect(e, i) {
    this.setState({
      selectedCalendar: i
    });
  }

  generateCalendarSelectButton(text, i) {
    return (
      <ListItem
        button
        selected={this.state.selectedCalendar === i}
        onClick={(e) => this.onCalendarSelect(e, i)}
      >
        <ListItemText primary={text} />
        <ListItemIcon>
          <CalendarIcon />
        </ListItemIcon>
      </ListItem>
    );
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

  generateCalendarColumn() {
    return (
      <Grid container item xs>
        <Card className='calendarColumn'>
          <div style={{ position: 'relative' }}>
            <Card className='event' style={{ position: 'absolute', height: '5vh', width: '90%', top: '5vh', left: '5%' }}>
              <Typography>
                EVENT
              </Typography>
            </Card>
          </div>
        </Card>
      </Grid>
    )
  }

  generateCalendarHours(hour) {
    return (
      <Grid item xs={12} className='hour'>
        <Typography>
          {hour % 12 + 1}:00
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
              <Grid container item xs={2} id='selectCalendarContainer'>
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
                      {_.map(this.state.roommates, (name, i) => this.generateCalendarSelectButton(name, i + 1))}
                    </List>
                  </Card>
                </Grid>
              </Grid>
              <Grid container item xs={10} spacing={0} id='calendarContainer'>
                <Grid container item xs={12} id='dateAndArrowsContainer'>
                  <Grid item xs={2} className='arrow' id='backArrow'>
                    <BackIcon fontSize='large' />
                  </Grid>
                  <Grid container item xs={8} id='dateContainer'>
                    <Grid item xs={12}>
                      <Typography variant='h5' color='primary'>
                        WEEKDAY
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='h3' gutterBottom>
                        month day, year
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={2} className='arrow' >
                    <ForwardIcon fontSize='large' />
                  </Grid>
                </Grid>
                <Grid container item xs={12} spacing={0}>
                  <Grid container item xs={12} spacing={1}>
                    <Grid item xs={1} />
                    {_.map(this.state.roommates, (name) => this.generateCalendarColumnHeader(name))}
                  </Grid>
                  <Grid container item xs={1}>
                    {_.map(_.range(7, 22, 1), (hour) => this.generateCalendarHours(hour))}
                  </Grid>
                  <Grid container item xs={11} spacing={1}>
                    {_.map(this.state.roommates, () => this.generateCalendarColumn())}
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