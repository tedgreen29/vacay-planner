import React from 'react';
import ReactDOM from 'react-dom';
import FoodAndEventsPage from './components/FoodAndEventsPage/FoodAndEventsPage.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  //write functions

  render() {


    //temporary routing (will change to React Router)
    var url = new URL(window.location.href);
    var page = url.searchParams.get("page");

    return page === "foodandevents" ? <FoodAndEventsPage /> : <LandingPage />;

  }
}

ReactDOM.render(<App />, document.getElementById('app'));