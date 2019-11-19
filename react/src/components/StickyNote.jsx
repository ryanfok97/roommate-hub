import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

class StickyNote extends Component {
    render() {
        /* TODO:
            * resizable (entire sticky note)
            * editable (title, text both optional and editable)
            * bold/italic/underline/strikethrough capability (for text)
            * list capability (for text)
            * lil x button to delete (top right corner)
            * titles (optional and editable)
            * movable
        */
        return (
            <Card className='sticky-note'>
                <Card.Body className='p-1'>
                    <button className='sticky-close close' onClick={(e) => this.props.handleDeleteStickyNote(this.props.idx, e)}>
                        <span aria-hidden='true'>&times;</span>
                    </button>
                    <Card.Title as='input' className='sticky-note-title h5' placeholder='Note Title' />
                    <Card.Text as='textarea' className='sticky-note-text' placeholder="What's your passive aggressive message?" />
                </Card.Body>
            </Card>
        );
    }
}

export default StickyNote;