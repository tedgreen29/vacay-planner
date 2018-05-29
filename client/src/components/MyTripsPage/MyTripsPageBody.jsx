import React from 'react';
import { Tab } from 'semantic-ui-react';

const panes = [
{ menuItem: 'Trip 1', render: () => <Tab.Pane>Content 1</Tab.Pane> },
{ menuItem: 'Trip 2', render: () => <Tab.Pane>Content 2</Tab.Pane> },
{ menuItem: 'Trip 3', render: () => <Tab.Pane>Content 3</Tab.Pane> },
]


const MyTripsPageBody = () => 
  <Tab 
    menu={{ fluid: true, vertical: true, tabular: true }} 
    panes={panes} 
  />
 


export default MyTripsPageBody;