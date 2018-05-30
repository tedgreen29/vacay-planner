import React from 'react';
import FoodTabContent from './FoodTabContent.jsx';
import EventsTabContent from './EventsTabContent.jsx';
import FoodAndEventsSidebar from './FoodAndEventsSidebar.jsx'
import { Tab, Grid } from 'semantic-ui-react';
import $ from 'jquery';


class FoodAndEventsPageBody extends React.Component {

  render() {
    const panes = [
      {
        menuItem: 'Food', render: () =>
          <Tab.Pane>
            <FoodTabContent
              restaurantList={this.props.restaurantList}
              toggleFavorite={this.props.toggleFavorite}
            />
          </Tab.Pane>
      },
      {
        menuItem: 'Events', render: () =>
          <Tab.Pane>
            <EventsTabContent
              eventsList={this.props.eventsList}
              toggleFavorite={this.props.toggleFavorite}
            />
          </Tab.Pane>
      }
    ]
    return <Tab panes={panes} />;
  }
}

export default FoodAndEventsPageBody;
