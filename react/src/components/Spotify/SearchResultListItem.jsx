import React, { Component } from 'react';
import { Row, Col, Image, ListGroup } from 'react-bootstrap';

class SearchResultListItem extends Component {
    getTypeViewValue() {
        switch (this.props.item.type) {
            case 'track':
                return 'Song';
            case 'album':
                return 'Album';
            case 'playlist':
                return 'Playlist';
            default:
                return 'Unknown';
        }
    }

    getImageUrl() {
        switch (this.props.item.type) {
            case 'track':
                if (this.props.item.album.images && this.props.item.album.images.length > 0) {
                    return this.props.item.album.images[this.props.item.album.images.length - 1].url;
                } else {
                    return '';
                }
            case 'album':
            case 'playlist':
                if (this.props.item.images && this.props.item.images.length > 0) {
                    return this.props.item.images[this.props.item.images.length - 1].url;
                } else {
                    return '';
                }
            default:
                return '';
        }
    }

    getArtistsOrUser() {
        switch (this.props.item.type) {
            case 'track':
            case 'album':
                let result = this.props.item.artists[0].name;
                for (let i = 1; i < this.props.item.artists.length; i++) {
                    result += ', ' + this.props.item.artists[i].name;
                }
                return result;
            case 'playlist':
                return this.props.item.owner.display_name;
            default:
                return '';
        }
        
        
    }

    render() {
        return (
            <ListGroup.Item 
                as='li' 
                key={this.props.i} 
                className={(this.props.selectedItem === this.props.item) ? 'active' : ''}
                onClick={() => this.props.onSelectItem(this.props.item)}
            >
                <Row>
                    <Image className='spotify-img' src={this.getImageUrl()} />
                    <Col>
                        <div className='spotify-item-title'>{this.props.item.name}</div>
                        <div className='spotify-item-subtitle'>
                            {this.getTypeViewValue()} • {this.getArtistsOrUser()}
                        </div>
                    </Col>
                </Row>
            </ListGroup.Item>
        );
    }
}

export default SearchResultListItem;