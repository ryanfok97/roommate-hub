import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Dropdown, DropdownButton, Row } from 'react-bootstrap';

import InOutButton from '../components/InOutButton';
import AddRoommateModal from '../components/AddRoommateModal';
import RemoveRoommateModal from '../components/RemoveRoommateModal';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            names: ['Brandon', 'Kadison', 'Ryan', 'Steven'],
            addModalShow: false,
            addModalName: ''
        };

        this.handleChangeAddRoommate = this.handleChangeAddRoommate.bind(this);
        this.handleAddRoommate = this.handleAddRoommate.bind(this);
        this.handleRemoveRoommate = this.handleRemoveRoommate.bind(this);
    }

    handleChangeAddRoommate(e) {
        this.setState({ addModalName: e.target.value });
    }

    handleAddRoommate(e) {
        e.preventDefault();
        console.log("Roommate added: " + this.state.addModalName);
        var newNames = [...this.state.names, this.state.addModalName].sort();

        this.setState({
            names: newNames,
            addModalName: '',
            addModalShow: false,
            removeModalName: '',
            removeModalShow: false
        });
    }

    handleRemoveRoommate(e) {
        var newNames = [...this.state.names];
        newNames.splice(newNames.indexOf(this.state.removeModalName), 1);
        console.log("Roommate removed: " + this.state.removeModalName);

        this.setState({
            names: newNames,
            removeModalName: '',
            removeModalShow: false
        });
    }

    handleShowRemoveModal(name, e) {
        // console.log(name);
        this.setState({
            removeModalName: name,
            removeModalShow: true
        });
    }

    render() {
        // TODO: make this configurable -- number of roommates per row? 4?
        const inOutButtons = this.state.names.map((name) => 
            <InOutButton key={name} name={name} 
                    handleShowRemoveModal={(name, e) => this.handleShowRemoveModal(name, e)}
            />
        );
        // TODO: make sticky notes possible
        return (
            <div className='app'>
                <h1>Dashboard</h1>
                <DropdownButton alignRight id='dashboard-add-dropdown' 
                                title='+' className='dashboard-add-dropdown'
                >
                    <Dropdown.Item eventKey='1' onClick={() => this.setState({addModalShow: true})}>
                        Add Roommate
                    </Dropdown.Item>
                    <Dropdown.Item eventKey='2' onClick={() => this.setState({})}>
                        Add Note
                    </Dropdown.Item>
                </DropdownButton>
                <Container fluid>
                    <Row>
                        {inOutButtons}
                    </Row>
                </Container>
                <Button as={Link} to='/calendar'>Calendar</Button>

                <AddRoommateModal 
                    show={this.state.addModalShow}
                    onHide={() => this.setState({addModalShow: false})}
                    addModalName={this.state.addModalName}
                    onChangeAddRoommate={this.handleChangeAddRoommate}
                    onAddRoommate={this.handleAddRoommate}
                />
                <RemoveRoommateModal
                    show={this.state.removeModalShow}
                    onHide={() => this.setState({removeModalShow: false})}
                    name={this.state.removeModalName}
                    onRemoveRoommate={this.handleRemoveRoommate}
                />
            </div>
        );
    }
}

export default Dashboard;
