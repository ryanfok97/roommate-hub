import React, { Component } from 'react';
import { Button, Card, CardColumns, Container } from 'react-bootstrap';
import StickyNote from './StickyNote';

class StickyNoteWall extends Component {
    render() {
        return (
            <Container fluid>
                <CardColumns style={{textAlign: 'center'}}>
                    <StickyNote />
                    <StickyNote />
                    <StickyNote />
                    <StickyNote />
                    <Button as={Card} style={{backgroundColor: 'transparent', color: 'black', fontSize: '2rem', padding: '0rem'}} 
                        className='sticky-note' onClick={() => alert('haha bitch i didn\'t do this yet')}>+</Button>
                </CardColumns>
            </Container>
        );
    }
}

export default StickyNoteWall;