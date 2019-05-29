import React, { Component } from 'react';
import { HashRouter as Router, Route,Switch } from 'react-router-dom'


import Navbar from './components/Navbar'
import Home from './components/Home'
import Patient from './components/Patient'
import Patient_APP from './components/Patient_APP'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Rank from './components/Rank'
import PersonData from './components/PersonData'
import test from './components/test'

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          
          <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/rank" component={Rank} />
          <Route path="/persondata" component={PersonData} />
          <Route path="/test" component={test} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/patient/:id"  component={Patient} />
          <Route path="/patientid/:id"  component={Patient_APP} />
            
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
