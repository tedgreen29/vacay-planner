import React from 'react';
import ReactDOM from 'react-dom';
import { $ } from 'jquery';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import FoodAndEventsPage from './components/FoodAndEventsPage/FoodAndEventsPage.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import SignUpPage from './components/SignUpPage/SignUpPage.jsx';
import LoginPage from './components/LoginPage/LoginPage.jsx';
import MyTripsPage from './components/MyTripsPage/MyTripsPage.jsx';

const Router = BrowserRouter;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.loginUser = this.loginUser.bind(this);
  }

  //write functions

  loginUser(username, password) {
    console.log('username: ', username);
    console.log('password: ', password);
    // let formData = {
    //   username: getFieldValue
    // }
    // $.ajax({
    //   url: '/login',
    //   method: 'POST',
    //   data: {username: username, password: password},
    //   success: function(data) {
    //     console.log("success!");
    //   },
    //   error: function(err) {
    //     console.log(err);
    //   }
    // })
    // AJAX w. username, password
    // // in server:
    //   server.createSesion(username password)
    //   server.verify
  }



  render() {
    return (
      <Router>
        <div className='container'>
          <Route exact path='/' component={LandingPage} />
          <Route path='/login' render={(props) => {
            return (
              <LoginPage loginUser={this.loginUser} {...props} />
            )} }/>
          <Route path='/signup' component={SignUpPage} />
          <Route path='/foodandevents' component={FoodAndEventsPage} />
          <Route path='/mytrips' component={MyTripsPage} />
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));