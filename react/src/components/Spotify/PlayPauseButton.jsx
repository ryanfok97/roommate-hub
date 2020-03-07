import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class PlayPauseButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPlaying: false
        }
    }

    componentDidMount() {
        this.props.socket.on('spotify init current status', (isPlaying) => {
            this.setState({ isPlaying: isPlaying });
            console.log('Player status initialized.');
        });
        this.props.socket.on('spotify resume', () => {
            this.setState({ isPlaying: true });
            console.log('playback resumed');
        });
        this.props.socket.on('spotify pause', () => {
            this.setState({ isPlaying: false });
            console.log('playback paused');
        });
        this.props.socket.on('spotify next', () => {
            this.setState({ isPlaying: true });
        })
    }

    componentWillUnmount() {
        this.props.socket.off('spotify init current status');
        this.props.socket.off('spotify resume');
        this.props.socket.off('spotify pause');
        this.props.socket.off('spotify next');
    }

    handleResume() {
        if (!this.props.socket.connected) {
            console.err('resume failed, not connected to socket');
        } else {
            console.log('resume');
            this.props.socket.emit('spotify resume');
            this.setState({ isPlaying: true });
        }
    }

    handlePause() {
        if (!this.props.socket.connected) {
            console.err('pause failed, not connected to socket');
        } else {
            console.log('pause');
            this.props.socket.emit('spotify pause');
            this.setState({ isPlaying: false });
        }
    }

    render() {
        let playPause = this.state.isPlaying ? 'Pause' : 'Resume';
        return (
            <Button onClick={() => this.state.isPlaying ? this.handlePause() : this.handleResume()}>{playPause}</Button>
        );
    }
}

export default PlayPauseButton;