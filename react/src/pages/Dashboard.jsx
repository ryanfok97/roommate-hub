import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import AddRoommateModal from '../components/AddRoommateModal';
import RemoveRoommateModal from '../components/RemoveRoommateModal';
import StickyNoteWall from '../components/StickyNoteWall';
import InOutButtons from '../components/InOutButtons';
import socketIOClient from "socket.io-client";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            roommates: [
                {
                    name: 'Brandon',
                    value: 1
                },
                {
                    name: 'Kadison',
                    value: 1
                },
                {
                    name: 'Ryan',
                    value: 1
                },
                {
                    name: 'Steven',
                    value: 1
                }
            ],
            addModalShow: false,
            addModalName: ''
        };

        this.handleChangeAddRoommateModal = this.handleChangeAddRoommateModal.bind(this);
        this.handleAddRoommate = this.handleAddRoommate.bind(this);
        this.handleRemoveRoommate = this.handleRemoveRoommate.bind(this);
    }

    componentDidMount() {
        this.props.socket.on('dashboard login', () => {
            console.log('dashboard login successful');
        });

        this.props.socket.on('roommates init', (roommates) => {
            this.setState({
                roommates: roommates
            });
            console.log('initialized roommates');
        });

        this.props.socket.emit('dashboard login');
        console.log('attempting dashboard login');

        this.props.socket.on('roommates add', (newRoommate) => {
            let newRoommates = [...this.state.roommates, newRoommate].sort((a, b) => this.compareRoommates(a, b));

            this.setState({
                roommates: newRoommates
            });
        });

        this.props.socket.on('roommates remove', (index) => {
            let newRoommates = [...this.state.roommates];
            newRoommates.splice(index, 1);
            this.setState({
                roommates: newRoommates
            });
        });

        this.props.socket.on('roommates in out button change', ({index, value}) => {
            let newRoommates = [...this.state.roommates];
            newRoommates[index].value = value;
            this.setState({
                roommates: newRoommates
            });
        });
    }

    handleChangeAddRoommateModal(e) {
        this.setState({ addModalName: e.target.value });
    }

    handleAddRoommate(e) {
        e.preventDefault();
        // console.log("Roommate added: " + this.state.addModalName);
        // capitalize first letter
        var newRoommate = {
            name: this.state.addModalName.substr(0, 1).toUpperCase()
                                    + this.state.addModalName.substr(1),
            value: 1
        };
        var newRoommates = [...this.state.roommates, newRoommate].sort((a, b) => this.compareRoommates(a, b));

        this.setState({
            roommates: newRoommates,
            addModalName: '',
            addModalShow: false,
            removeModalName: '',
            removeModalShow: false,
            removeModalIndex: -1,
        });

        this.props.socket.emit('roommates add', newRoommate);
    }

    handleRemoveRoommate(e) {
        var newRoommates = [...this.state.roommates];
        newRoommates.splice(this.state.removeModalIndex, 1);
        console.log("Roommate removed: " + this.state.removeModalName);

        this.props.socket.emit('roommates remove', this.state.removeModalIndex);

        this.setState({
            roommates: newRoommates,
            removeModalName: '',
            removeModalShow: false,
            removeModalIndex: -1,
        });

    }

    handleShowRemoveModal(i, name, e) {
        // console.log(name);
        this.setState({
            removeModalName: name,
            removeModalShow: true,
            removeModalIndex: i,
        });
    }

    handleInOutButtonChange(index, value) {
        let newRoommates = [...this.state.roommates];
        newRoommates[index].value = value;
        this.setState({
            roommates: newRoommates
        });
        this.props.socket.emit('roommates in out button change', {
            index: index,
            value: value
        });
    }

    compareRoommates(a, b) {
        if (a.name < b.name) {
            return -1;
        } else if (a.name > b.name) {
            return 1;
        } else {
            return 0;
        }
    }

    render() {
        return (
            <div className='app'>
                <h1 className='text-center m-0'>Dashboard</h1>

                <InOutButtons
                    roommates={this.state.roommates} 
                    handleShowAddModal={() => this.setState({addModalShow: true})}
                    handleShowRemoveModal={(name, e) => this.handleShowRemoveModal(name, e)}
                    handleChange={(index, value) => this.handleInOutButtonChange(index, value)}               />
                <StickyNoteWall 
                    socket={this.props.socket} />

                <Button as={Link} to='/calendar'>Calendar</Button>

                <AddRoommateModal 
                    show={this.state.addModalShow}
                    onHide={() => this.setState({addModalShow: false})}
                    addModalName={this.state.addModalName}
                    onChangeAddRoommate={this.handleChangeAddRoommateModal}
                    onAddRoommate={this.handleAddRoommate}
                />
                <RemoveRoommateModal
                    show={this.state.removeModalShow}
                    onHide={() => this.setState({removeModalShow: false})}
                    name={this.state.removeModalName}
                    index={this.state.removeModalIndex}
                    onRemoveRoommate={this.handleRemoveRoommate}
                />
            </div>
        );
    }
}

export default Dashboard;
