import React, { Component } from 'react';
import { CardColumns } from 'react-bootstrap';
import StickyNote from './StickyNote';

class StickyNoteWall extends Component {
    render() {
        return (
            <CardColumns>
                <StickyNote />
                <StickyNote />
                <StickyNote />
                <StickyNote />
                <StickyNote />
                <StickyNote />
            </CardColumns>
        );
    }
}

export default StickyNoteWall;