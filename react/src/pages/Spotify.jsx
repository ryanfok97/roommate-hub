import React, { Component } from 'react';
import { Form, FormControl, Button, Col, ListGroup, Image, Container, Row } from 'react-bootstrap';
import SpotifyApiClient from '../clients/spotify-api-client';

class Spotify extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            query: '',
            tracks: [],
            albums: [],
            playlists: [],
            selectedListItem: {
                type: '', // track, album, or playlist
                id: -1
            }
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
    }

    handleSearch(e) {
        e.preventDefault();
        SpotifyApiClient.search(e.target.query.value, (response) => {
            this.setState({
                tracks: response.tracks.items,
                albums: response.albums.items,
                playlists: response.playlists.items,
            });
            console.log(this.state);
        });
    }

    onItemClick = (type, id) => e => {
        this.setState({ 
            selectedListItem: {
                type: type,
                id: id
            }
        });
    }

    renderSearchResults() {
        let trackComponents = this.renderTracks();
        let albumComponents = this.renderAlbums();
        let playlistComponents = this.renderPlaylists();
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <div>Tracks</div>
                            <ListGroup as='ul'>
                                {trackComponents}
                            </ListGroup>
                        </Col>
                        <Col>
                            <div>Albums</div>
                            <ListGroup as='ul'>
                                {albumComponents}
                            </ListGroup>
                        </Col>
                        <Col>
                            <div>Playlists</div>
                            <ListGroup as='ul'>
                                {playlistComponents}
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    renderTracks() {
        return this.state.tracks.map((track, i) => (
            <ListGroup.Item 
                as='li' 
                key={i} 
                className={(this.state.selectedListItem.type === track.type
                    && this.state.selectedListItem.id === i) ? 'active' : ''}
                onClick={this.onItemClick(track.type, i)}>
                <Row>
                    <Image className='spotify-img' src={track.album.images[track.album.images.length - 1].url} />
                    <Col>
                        <div className='spotify-item-title'>{track.name}</div>
                        <div className='spotify-item-subtitle'>
                            Song • {this.getArtists(track.artists)}
                        </div>
                    </Col>
                </Row>
            </ListGroup.Item>
        ));
    }

    renderAlbums() {
        return this.state.albums.map((album, i) => (
            <ListGroup.Item 
                as='li' 
                key={i} 
                className={(this.state.selectedListItem.type === album.type
                    && this.state.selectedListItem.id === i) ? 'active' : ''}
                onClick={this.onItemClick(album.type, i)}>
                <Row>
                    <Image className='spotify-img' src={album.images[album.images.length - 1].url} />
                    <Col>
                        <div className='spotify-item-title'>{album.name}</div>
                        <div className='spotify-item-subtitle'>
                            Album • {this.getArtists(album.artists)}
                        </div>
                    </Col>
                </Row>
            </ListGroup.Item>
        ));
    }

    renderPlaylists() {
        return this.state.playlists.map((playlist, i) => (
            <ListGroup.Item 
                as='li' 
                key={i} 
                className={(this.state.selectedListItem.type === playlist.type
                    && this.state.selectedListItem.id === i) ? 'active' : ''}
                onClick={this.onItemClick(playlist.type, i)}>
                <Row>
                    <Image className='spotify-img' src={playlist.images[playlist.images.length - 1].url} />
                    <Col>
                        <div className='spotify-item-title'>{playlist.name}</div>
                        <div className='spotify-item-subtitle'>
                            Playlist • {playlist.owner.display_name}
                        </div>
                    </Col>
                </Row>
            </ListGroup.Item>
        ));
    }

    getArtists(artists) {
        let result = artists[0].name;
        for (let i = 1; i < artists.length; i++) {
            result += ', ' + artists[i].name;
        }
        return result;
    }

    render() {
        let searchResults = this.renderSearchResults();
        return (
            <div>
                <Form onSubmit={this.handleSearch}>
                    <Form.Row>
                        <Col>
                            <FormControl 
                                name='query'
                                placeholder='Search songs, albums, or playlists...' />
                        </Col>
                        <Col>
                            <Button 
                                title='Search'
                                type="submit">Search
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>

                {searchResults}
            </div>
        );
    }
}

export default Spotify;