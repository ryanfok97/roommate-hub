import React, { Component } from 'react';
import InOutButton from './InOutButton';
import { Button, Col, Container, Row } from 'react-bootstrap';

class InOutButtons extends Component {
    render() {
        // TODO: make this configurable -- number of roommates per row? 4?
        // TODO: also make this into a different component
        const inOutButtons = this.props.names.map((name) => 
            <InOutButton key={name} name={name} 
                    handleShowRemoveModal={(name, e) => this.props.handleShowRemoveModal(name, e)}
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