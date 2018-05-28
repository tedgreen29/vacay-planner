import React from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import FoodAndEventsPageBody from './FoodAndEventsPageBody.jsx';
import FoodAndEventsSidebar from './FoodAndEventsSidebar.jsx';
import { Tab, Grid } from 'semantic-ui-react';

const FoodAndEventsPage = (props) => (
  //Column width must add up to 16
  <Grid>
    <Grid.Row>
      <Grid.Column floated="right">
        <NavBar />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column width={10}>
        <FoodAndEventsPageBody />
      </Grid.Column>
      <Grid.Column width={6}>
        <FoodAndEventsSidebar />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default FoodAndEventsPage;