import React, { Component } from 'react';
import { Modal, FormGroup, Form, Button } from 'react-bootstrap';
 
class UserNameModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: '',
            validated: false,
        };
    }

    handleChange(e) {
        this.setState({
            input: e.target.value,
        });
        if (this.state.input) {
            this.setState({
                validated: true
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.props.socket.connected) {
            console.err('new user failed, not connected to socket');
        } else if (this.props.socket.connected && this.state.input) {
            this.props.socket.emit('spotify new user', this.state.input);
            this.props.onSubmit(this.state.input);
            this.setState({
                validated: true,
            });
        }
    }

    render() {
        return (
            <>
            <Modal 
                show={this.props.show}
                centered
            >
                <Modal.Header>
                <Modal.Title>Enter your name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form 
                        noValidate 
                        validated={this.state.validated} 
                        onSubmit={ (e) => this.handleSubmit(e) 
                    }>
                        <FormGroup>
                            <Form.Control
                                required
                                type='text'
                                placeholder='Name'
                                value={this.state.input}
                                onChange={(e) => this.handleChange(e)}
                            />
                            <Form.Control.Feedback type='invalid'>Please enter your name.</Form.Control.Feedback>
                        </FormGroup>
                        <Button variant="primary" type='submit'>
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            </>
        );
    }
}

export default UserNameModal;