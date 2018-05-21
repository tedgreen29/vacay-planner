import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Component1 from './components/Component1.jsx';
import Component2 from './components/Component2.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  //write functions

  render() {
    return (
      <div>

      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));