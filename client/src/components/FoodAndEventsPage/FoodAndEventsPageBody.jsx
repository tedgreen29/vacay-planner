import React from 'react';
import FoodTabContent from './FoodTabContent.jsx';
import EventsTabContent from './EventsTabContent.jsx';
import FoodAndEventsSidebar from './FoodAndEventsSidebar.jsx'
import { Tab, Grid } from 'semantic-ui-react';
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
          eventsList: JSON.parse(result)
        });    
      }
    });
  }

  render() {
    const panes = [
      { menuItem: 'Food', render: () =>
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
    return <Tab panes={panes} />;
  }
}

export default FoodAndEventsPageBody;
