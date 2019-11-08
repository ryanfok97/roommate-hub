import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

import Spotify from './pages/Spotify';
import Calendar from './pages/Calendar';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path='/spotify'>
                        <Spotify />
                    </Route>
                    <Route path='/calendar'>
                        <Calendar />
                    </Route>
                    <Route path='/'>
                        <Dashboard />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
