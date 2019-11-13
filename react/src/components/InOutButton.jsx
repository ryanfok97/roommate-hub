import React, { Component } from 'react';

import { Col,
         Row,
         ToggleButtonGroup, 
         ToggleButton } from 'react-bootstrap';

class InOutButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 1
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(val) {
        this.setState({
            value: val
        });
    }

    render() {
        return (
            <Col>
                <div>
                    <ToggleButtonGroup type='checkbox'>
                        <ToggleButton defaultChecked className='in-out-btn' variant='success'>
                            <h3 style={{margin: '0'}}>{this.props.name}</h3>
                        </ToggleButton>
                    </ToggleButtonGroup>

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
                            onChange={this.handleChange}
                            value={this.state.value}
                        >
                            <ToggleButton value={1} variant='success' className='in-out-btn-toggle'>In</ToggleButton>
                            <ToggleButton value={2} variant='danger' className='in-out-btn-toggle'>Out</ToggleButton>
                        </ToggleButtonGroup>
                    </Row>
                </div>
            </Col>
        );
    }
}

export default InOutButton;
