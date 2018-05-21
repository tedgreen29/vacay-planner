import React from 'react';
import ReactDOM from 'react-dom';

import ExampleComponent from './components/ExampleComponent.jsx';

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
        <ExampleComponent />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));