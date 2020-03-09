import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

class RemoveRoommateModal extends Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete roommate</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to remove <b><i>{this.props.name}</i></b>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={this.props.onHide}>Cancel</Button>
                    <Button variant='primary' onClick={this.props.onRemoveRoommate}>Yes</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default RemoveRoommateModal;