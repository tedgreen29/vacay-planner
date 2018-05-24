import React from 'react';
import FoodTabContent from './FoodTabContent.jsx';
import EventsTabContent from './EventsTabContent.jsx';
import { Tab } from 'semantic-ui-react';

const panes = [
  { menuItem: 'Food', render: () => <Tab.Pane><FoodTabContent /></Tab.Pane> },
  { menuItem: 'Events', render: () => <Tab.Pane><EventsTabContent /></Tab.Pane> }
]

const FoodAndEventsPageBody = () => (
  <Tab panes={panes} />
)

export default FoodAndEventsPageBody