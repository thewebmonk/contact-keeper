import React, {Fragment} from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register'
import Login from './components/auth/Login'

import ContactState from './context/contact/ContactState'
import AuthState from "./context/auth/AuthState";

import './App.css';

function App() {
  return (
    <AuthState>
        <ContactState>
          <Router>
                <Fragment>
                <Navbar/>
                  <div className="container">
                    <Switch>
                        <Route exact path="/" component={Home}></Route>
                        <Route exact path="/about" component={About}></Route>
                        <Route exact path="/register" component={Register}></Route>
                        <Route exact path="/login" component={Login}></Route>
                    </Switch>
                  </div>
              </Fragment>
            </Router>
      </ContactState>
    </AuthState>
    
  );
}

export default App;
