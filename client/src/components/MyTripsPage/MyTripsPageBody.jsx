import React from 'react';

import { Menu } from 'semantic-ui-react'


class MyTripsPageBody extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedTrip: 1
    }
  }

  render() {
    const trips = {
      1 : 'trip 1',
      2 : 'trip 2',
      3 : 'trip 3'
    }

    return (
      <Menu size='large' fixed='left' vertical style={{marginTop: 50, marginLeft: 40}}>
        {Object.keys(trips).map(trip => {
          console.log(trip);
          return (
            <Menu.Item>
              {trips[trip]}
            </Menu.Item>
          )
        })}
      </Menu>
    )
  }
}

export default MyTripsPageBody;