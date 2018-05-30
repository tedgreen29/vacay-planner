import React from 'react';
import Proptypes from 'prop-types';
import { Menu } from 'semantic-ui-react'
import SelectTrip from './SelectTrip.jsx';

class MyTripsPageBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTrip: '1'
    }
    this.updateSelection = this.updateSelection.bind(this);
  }

  updateSelection(tripId) {
    this.setState(() => {
      return {
        selectedTrip: tripId
      }
    })
  }

  render() {
    return (
      <div>
        <SelectTrip
          selectedTrip = {this.state.selectedTrip}
          onSelect = {this.updateSelection}
        />
      </div>
    )
  }
}

export default MyTripsPageBody;