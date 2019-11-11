import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

class StickyNote extends Component {
    render() {
        /* TODO:
            * resizable
            * editable
            * bold/italic/underline/strikethrough capability
            * list capability
            * lil x button to delete
            * titles
            * movable
        */
        return (
            <Card className='sticky-note'>
                <Card.Title>title</Card.Title>
                <Card.Body>
                    <Card.Text>
                        a sticky note! wow!
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export default StickyNote;