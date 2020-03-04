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
        this.props.socket.on('init current status', (isPlaying) => {
            this.setState({ isPlaying: isPlaying });
            console.log('Player status initialized.');
        });
        this.props.socket.on('resume', () => {
            this.setState({ isPlaying: true });
            console.log('playback resumed');
        });
        this.props.socket.on('pause', () => {
            this.setState({ isPlaying: false });
            console.log('playback paused');
        });
        this.props.socket.on('next', () => {
            this.setState({ isPlaying: true });
        })
    }

    handleResume() {
        console.log('resume');
        this.props.socket.emit('resume');
        this.setState({ isPlaying: true });
    }

    handlePause() {
        console.log('pause');
        this.props.socket.emit('pause');
        this.setState({ isPlaying: false });
    }

    render() {
        let playPause = this.state.isPlaying ? 'Pause' : 'Resume';
        return (
            <Button onClick={() => this.state.isPlaying ? this.handlePause() : this.handleResume()}>{playPause}</Button>
        );
    }
}

export default PlayPauseButton;