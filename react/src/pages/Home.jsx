import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import { Grid, Card, CardContent, Typography, Container } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import StickyNotes from '../components/StickyNotes';

const theme = createMuiTheme({
  overrides: {
    MuiContainer: {
      root: {
        maxWidth: 'lg'
      }
    },
    MuiCard: {
      root: {
        background: '#b5e2fa'
      }
    },
    MuiGrid: {
      root: {
        width: '100%'
      },
      item: {
        '&#top': {
          marginBottom: '16px'
        }
      }
    }
  }
});

class Home extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <NavBar page={0}></NavBar>
          <div style={{ marginTop: 92 }}>
            <Grid container spacing={0}>
              <Grid item xs={12} id='top'>
                <Container>
                  <Card color='textSecondary'>
                    <CardContent>
                      <Typography>
                        kad does this one
                      </Typography>
                    </CardContent>
                  </Card>
                </Container>
              </Grid>
              <Grid item xs={12}>
                <Container>
                  <Card color='textSecondary'>
                    <CardContent>
                      <StickyNotes />
                    </CardContent>
                  </Card>
                </Container>
              </Grid>
            </Grid>
          </div>
        </div>
      </ThemeProvider>
    )
  }
}

export default Home;