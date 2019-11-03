import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

class InOutButton extends Component {
    render() {
        return (
            <Button className='in-out-button'>
                {this.props.name}
            </Button>
        );
    }
}

export default InOutButton;
