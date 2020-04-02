import React, { Component } from 'react';
import { ThemeProvider, Grid, Typography, Button } from "@material-ui/core";
import { createMuiTheme } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/NavigateBefore';
import ForwardIcon from '@material-ui/icons/NavigateNext';

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
        '&#dateContainer': {
          height: 'fit-content',
          textAlign: 'center'
        },
      },
      item: {
        '&.arrow': {
          alignSelf: 'center'
        },
        '&#backArrow': {
          textAlign: 'end'
        }
      }
    }
  }
});

class CalendarHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ThemeProvider theme={theme} >
        <Grid item xs={2} className='arrow' id='backArrow' onClick={() => this.props.onBackClick()} component={Button}>
          <BackIcon style={{ fontSize: 60 }} />
        </Grid>
        <Grid container item xs={8} id='dateContainer'>
          <Grid item xs={12}>
            <Typography variant='h5' color='primary'>
              {this.props.date.format('dddd').toUpperCase()}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h3' gutterBottom>
              {this.props.date.format('LL')}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={2} className='arrow' onClick={() => this.props.onForwardClick()} component={Button}>
          <ForwardIcon style={{ fontSize: 60 }} />
        </Grid>
      </ThemeProvider>
    )
  }
}

export default CalendarHeader;