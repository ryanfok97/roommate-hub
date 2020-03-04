import React, { Component } from 'react';
import { Form, Col, Button } from 'react-bootstrap';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            validated: false,
            query: '',
        };
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({
            query: e.target.value,
        });
        if (this.state.query) {
            this.setState({
                validated: true,
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.query);
    }

    render() {
        return (
            <Form 
                noValidate 
                validated={this.state.validated}
                onSubmit={(e) => this.handleSubmit(e)}
            >
                <Form.Row>
                    <Col>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Search...'
                            value={this.state.query}
                            onChange={(e) => this.handleChange(e)}
                        />
                        <Form.Control.Feedback type='invalid'>Please enter a non-empty query.</Form.Control.Feedback>
                    </Col>
                    <Col>
                        <Button 
                            title='Search'
                            type="submit"
                        >
                            Search
                        </Button>
                    </Col>
                </Form.Row>
            </Form>
        );
    }
}

export default Search;