import React, { Component } from 'react';
import { Row, Container } from 'react-bootstrap';

class Users extends Component {
    render() {
        const users = this.props.users.map((userName, i) => (
            <Row key={i}>
                { userName }
            </Row>
        ));
        return (
            <Container>
                <Row>Active Users:</Row>

                { users }
            </Container>
        );
    }
}

export default Users;