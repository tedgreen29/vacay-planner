import React from 'react';
import FoodTabContent from './FoodTabContent.jsx';
import EventsTabContent from './EventsTabContent.jsx';
import { Tab } from 'semantic-ui-react';
import $ from 'jquery';


class FoodAndEventsPageBody extends React.Component {
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
          eventsList: result
        });    
      }
    });
  }

  render() {
    const panes = [
      { menuItem: 'Restaurants', render: () => 
        <Tab.Pane>
          <FoodTabContent 
            restaurantList = {this.state.restaurantList}
          />
        </Tab.Pane> 
      },
      { menuItem: 'Events', render: () => 
        <Tab.Pane>
          <EventsTabContent 
             eventsList = {this.state.eventsList}
          />
        </Tab.Pane> 
      }
    ]
    return (
      <div>
        <Tab panes={panes} />
      </div>
    );
  }
}

export default FoodAndEventsPageBody;
