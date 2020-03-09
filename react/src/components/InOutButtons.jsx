import React, { Component } from 'react';
import InOutButton from './InOutButton';
import { Button, Col, Container, Row } from 'react-bootstrap';

class InOutButtons extends Component {
    render() {
        // TODO: make this configurable -- number of roommates per row? 4?
        const inOutButtons = this.props.roommates.map(({name, value}, i) => 
            <InOutButton key={i} index={i} name={name} value={value}
                    handleShowRemoveModal={(name, e) => this.props.handleShowRemoveModal(i, name, e)}
                    handleChange={(value) => this.props.handleChange(i, value)}
            />
        );
        return (
            <Container fluid className='my-3'>
                <Row className='align-items-center'>
                    {inOutButtons}
                    <Col xs sm='auto' className='mx-5'>
                        <div>
                            <Button onClick={this.props.handleShowAddModal}>+</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
);
    }
}

export default InOutButtons;