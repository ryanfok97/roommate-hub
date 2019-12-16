import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import spotifyApiClient from '../clients/spotify-api-client';
import socketIOClient from "socket.io-client";
import GetDevices from '../components/Spotify/GetDevices';
import NextButton from '../components/Spotify/NextButton';
import PlayPauseButton from '../components/Spotify/PlayPauseButton';
import AddToQueueButton from '../components/Spotify/AddToQueueButton';
import UserNameModal from '../components/Spotify/UserNameModal';
import Queue from '../components/Spotify/Queue';
import SearchResults from '../components/Spotify/SearchResults';
import Search from '../components/Spotify/Search';
import Users from '../components/Spotify/Users';
import NowPlaying from '../components/Spotify/NowPlaying';

const endpoint = "http://localhost:3001";
const socket = socketIOClient(endpoint);

class Spotify extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            selectedItem: null,
            queue: [],
            tracks: [],
            albums: [],
            playlists: [],
            currentPlayback: '',
            user: sessionStorage.getItem('user'),
        };
    }

    componentDidMount() {
        if (this.state.user != null) {
            socket.emit('new user', this.state.user);
        }

        socket.on('init queue', (queue) => {
            this.setState({
                queue: queue,
            });
        });
        socket.on('init current playback', (spotifyObject) => {
            this.setState({
                currentPlayback: spotifyObject,
            });
        });

        socket.on('add to queue', (queue) => {
            this.setState({ queue: queue });
            console.log('add to queue');
        });
        socket.on('next', (obj) => {
            this.setState({ 
                queue: obj.queue, 
                currentPlayback: obj.currentPlayback
            });
            console.log('next track');
        })
    }

    handleAddToQueue() {
        if (this.state.selectedItem) {
            socket.emit('add to queue', {
                user: this.state.user,
                spotifyObject: this.state.selectedItem,
            });
        }
    }

    handleSearch(query) {
        spotifyApiClient.search(query, (response) => {
            this.setState({
                tracks: response.tracks.items,
                albums: response.albums.items,
                playlists: response.playlists.items,
            });
        });
    }

    handleSelectItem(item) {
        this.setState({ 
            selectedItem: item
        });
    }

    handleUserConnection(user) {
        sessionStorage.setItem('user', user);
        this.setState({
            user: user,
        });
    }

    render() {
        return (
            <div>
                <Search 
                    onSubmit={(query) => this.handleSearch(query)}
                />

                <Users
                    socket={socket}
                />
                <UserNameModal 
                    socket={socket} 
                    users={this.state.users}  
                    onSubmit={(user) => this.handleUserConnection(user)}
                    show={this.state.user == null}
                />
                
                <Container>
                    <NowPlaying 
                        socket={socket}
                        currentPlayback={this.state.currentPlayback}
                    />
                    <Row>
                        <Col>
                            <AddToQueueButton 
                                onClick={() => this.handleAddToQueue()}
                            />
                        </Col>
                        <Col>
                            <PlayPauseButton 
                                socket={socket}
                            />
                        </Col>
                        <Col>
                            <NextButton 
                                socket={socket}
                            />
                        </Col>
                        <Col>
                            <GetDevices 
                                socket={socket}
                            />
                        </Col>
                    </Row>
                    <Queue 
                        queue={this.state.queue}
                        user={this.state.user}
                        socket={socket}
                    />
                    
                </Container>

                <SearchResults 
                    selectedItem={this.state.selectedItem}
                    tracks={this.state.tracks}
                    albums={this.state.albums}
                    playlists={this.state.playlists}
                    onSelectItem={(item) => this.handleSelectItem(item)}
                />
            </div>
        );
    }
}

export default Spotify;