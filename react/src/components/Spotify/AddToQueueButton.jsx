import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class AddToQueueButton extends Component {
    render() {
        return (
            <Button onClick={() => this.props.onClick()}>Add to Queue</Button>
        );
    }
}

export default AddToQueueButton;