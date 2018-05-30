import React from 'react';
import Proptypes from 'prop-types';
import { Menu } from 'semantic-ui-react'
import SelectTrip from './SelectTrip.jsx';
import $ from 'jquery';

class MyTripsPageBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTrip: '1',
      eventsSelected: [],
      restaurantsSelected: []
    }
    this.updateSelection = this.updateSelection.bind(this);
  }
  
  componentDidMount() {
    this.updateSelection(this.state.selectedTrip);
  }
  
  updateSelection(tripId) {
    this.setState(() => {
      return {
        selectedTrip: tripId
      }
    })
    this.getTripDetails(tripId);
  }

  getTripDetails(tripId) {
    $.ajax({
      type: 'GET',
      url: '/trips',
      success: result => {
        console.log(result)
        this.setState({
          eventsSelected: JSON.parse(result)[0].events,
          restaurantsSelected: JSON.parse(result)[0].restaurants
        })
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