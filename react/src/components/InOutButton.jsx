import React, { Component } from 'react';

import { Button, Col,
         Row,
         ToggleButtonGroup, 
         ToggleButton } from 'react-bootstrap';

class InOutButton extends Component {
    // constructor(props) {
    //     super(props);

    //     this.handleChange = this.handleChange.bind(this);
    // }

    render() {
        return (
            <Col>
                <div className='pl-5'>
                    <Row noGutters className='justify-content-center align-items-center m-0 py-2 border border-dark bg-light'>
                        <Col xs sm='auto'>
                            <h3 className='m-0'>{this.props.name}</h3>
                        </Col>
                        <Col xs sm='auto' className='ml-2'>
                            <button className='close' aria-label='Close'
                                    onClick={(e) => this.props.handleShowRemoveModal(this.props.name, e)}>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </Col>
                    </Row>
                    <Row className='justify-content-center m-0'>
                        <ToggleButtonGroup 
                            className='w-75 btn-group-justified'
                            name={this.props.name} 
                            defaultValue={1}
                            onChange={(value) => this.props.handleChange(value)}
                            value={this.props.value}
                        >
                            <ToggleButton value={1} variant='success' className='in-out-btn-toggle'>
                                In
                            </ToggleButton>
                            <ToggleButton value={2} variant='danger' className='in-out-btn-toggle'>
                                Out
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Row>
                </div>
            </Col>
        );
    }
}

export default InOutButton;
