import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import Spotify from './pages/Spotify';
import Calendar from './pages/Calendar';
import Dashboard from './pages/Dashboard';
import socketIOClient from "socket.io-client";
import './App.css';

const endpoint = "http://192.168.1.22:3001";
const socket = socketIOClient(endpoint);

// socket.on('disconnect', () => {
//     console.log('disconnected from socket');

//     connected = false;
//     // reconnectInterval = setInterval(handleReconnect(), 5000)
// });

// const handleReconnect = () => {
//     socket.connect();
// }

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path='/spotify'>
                        <Spotify socket={socket} />
                    </Route>
                    <Route path='/calendar'>
                        <Calendar />
                    </Route>
                    <Route path='/'>
                        <Dashboard socket={socket} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
