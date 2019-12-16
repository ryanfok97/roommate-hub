import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import spotifyApiClient from '../../clients/spotify-api-client';

class GetDevices extends Component {
    constructor(props) {
        super(props);

        this.state = {
            devices: [],
            selectedDevice: null,
        };
    }

    componentDidMount() {
        this.props.socket.on('init device', (deviceId) => {
            this.setState({ selectedDevice: deviceId });
            console.log('Selected device initialized.');
        });
        this.props.socket.on('device change', (deviceId) => {
            this.setState({ selectedDevice: deviceId });
            console.log('Received device change: ' + deviceId);
        });
    }

    handleGetDevices() {
        console.log('devices');
        spotifyApiClient.getDevices((response) => {
            this.setState({ devices: response })
        });
    }

    handleDeviceSelect(deviceId) {
        console.log('select device');
        this.setState({ selectedDevice: deviceId });
        this.props.socket.emit('device change', deviceId);
    }

    render() {
        const devices = this.state.devices.map((device, i) => {
            if (this.state.selectedDevice === device.id) {
                return (
                    <li key={device.id}>
                        <Button variant='success' onClick={() => this.handleDeviceSelect(device.id)}>
                            {device.name}
                        </Button>
                    </li>
                );
            } else {
                return (
                    <li key={i}>
                        <Button onClick={() => this.handleDeviceSelect(device.id)}>
                            {device.name}
                        </Button>
                    </li>
                );
            }
        });

        return (
            <div>
                <Button onClick={() => this.handleGetDevices()}>Get Devices</Button>
                <ul>
                    {devices}
                </ul>
            </div>
        );
    }
}

export default GetDevices;