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

    handleAddStickyNote() {
        // console.log('Add sticky note clicked');
        // TODO: fix duplicate key issue when deleting then adding notes
        this.setState((state) => {
            return {notes: [...state.notes, <StickyNote key={state.notes.length} idx={state.notes.length}
                handleDeleteStickyNote={(note, e) => this.handleDeleteStickyNote(note, e)} />]};
        });
    }

    handleDeleteStickyNote(note, e) {
        var newNotes = [...this.state.notes];
        newNotes.splice(note, 1);
        console.log('Removed note ' + note);

        this.setState({
            notes: newNotes
        });
    }

    render() {
        return (
            <Container fluid className='my-3 text-center d-flex justify-content-around'>
                {this.state.notes}
                <Button as={Card} style={{fontSize: '2rem', overflow: 'visible', resize: 'none'}} 
                    className='sticky-note p-0 bg-transparent text-dark' onClick={() => this.handleAddStickyNote()}>+</Button>
            </Container>
        );
    }
}

export default StickyNoteWall;