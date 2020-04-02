import React, { Component } from 'react';
import { Typography, Container, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import StickyNote from './StickyNote';
import { WidthProvider, Responsive } from "react-grid-layout";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import _ from 'lodash';

const theme = createMuiTheme({
  overrides: {
    MuiIconButton: {
      root: {
        background: '#7fb069',
        float: 'right',
      },
      colorPrimary: {
        color: '#b5e2fa',
        '&:hover': {
          backgroundColor: '#729e5e'
        }
      },
    }
  }
});

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class StickyNotes extends Component {
  static defaultProps = {
    className: 'layout',
    cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
    rowHeight: 100,
    draggableCancel: '.disableDrag',
    style: { marginTop: '32px'},
    compactType: null,
  };

  constructor(props) {
    super(props);
    
    this.state = {
      notes: [],
      layouts: {}
    };

    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onAddStickyNote = this.onAddStickyNote.bind(this);
    this.onRemoveStickyNote = this.onRemoveStickyNote.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
  }

  onLayoutChange(layout, layouts) {
    // i already set the layout in 'onRemoveStickyNote()' 
    if (!this.state.removing && !this.state.adding) {
      this.setState({ layouts: layouts });
    }
    this.setState({
      adding: false,
      removing: false
    });
  }

  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  onAddStickyNote() {
    this.setState({
      adding: true
    });

    let newLayouts = {...this.state.layouts};
    _.forOwn(newLayouts, (value, key) => {
      newLayouts[key] = _.concat(value, {
        i: value.length.toString(),
        x: (value.length * 2) % (this.state.cols || 12),
        y: Infinity,
        w: 2,
        h: 2
      });
    });

    this.setState({
      notes: _.concat(this.state.notes, {
        title: '',
        description: ''
      }),
      layouts: newLayouts,
      adding: false
    });
  }

  onRemoveStickyNote(i) {
    this.setState({
      removing: true
    });
    // remove sticky note
    let newNotes = [...this.state.notes];
    newNotes.splice(i, 1);

    let newLayouts = {...this.state.layouts}
    // for each layout
    _.forOwn(newLayouts, (layout) => {
      // remove sticky note in layout
      _.remove(layout, (note) => {
        return note.i === i.toString();
      });
      // re-index sticky notes in layout
      _.map(layout, (note, index) => {
        note.i = index.toString()
      });
    });
    this.setState({
      notes: newNotes,
      layouts: newLayouts,
      removing: false
    });
  }

  onTitleChange(i, title) {
    let newNotes = [...this.state.notes];
    newNotes[i].title = title;
    this.setState({
      notes: newNotes
    });
  }

  onDescriptionChange(i, description) {
    let newNotes = [...this.state.notes];
    newNotes[i].description = description;
    this.setState({
      notes: newNotes
    });
  }

  render() {
    // TODO: figure out Infinity for parse and stringify
    let newLayouts = JSON.parse(JSON.stringify(this.state.layouts));
    return (
      <ThemeProvider theme={theme}>
        <Container disableGutters>
          <IconButton color='primary' onClick={this.onAddStickyNote}>
            <AddIcon />
          </IconButton>
          <Typography variant='h5'>
            friendly reminders...
          </Typography>
          <ResponsiveReactGridLayout
            layouts={newLayouts}
            onLayoutChange={this.onLayoutChange}
            onBreakpointChange={this.onBreakpointChange}
            {...this.props}
          >
            {_.map(this.state.notes, (note, i) => (
              <div 
                key={i} 
              >
                <StickyNote 
                  i={i} 
                  onRemoveStickyNote={this.onRemoveStickyNote}
                  onTitleChange={this.onTitleChange}
                  onDescriptionChange={this.onDescriptionChange}
                  title={note.title} 
                  description={note.description} 
                />
              </div>
            ))}
          </ResponsiveReactGridLayout>
        </Container>
      </ThemeProvider>
    );
  }
}

export default StickyNotes;