import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

class StickyNote extends Component {
    render() {
        return (
            <Card>
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