import React from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import FoodAndEventsPageBody from './FoodAndEventsPageBody.jsx';
import FoodAndEventsSidebar from './FoodAndEventsSidebar.jsx';
import { Tab, Grid } from 'semantic-ui-react';
import $ from 'jquery';

class FoodAndEventsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurantList: [],
      location: 'San Francisco',
      eventsList: []
    };
  }

  componentDidMount() {
    this.getRestaurantsByLocation(this.state.location);
    this.getEventsByLocationAndDate();
  }

  getRestaurantsByLocation(location) {
    console.log('test!!')
    $.ajax({
      type: 'GET',
      url: `/restaurants/${location}`,
      success: result => {
        console.log('result', result);
        this.setState({
          restaurantList: result.businesses
        });    
      }
    });
  }

  getEventsByLocationAndDate() {
    console.log('events test!!')
    $.ajax({
      type: 'GET',
      url: `/events`,
      success: result => {
        console.log('events', result);
        this.setState({
          eventsList: JSON.parse(result)
        });    
      }
    });
  }

  render() {
    return(
      //Column width must add up to 16
      <Grid>
        <Grid.Row>
          <Grid.Column floated="right">
            <NavBar />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={10}>
            <FoodAndEventsPageBody 
              restaurantList={this.state.restaurantList} 
              eventsList={this.state.eventsList}
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <FoodAndEventsSidebar 
              restaurantList={this.state.restaurantList} 
              eventsList={this.state.eventsList}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }  
};

export default FoodAndEventsPage;