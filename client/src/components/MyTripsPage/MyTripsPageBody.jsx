import React from 'react';
import Proptypes from 'prop-types';
import moment from 'moment';
import { Grid,  Accordion, Icon } from 'semantic-ui-react';
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

  handleClick(e, titleProps) {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
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
    const { activeIndex } = this.state
    return (
      <div> 
        <Grid columns='equal' style={ { marginTop: 50, backgroundColor: 'white'} }>
          <Grid.Column floated='left' width={3}>
            <SelectTrip
              selectedTrip = {this.state.selectedTrip}
              onSelect = {this.updateSelection}
            />
          </Grid.Column>
          <Grid.Column floated='right' width={13}>
            <Accordion fluid styled>
              <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick.bind(this)}>
                <Icon name='dropdown' />
                Saved Events
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <p> </p>
            {!this.state.eventsSelected ? <p>Loading....</p> : <EventsList eventsSelected={this.state.eventsSelected}/>}
              </Accordion.Content>
              <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick.bind(this)}>
                <Icon name='dropdown' />
                Saved Restaurants
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 1}>
                <p> </p>
                Restaurant List
              </Accordion.Content>
            </Accordion>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default MyTripsPageBody;