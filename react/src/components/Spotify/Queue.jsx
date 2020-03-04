import React, { Component } from 'react';
import { Container, Table, Button } from 'react-bootstrap';

class Queue extends Component {
    handleRemoveTrack(index) {
        this.props.socket.emit('remove from queue', index);
    }

    getArtists(artists) {
        let result = artists[0].name;
        for (let i = 1; i < artists.length; i++) {
            result += ', ' + artists[i].name;
        }
        return result;
    }

    render() {
        const queue = this.props.queue.map((obj, i) => {
            return <tr key={i}>
                <td><Button onClick={() => this.handleRemoveTrack(i)}>X</Button></td>
                <td>{obj.user}</td>
                <td>{obj.track.name}</td>
                <td>{this.getArtists(obj.track.artists)}</td>
                <td>{obj.track.type}</td>
            </tr>
        });
        return (
            <Container className='queue'>
                <Table>
                    <thead key='header'>
                        <tr>
                            <th></th>
                            <th>User</th>
                            <th>Name</th>
                            <th>Artist(s)</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {queue}
                    </tbody>
                </Table>
            </Container>
        )
    }
}

export default Queue;