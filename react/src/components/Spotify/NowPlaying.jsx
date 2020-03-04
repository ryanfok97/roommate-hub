import React, { Component } from 'react';
import { Row } from 'react-bootstrap';

class NowPlaying extends Component {
    render() {
        const currentPlayback = this.props.currentPlayback ? this.props.currentPlayback.name : '';
        return (
            <Row>
                Now Playing: {currentPlayback}
            </Row>
        );
    }
}

export default NowPlaying;