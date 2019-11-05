import React, { Component } from 'react';

import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

class InOutButton extends Component {
    render() {
        return (
            <div>
                <h3>{this.props.name}</h3>
                <ToggleButtonGroup 
                    name={this.props.name} 
                    defaultValue={1}
                >
                    <ToggleButton value={1} variant='success'>In</ToggleButton>
                    <ToggleButton value={2} variant='danger'>Out</ToggleButton>
                </ToggleButtonGroup>
            </div>
        );
    }
}

export default InOutButton;
