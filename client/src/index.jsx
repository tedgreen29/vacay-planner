import React from 'react';
import ReactDOM from 'react-dom';

import LandingPage from './components/LandingPage/LandingPage.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  //write functions

  render() {
    return (
        <LandingPage />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));