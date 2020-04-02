import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/calendar'>
            <Calendar />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
