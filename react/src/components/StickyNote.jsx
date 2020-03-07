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
                    <button className='sticky-close close' onClick={(e) => this.props.handleDeleteStickyNote(this.props.idx, e)}>
                        <span aria-hidden='true'>&times;</span>
                    </button>
                    <Card.Title as='input' value={this.props.title} className='sticky-note-title h5' placeholder='Untitled' onChange={(e) => this.props.handleEditStickyNoteTitle(this.props.idx, e)} />
                    <Card.Text as='input' value={this.props.text} contentEditable className='sticky-note-text' placeholder="What's your passive aggressive message?" onChange={(e) => this.props.handleEditStickyNoteText(this.props.idx, e)} />
                </Card.Body>
            </Card>
        );
    }
}

export default StickyNote;