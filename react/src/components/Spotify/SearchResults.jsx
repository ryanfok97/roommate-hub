import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import SearchResultList from './SearchResultList';

class SearchResults extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <SearchResultList
                            header='Tracks'
                            selectedItem={this.props.selectedItem}
                            list={this.props.tracks}
                            onSelectItem={(item) => this.props.onSelectItem(item)}
                        />
                        <SearchResultList
                            header='Albums'
                            selectedItem={this.props.selectedItem}
                            list={this.props.albums}
                            onSelectItem={(item) => this.props.onSelectItem(item)}
                        />
                        <SearchResultList
                            header='Playlists'
                            selectedItem={this.props.selectedItem}
                            list={this.props.playlists}
                            onSelectItem={(item) => this.props.onSelectItem(item)}
                        />
                    </Row>
                </Container>
            </div>
        );
    }
}

export default SearchResults;