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
      eventsList: [],
      foodFavorites: [],
      eventFavorites: [],
      tripName: ""
    };
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.saveTrip = this.saveTrip.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  toggleFavorite(listIndex, listName) {
    if (listName === 'food') {
      let selectedFood = this.state.restaurantList[listIndex];
      let newFoodFavorites = this.state.foodFavorites.filter(foodfav => foodfav.id !== selectedFood.id);
      if (newFoodFavorites.length === this.state.foodFavorites.length) {
        newFoodFavorites.push(this.state.restaurantList[listIndex]);
      }
      this.setState({ foodFavorites: newFoodFavorites });
    } else {
      let selectedEvent = this.state.eventsList[listIndex];
      let newEventFavorites = this.state.eventFavorites.filter(eventfav => eventfav.id !== selectedEvent.id);
      if (newEventFavorites.length === this.state.eventFavorites.length) {
        newEventFavorites.push(this.state.eventsList[listIndex]);
      }
      this.setState({ eventFavorites: newEventFavorites });
    }
  }

  handleNameChange(event) {
    this.setState({tripName: event.target.value});
  }

  saveTrip() {
    var data = {
      user: {email: 'ted.green@test.com'},
      trip: {
        start_date: new Date(),
        end_date: new Date(),
        name: this.state.tripName
      },
      eventList: this.state.eventFavorites.map(event => ({
        name: event.name,
        eventURL: event.url,
        eventImg: event.images[0].url,
        start_date: event.dates.start.dateTime,
        venueName: event._embedded.venues[0].name,
        venueLong: event._embedded.venues[0].location.longitude,
        venueLat: event._embedded.venues[0].location.latitude,
        venueAddress: `${event._embedded.venues[0].address.line1}, ${event._embedded.venues[0].city.name}, ${event._embedded.venues[0].state.stateCode} ${event._embedded.venues[0].postalCode}`
      })),
      restaurantList: this.state.foodFavorites.map(restaurant => ({
        name: restaurant.name,
        yelpURL: restaurant.url,
        review_count: restaurant.review_count,
        rating: restaurant.rating,
        price: restaurant.price,
        restLong: restaurant.coordinates.longitude,
        restLat: restaurant.coordinates.latitude,
        categories: restaurant.categories,
        display_address: restaurant.location.display_address,
        image_url: restaurant.image_url
      }))
    };
    $.post('/trips', data, () => {}, 'json')
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
    return (
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
              foodFavorites={this.state.foodFavorites}
              eventFavorites={this.state.eventFavorites}
              toggleFavorite={this.toggleFavorite}
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <FoodAndEventsSidebar
              foodFavorites={this.state.foodFavorites}
              eventFavorites={this.state.eventFavorites}
              saveTrip={this.saveTrip}
              tripName={this.state.tripName}
              onNameChange={this.handleNameChange}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
};

export default FoodAndEventsPage;