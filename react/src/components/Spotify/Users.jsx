import React, { Component } from 'react';
import { Row, Container } from 'react-bootstrap';

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
        };
    }

    componentDidMount() {
        this.props.socket.on('init users', (users) => {
            this.setState({
                users: users,
            });
        });
        this.props.socket.on('new user', (userName) => {
            const usersCopy = this.state.users.slice();
            usersCopy.push(userName);
            this.setState({ users: usersCopy });
            console.log('new user: ' + userName);
        });
        this.props.socket.on('remove user', (userName) => {
            const usersCopy = this.state.users.slice();
            usersCopy.splice(this.state.users.indexOf(userName), 1);
            this.setState({ users: usersCopy });
            console.log('remove user: ' + userName);
        });
    }

    render() {
        const users = this.state.users.map((userName, i) => (
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