import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class NextButton extends Component {
    handleNext() {
        console.log('next');
        this.props.socket.emit('next');
    }

    render() {
        return (
            <Button onClick={() => this.handleNext()}>Next</Button>
        );
    }
}

export default NextButton;