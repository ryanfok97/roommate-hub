import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';

class Queue extends Component {
    getArtists(artists) {
        let result = artists[0].name;
        for (let i = 1; i < artists.length; i++) {
            result += ', ' + artists[i].name;
        }
        return result;
    }

    render() {
        const queue = this.props.queue.map((obj, i) => {
            if (obj.track.type === "playlist") {
                return <Row key={i}>
                    <Col>{obj.user}</Col> 
                    <Col>{obj.track.name}</Col>
                    <Col>{obj.track.owner.display_name}</Col>
                    <Col>{obj.track.type}</Col>
                </Row>
            } else {
                return <Row key={i}>
                    <Col>{obj.user}</Col>
                    <Col>{obj.track.name}</Col>
                    <Col>{this.getArtists(obj.track.artists)}</Col>
                    <Col>{obj.track.type}</Col>
                </Row>
            }
        });
        return (
            <Container>
                <Row key='header'>
                    <Col>User</Col>
                    <Col>Name</Col>
                    <Col>Artist(s)</Col>
                    <Col>Type</Col>
                </Row>
                {queue}
            </Container>
        )
    }
}

export default Queue;