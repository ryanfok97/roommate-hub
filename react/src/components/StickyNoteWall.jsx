import React, { Component } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import StickyNote from './StickyNote';
import { WidthProvider, Responsive } from 'react-grid-layout';
import _ from 'lodash';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class StickyNoteWall extends Component {
    static defaultProps = {
        className: 'layout',
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
        rowHeight: 30,
        // verticalCompact: false
    }

    constructor(props) {
        super(props);

        this.state = {
            notes: [],
            count: 0
        };

        this.handleAddStickyNote = this.handleAddStickyNote.bind(this);
    }

    componentDidMount() {
        this.props.socket.on('sticky note init', ({notes, layouts}) => {
            this.setState({
                notes: notes,
                layouts: layouts
            });
            console.log('initialized sticky notes');
        });

        this.props.socket.on('sticky note layout change', (layouts) => {
            this.setState({
                layouts: layouts
            });
        });

        this.props.socket.on('sticky note add', ({i, count}) => {
            this.setState({
                notes: this.state.notes.concat({
                    i: i,
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 4
                }),
                count: count
            });
        });

        this.props.socket.on('sticky note delete', (index) => {
            let notesCopy = this.state.notes;
            notesCopy.splice(index, 1);
            this.setState({
                notes: notesCopy
            });
        });

        this.props.socket.on('sticky note edit title', ({index, title}) => {
            let notesCopy = this.state.notes;
            notesCopy[index].title = title;
            this.setState({
                notes: notesCopy
            });
        });

        this.props.socket.on('sticky note edit text', ({index, text}) => {
            let notesCopy = this.state.notes;
            notesCopy[index].text = text;
            this.setState({
                notes: notesCopy
            });
        });
    }

    componentWillUnmount() {
        this.props.socket.off('sticky note add');
        this.props.socket.off('sticky note delete');
        this.props.socket.off('sticky note edit title');
        this.props.socket.off('sticky note edit text');
    }

    createStickyNote(note) {
        return (
            <div key={note.i} data-grid={note}>
                <StickyNote 
                    title={note.title ? note.title : ''}
                    text={note.text ? note.text : ''}
                    idx={note.i}
                    handleDeleteStickyNote={(index) => this.handleDeleteStickyNote(index)}
                    handleEditStickyNoteTitle={(index, e) => this.handleEditStickyNoteTitle(index, e)}
                    handleEditStickyNoteText={(index, e) => this.handleEditStickyNoteText(index, e)} />
            </div>
        )
    }

    handleAddStickyNote() {
        const note = {
            i: this.state.count.toString(),
            x: 0,
            y: 0,
            w: 2,
            h: 4
        }
        this.setState({
            notes: this.state.notes.concat(note),
            count: this.state.count + 1
        });
        this.props.socket.emit('sticky note add', {
            i: note.i,
            count: this.state.count
        });
        console.log('Added note');
    }

    handleDeleteStickyNote(index) {
        this.setState({
            notes: _.reject(this.state.notes, {i: index.toString()})
        });
        this.props.socket.emit('sticky note delete', index);
        console.log('Removed note ' + index);
    }

    handleEditStickyNoteTitle(index, e) {
        let notesCopy = this.state.notes;
        notesCopy[index].title = e.target.value;
        this.setState({
            notes: notesCopy
        });
        this.props.socket.emit('sticky note edit title', {
            index: index,
            title: e.target.value,
        });
        console.log('Edited note ' + index + ' title to "' + e.target.value + '"');
    }

    handleEditStickyNoteText(index, e) {
        let notesCopy = this.state.notes;
        notesCopy[index].text = e.target.value
        this.setState({
            notes: notesCopy
        });
        this.props.socket.emit('sticky note edit text', {
            index: index,
            text: e.target.value,
        });
        console.log('Edited note ' + index + ' text to "' + e.target.value + '"');
    }

    handleLayoutChange(layout, layouts) {
        this.setState({ 
            layouts: layouts 
        });
        this.props.socket.emit('sticky note layout change', layouts);
    }

    render() {
        return (
            <Container fluid>
                <Button 
                    as={Card} 
                    style={{fontSize: '2rem', overflow: 'visible', resize: 'none'}} 
                    className='sticky-note p-0 bg-transparent text-dark' 
                    onClick={() => this.handleAddStickyNote()}
                >
                    +
                </Button>
                <ResponsiveReactGridLayout
                    onLayoutChange={(layout, layouts) => this.handleLayoutChange(layout, layouts)}
                    {...this.props}
                    draggableCancel='.disable-drag'
                    layouts={this.state.layouts}
                >
                    {this.state.notes.map((note) => this.createStickyNote(note))}
                </ResponsiveReactGridLayout>
            </Container>
        );
    }
}

export default StickyNoteWall;