import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

import InOutButton from '../components/InOutButton';
import AddRoommateModal from '../components/AddRoommateModal';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            names: [],
            addModalShow: false,
            addModalName: ''
        };

        this.handleChangeAddRoommate = this.handleChangeAddRoommate.bind(this);
        this.handleSubmitAddRoommate = this.handleSubmitAddRoommate.bind(this);
    }

    handleChangeAddRoommate(e) {
        this.setState({addModalName: e.target.value});
    }

    handleSubmitAddRoommate(e) {
        e.preventDefault();
        console.log("Roommate added: " + this.state.addModalName);

        this.setState({
            names: [...this.state.names, this.state.addModalName],
            addModalName: '',
            addModalShow: false
        });
    }

    render() {
        const inOutButtons = this.state.names.map((name) => 
            <Col>
                <InOutButton name={name} />
            </Col>
        );
        return (
            <div className='app'>
                <h1>Dashboard</h1>
                <Button onClick={() => this.setState({addModalShow: true})}>Add roommate</Button>
                <Container>
                    <Row>
                        {inOutButtons}
                    </Row>
                </Container>
                <Button as={Link} to='/calendar'>Calendar</Button>

                <AddRoommateModal 
                    show={this.state.addModalShow}
                    onHide={() => this.setState({addModalShow: false})}
                    addModalName={this.state.addModalName}
                    onChangeAddRoommate={this.handleChangeAddRoommate}
                    onSubmitAddRoommate={this.handleSubmitAddRoommate}
                />
            </div>
        );
    }
}

export default Dashboard;
