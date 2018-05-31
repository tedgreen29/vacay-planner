import React from 'react';
import Proptypes from 'prop-types';
import { Menu } from 'semantic-ui-react'

function SelectTrip(props) {
  const trips = {
    '1' : 'trip 1',
    '2' : 'trip 2',
    '3' : 'trip 3'
  };
  return (
    <Menu size='large' fixed='left' vertical style={{marginTop: 50}}>
      {Object.keys(trips).map(tripId => {
        return (
          <Menu.Item
            style={tripId === props.selectedTrip ? { color: '#d0021b' } : null}
            onClick={props.onSelect.bind(null, tripId)}
            key={tripId}
          >
            {trips[tripId]}
          </Menu.Item>
        )
      })}
    </Menu>
  )  
}

SelectTrip.propTypes = {
  selectedTrip: Proptypes.string.isRequired,
  onSelect: Proptypes.func.isRequired
};


export default SelectTrip;