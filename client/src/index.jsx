import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
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
      user: null,
      location: '',
      startDate: new Date(),
      endDate: new Date()
    };
    this.loginUser = this.loginUser.bind(this);
    this.signUpUser = this.signUpUser.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleStartDayChange = this.handleStartDayChange.bind(this);
    this.handleEndDayChange = this.handleEndDayChange.bind(this);
  }

  //write functions

  loginUser(email, password, history) {
    console.log('email: ', email);
    console.log('password: ', password);

    $.ajax({
      url: '/login',
      method: 'POST',
      data: {email: email, password: password},
      success: (data) => {
        this.setState({ user: data })
        console.log('here is the data for user: ', data)
        history.push('/')
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  signUpUser(email, password) {
    console.log('email: ', email);
    console.log('password: ', password);

    $.ajax({
      url: '/signup',
      method: 'POST',
      data: {email: email, password: password},
      success: (data) => {
        this.setState({ user: data })
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  handleLocationChange(e) {
    this.setState({
      location: e.target.value
    })
  }

  handleStartDayChange(day) {
    this.setState({ startDate: day });
  }

  handleEndDayChange(day) {
    this.setState({ endDate: day });
  }



  render() {
    return (
      <Router>
        <div className='container'>
          <Route exact path='/' render={(props) => {
            return (
              <LandingPage handleLocationChange={this.handleLocationChange} handleStartDayChange={this.handleStartDayChange} handleEndDayChange={this.handleEndDayChange} {...props} />
            )} }/>
          <Route path='/login' render={(props) => {
            return (
              <LoginPage loginUser={this.loginUser} {...props} />
            )} }/>
          <Route path='/signup' render={(props) => {
            return (
              <SignUpPage signUpUser={this.signUpUser} {...props} />
            )} }/>
          <Route path='/foodandevents' render={(props) => {
            return (
              <FoodAndEventsPage inputLocation={this.state.location} startDate={this.state.startDate} endDate={this.state.endDate} {...props} />
            )} }/>
          <Route path='/mytrips' component={MyTripsPage} />
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));