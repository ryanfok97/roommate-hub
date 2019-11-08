import React, { Component } from 'react';

import { Col,
         Row,
         ToggleButtonGroup, 
         ToggleButton } from 'react-bootstrap';

class InOutButton extends Component {
    render() {
        return (
            <Col>
                <div>
                    <Row noGutters className='justify-content-center align-items-center'>
                        <Col xs sm='auto'>
                            <h3 style={{margin: '0'}}>{this.props.name}</h3>
                        </Col>
                        <Col xs sm='auto' style={{marginLeft: '.5rem'}}>
                            <button className='close' onClick={(e) => this.props.handleShowRemoveModal(this.props.name, e)}>X</button>
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <ToggleButtonGroup 
                            name={this.props.name} 
                            defaultValue={1}
                        >
                            <ToggleButton value={1} variant='success'>In</ToggleButton>
                            <ToggleButton value={2} variant='danger'>Out</ToggleButton>
                        </ToggleButtonGroup>
                    </Row>
                </div>
            </Col>
        );
    }
}

export default InOutButton;
