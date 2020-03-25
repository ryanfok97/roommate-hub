import React, { Component } from 'react';
import { Card, CardContent, TextField, CardHeader, IconButton } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';

const theme = createMuiTheme({
  overrides: {
    MuiCard: {
      root: {
        height: '100%'
      }
    },
    MuiTextField: {
      root: {
        '&.description': {
          'overflow-y': 'auto'
        }
      }
    },
    MuiCardHeader: {
      root: {
        paddingBottom: 0
      }
    },
    MuiCardContent: {
      root: {
        paddingTop: 0,
        height: 'calc(100% - 80px)'
      }
    },
    MuiIconButton: {
      root: {
        '&:hover': {
          backgroundColor: 'white',
          color: 'rgba(0, 0, 0, 0.80)'
        }
      }
    }
  }
});

class StickyNote extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Card>
          <CardHeader 
            title={
              <TextField 
              className='disableDrag' 
              placeholder="Title" 
              onChange={(e) => this.props.onTitleChange(this.props.i, e.target.value)}
              value={this.props.title}
              fullWidth
              InputProps={{ disableUnderline: true }}
              inputProps={{ maxLength: 18 }}
              autoFocus
            />
            }
            action={
              <IconButton disableRipple onClick={() => this.props.onRemoveStickyNote(this.props.i)}>
                <CloseIcon />
              </IconButton>
            }
          />
          <CardContent>
            <TextField 
              className='disableDrag description' 
              placeholder="your passive aggressive message" 
              multiline
              onChange={(e) => this.props.onDescriptionChange(this.props.i, e.target.value)}
              value={this.props.description}
              fullWidth
              InputProps={{ disableUnderline: true }}
            />
          </CardContent>
        </Card>
      </ThemeProvider>
    );
  }
}

export default StickyNote;