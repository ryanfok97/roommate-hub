import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class NextButton extends Component {
    render() {
        return (
            <Button onClick={() => this.props.handleNext()}>Next</Button>
        );
    }
}

export default NextButton;