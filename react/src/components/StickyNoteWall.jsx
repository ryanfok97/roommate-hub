import React, { Component } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import StickyNote from './StickyNote';

class StickyNoteWall extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: []
        };

        this.handleAddStickyNote = this.handleAddStickyNote.bind(this);
    }

    componentDidMount() {
        this.props.socket.on('sticky note init', (notes) => {
            this.setState({
                notes: notes
            });
            console.log('initialized sticky notes');
        });

        this.props.socket.on('sticky note add', () => {
            let notesCopy = this.state.notes;
            notesCopy.push({
                title: '',
                text: '',
            });
            this.setState({
                notes: notesCopy
            })
        });

        this.props.socket.on('sticky note delete', (note) => {
            let notesCopy = this.state.notes;
            notesCopy.splice(note, 1);
            this.setState({
                notes: notesCopy
            });
        });

        this.props.socket.on('sticky note edit title', ({note, title}) => {
            let notesCopy = this.state.notes;
            notesCopy[note].title = title;
            this.setState({
                notes: notesCopy
            });
        });

        this.props.socket.on('sticky note edit text', ({note, text}) => {
            let notesCopy = this.state.notes;
            notesCopy[note].text = text;
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

    handleAddStickyNote() {
        let notesCopy = this.state.notes;
        notesCopy.push({
            title: '',
            text: '',
        });
        this.setState({
            notes: notesCopy
        });
        this.props.socket.emit('sticky note add');
        console.log('Added note');
    }

    handleDeleteStickyNote(note, e) {
        let notesCopy = this.state.notes;
        notesCopy.splice(note, 1);
        this.setState({
            notes: notesCopy
        });
        this.props.socket.emit('sticky note delete', note);
        console.log('Removed note ' + note);
    }

    handleEditStickyNoteTitle(note, e) {
        let notesCopy = this.state.notes;
        notesCopy[note].title = e.target.value;
        this.setState({
            notes: notesCopy
        });
        this.props.socket.emit('sticky note edit title', {
            note: note,
            title: e.target.value,
        });
        console.log('Edited note ' + note + ' title to "' + e.target.value + '"');
    }

    handleEditStickyNoteText(note, e) {
        let notesCopy = this.state.notes;
        notesCopy[note].text = e.target.value;
        this.setState({
            notes: notesCopy
        });
        this.props.socket.emit('sticky note edit text', {
            note: note,
            text: e.target.value,
        });
        console.log('Edited note ' + note + ' text to "' + e.target.value + '"');
    }

    render() {
        const notes = this.state.notes.map((note, i) => 
            <StickyNote key={i} idx={i}
                title={note.title}
                text={note.text}
                handleDeleteStickyNote={(note, e) => this.handleDeleteStickyNote(note, e)}
                handleEditStickyNoteTitle={(note, e) => this.handleEditStickyNoteTitle(note, e)}
                handleEditStickyNoteText={(note, e) => this.handleEditStickyNoteText(note, e)} />
        );

        return (
            <Container fluid className='my-3 text-center d-flex justify-content-around'>
                {notes}
                <Button as={Card} style={{fontSize: '2rem', overflow: 'visible', resize: 'none'}} 
                    className='sticky-note p-0 bg-transparent text-dark' onClick={() => this.handleAddStickyNote()}>+</Button>
            </Container>
        );
    }
}

export default StickyNoteWall;