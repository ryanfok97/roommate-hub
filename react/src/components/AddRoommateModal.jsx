import React, { Component } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

class AddRoommateModal extends Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide} centered>
                <Form onSubmit={this.props.onSubmitAddRoommate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a roommate</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId='name'>
                            <Form.Label>Roommate's Name:</Form.Label>
                            <Form.Control type='text' placeholder='John Doe' 
                                          onChange={this.props.onChangeAddRoommate}
                                          value={this.props.addModalName} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={this.props.onHide}>Cancel</Button>
                        <Button variant='primary' type='submit'>Add Roommate</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}

export default AddRoommateModal;