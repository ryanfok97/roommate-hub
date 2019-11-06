import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InOutButton from '../components/InOutButton';

import { Container, Row, Col, Button } from 'react-bootstrap';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            names: [],
            showModal: false,
        };
    }

    handleShowModal() {

    }

    render() {
        return (
            <div className='app'>
                <h1>Dashboard</h1>
                <Button onClick={this.handleShowModal}>Add roommate</Button>
                <Container>
                    <Row>
                        <Col>
                            <InOutButton name='Brandon' />
                        </Col>
                        <Col>
                            <InOutButton name='Kadison' />
                        </Col>    
                        <Col>
                            <InOutButton name='Ryan' />
                        </Col>
                        <Col>
                            <InOutButton name='Steven' />
                        </Col>
                    </Row>
                </Container>
                <Button as={Link} to='/calendar'>Calendar</Button>
            </div>
        );
    }
}

export default Dashboard;
