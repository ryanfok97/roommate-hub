import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

class StickyNote extends Component {
    render() {
        /* TODO:
            * bold/italic/underline/strikethrough capability (for text)
            * list capability (for text)
            * movable
        */
        return (
            <Card className='sticky-note'>
                <Card.Body className='p-1'>
                    <button className='sticky-close close disable-drag' onClick={() => this.props.handleDeleteStickyNote(this.props.idx)}>
                        <span aria-hidden='true'>&times;</span>
                    </button>
                    <Card.Title autoFocus as='input' value={this.props.title} className='sticky-note-title h5 disable-drag' placeholder='Untitled' onChange={(e) => this.props.handleEditStickyNoteTitle(this.props.idx, e)} />
                    <Card.Text as='textarea' value={this.props.text} className='sticky-note-text disable-drag' placeholder="What's your passive aggressive message?" onChange={(e) => this.props.handleEditStickyNoteText(this.props.idx, e)} />
                </Card.Body>
            </Card>
        );
    }
}

export default StickyNote;