import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import InOutButton from '../components/InOutButton';

import { Container, Row, Col, Button } from 'react-bootstrap';

class Dashboard extends Component {
    render() {
        return (
            <div className='app'>
                <h1>Dashboard</h1>
                <Container>
                    <Row>
                        <Col>
                            <InOutButton name='Brandon' />
                        </Col>
                        <Col>
                            <InOutButton name='Kadison' />
                        </Col>
                    </Row>
                    <Row>
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
