import React from 'react';
import Proptypes from 'prop-types';
import moment from 'moment';
import { Grid } from 'semantic-ui-react';
import SelectTrip from './SelectTrip.jsx';
import EventsList from './EventsList.jsx';
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
        <Grid columns='equal' style={ {marginTop: 10, backgroundColor: 'white'} }>
          <Grid.Column left='true' width={3}>
            <SelectTrip
              selectedTrip = {this.state.selectedTrip}
              onSelect = {this.updateSelection}
            />
          </Grid.Column>
          <Grid.Column width={13}>
            {!this.state.eventsSelected ? <p>Loading....</p> : <EventsList eventsSelected={this.state.eventsSelected}/>}
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default MyTripsPageBody;