import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import spotifyApiClient from '../clients/spotify-api-client';
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

class Spotify extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            selectedItem: null,
            queue: [],
            tracks: [],
            albums: [],
            playlists: [],
            users: [],
            currentPlayback: '',
            user: sessionStorage.getItem('user'),
            connected: false,
        };
    }

    componentDidMount() {
        if (!this.state.connected && this.state.user) {
            this.props.socket.emit('spotify login', this.state.user);
            console.log('attempting login');
        }

        this.props.socket.on('disconnect', () => {
            this.setState({
                connected: false
            });
            console.log('disconnected from socket');
        })

        this.props.socket.on('spotify login', () => {
            this.setState({
                connected: true
            });
            console.log('login successful');
        });

        this.props.socket.on('spotify init users', (users) => {
            this.setState({
                users: users,
            });
            console.log('initialized users');
        });

        this.props.socket.on('spotify init queue', (queue) => {
            this.setState({
                queue: queue,
            });
            console.log('initialized queue');
        });
        this.props.socket.on('spotify init current playback', (spotifyObject) => {
            this.setState({
                currentPlayback: spotifyObject,
            });
            console.log('initialized current playback');
        });

        this.props.socket.on('spotify add to queue', (spotifyObject) => {
            let queueCopy = this.state.queue;
            queueCopy.push(spotifyObject);
            this.setState({
                queue: queueCopy
            });
            console.log(this.state.queue);
            console.log('add to queue');
        });
        this.props.socket.on('spotify remove from queue', (index) => {
            let queueCopy = this.state.queue;
            queueCopy.splice(index, 1);
            this.setState({
                queue: queueCopy
            });
            console.log('remove from queue');
        });
        this.props.socket.on('spotify next', () => {
            this.setState({
                currentPlayback: this.state.queue.shift()
            });
            console.log('next track');
        });
        this.props.socket.on('spotify new user', (userName) => {
            this.state.users.push(userName);
            console.log('new user: ' + userName);
        });
        this.props.socket.on('spotify remove user', (userName) => {
            this.state.users.splice(this.state.users.indexOf(userName), 1);
            console.log('remove user: ' + userName);
        });
    }

    componentWillUnmount() {
        this.props.socket.off('spotify login');
        this.props.socket.off('spotify init users');
        this.props.socket.off('spotify init queue');
        this.props.socket.off('spotify init current playback');
        this.props.socket.off('spotify add to queue');
        this.props.socket.off('spotify remove from queue');
        this.props.socket.off('spotify next');
    }

    handleAddToQueue() {
        if (!this.state.connected) {
            console.error('add to queue failed, not connected to socket');
        } else if (!this.state.selectedItem) {
            console.error('add to queue failed, no item selected');
        } else {
            let queueCopy = this.state.queue;
            const newItem = {
                user: this.state.user,
                spotifyObject: this.state.selectedItem
            }
            queueCopy.push(newItem);
            this.setState({
                queue: queueCopy
            });
            this.props.socket.emit('spotify add to queue', newItem);
            console.log('add to queue');
        }
    }

    handleRemoveFromQueue(index) {
        if (!this.state.connected) {
            console.error('remove from queue failed, not connected to socket');
        } else {
            let queueCopy = this.state.queue;
            queueCopy.splice(index, 1);
            this.setState({
                queue: queueCopy
            });
            this.props.socket.emit('spotify remove from queue', index);
            console.log('remove from queue');
        }
    }

    handleSearch(query) {
        if (!this.state.connected) {
            console.error('search failed, not connected to socket');
        } else {
            spotifyApiClient.search(query, (response) => {
                this.setState({
                    tracks: response.tracks.items,
                    albums: response.albums.items,
                    playlists: response.playlists.items,
                });
            });
            console.log('search');
        }
    }

    handleNext() {
        if (!this.state.connected) {
            console.err('next track failed, not connected to socket');
        } else {
            let queueCopy = this.state.queue;
            queueCopy.shift();
            this.setState({
                queue: queueCopy
            });
            this.props.socket.emit('spotify next');
            console.log('next');
        }
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
                    socket={this.props.socket}
                    users={this.state.users}
                />
                <UserNameModal 
                    socket={this.props.socket} 
                    users={this.state.users}  
                    onSubmit={(user) => this.handleUserConnection(user)}
                    show={this.state.user == null}
                />
                
                <Container>
                    <NowPlaying 
                        socket={this.props.socket}
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
                                socket={this.props.socket}
                            />
                        </Col>
                        <Col>
                            <NextButton 
                                socket={this.props.socket}
                                onClick={() => this.handleNext()}
                            />
                        </Col>
                        <Col>
                            <GetDevices 
                                socket={this.props.socket}
                                connected={this.state.connected}
                            />
                        </Col>
                    </Row>
                    <Queue 
                        queue={this.state.queue}
                        user={this.state.user}
                        socket={this.props.socket}
                        onClick={(i) => this.handleRemoveFromQueue(i)}
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