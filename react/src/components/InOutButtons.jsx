import React, { Component } from 'react';
import InOutButton from './InOutButton';
import { Button, Container, Row } from 'react-bootstrap';

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
            <Container fluid>
                <Row style={{alignItems: 'center'}}>
                    {inOutButtons}
                    <Button style={{maxHeight: '4rem', marginRight: '5rem'}} onClick={this.props.handleShowAddModal}>+</Button>
                </Row>
            </Container>
);
    }
}

export default InOutButtons;