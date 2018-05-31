import React from 'react';
import ReactDOM from 'react-dom';
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

    };
  }

  //write functions
  testFunc() {
    console.log("Why, hello there?")
  }

  render() {
    return (
      <Router>
        <div className='container'>
          <Route exact path='/' component={LandingPage} />
          <Route path='/login' component={LoginPage} testFunc={this.testFunc} />
          <Route path='/signup' component={SignUpPage} />
          <Route path='/foodandevents' component={FoodAndEventsPage} />
          <Route path='/mytrips' component={MyTripsPage} />
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));