import { AppBar, Toolbar, Typography, Button, Paper } from '@material-ui/core';
import React, { Component } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { NavLink } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0fa3b1'
    },
    secondary: {
      main: '#b5e2fa'
    }
  },
  overrides: {
    MuiButton: {
      root: {
        marginRight: '2vw',
        '&:hover': {
          backgroundColor: '#b5e2fa',
          color: 'black'
        }
      },
      containedSecondary: {
        '&:hover': {
          backgroundColor: '#b5e2fa',
          color: 'black'
        }
      }
    },
    MuiTypography: {
      root: {
        textDecoration: 'none',
        color: 'white'
      }
    },
    MuiPaper: {
      root: {
        flexGrow: 1
      }
    }
  }
});

class NavBar extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <AppBar>
            <Toolbar>
              <Typography component={NavLink} to='/' variant='h6'>
                roommate hub
              </Typography>
              {/* SPACER */}
              <Paper></Paper>
              <Button 
                disableElevation
                component={NavLink} 
                to='/' 
                color={this.props.page === 0 ? 'secondary' : 'inherit'} 
                variant={this.props.page === 0 ? 'contained' : 'text'}
              >
                Home
              </Button>
              <Button 
                disableElevation
                component={NavLink} 
                to='/calendar' 
                color={this.props.page === 1 ? 'secondary' : 'inherit'} 
                variant={this.props.page === 1 ? 'contained' : 'text'}
              >
                Calendar
              </Button>
              <Button 
                disableElevation
                component={NavLink} 
                to='/calendar' 
                color={this.props.page === 2 ? 'secondary' : 'inherit'} 
                variant={this.props.page === 2 ? 'contained' : 'text'}
              >
                Chores
              </Button>
              <Button 
                disableElevation
                component={NavLink} 
                to='/calendar' 
                color={this.props.page === 3 ? 'secondary' : 'inherit'} 
                variant={this.props.page === 3 ? 'contained' : 'text'}
              >
                Manage Roommates
              </Button>
            </Toolbar>
          </AppBar>
        </div>
      </ThemeProvider>
    )
  }
}

export default NavBar;