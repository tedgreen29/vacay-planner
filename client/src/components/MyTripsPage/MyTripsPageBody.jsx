import React from 'react';

import { Menu } from 'semantic-ui-react'


class MyTripsPageBody extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedTrip: 1
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
    const trips = {
      1 : 'trip 1',
      2 : 'trip 2',
      3 : 'trip 3'
    }

    return (
      <Menu size='large' fixed='left' vertical style={{marginTop: 50, marginLeft: 40}}>
        {Object.keys(trips).map(tripId => {
          return (
            <Menu.Item
              style={tripId === this.state.selectedTrip ? { color: '#d0021b' } : null}
              onClick={this.updateSelection.bind(null, tripId)}
              key={tripId}
            >
              {trips[tripId]}
            </Menu.Item>
          )
        })}
      </Menu>
    )
  }
}

export default MyTripsPageBody;