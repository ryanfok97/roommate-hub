import React, { Component } from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import SearchResultListItem from './SearchResultListItem';

class SearchResultList extends Component {
    render() {
        const resultList = this.props.list.map((item, i) => (
            <SearchResultListItem
                selectedItem={this.props.selectedItem}
                item={item}
                key={i}
                onSelectItem={(item) => this.props.onSelectItem(item)}
            />
        ));
        return (
            <Col>
                <div>{this.props.header}</div>
                <ListGroup as='ul'>
                    {resultList}
                </ListGroup>
            </Col>
        );
    }
}

export default SearchResultList;