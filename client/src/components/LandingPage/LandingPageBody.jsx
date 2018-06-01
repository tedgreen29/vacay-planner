import React from 'react';
import { Card, Icon, Grid } from 'semantic-ui-react';

const LandingPageBody = (props) => (
  <Grid verticalAlign="middle">
    <Grid.Row>
      <Grid.Column>
        <Card centered>
          <Card.Content header='Vacation Planner' />
          <Card.Content extra>
            <form>
              Where to? <br />
              <input type="text" name="city" value='San Francisco, CA'/><br />
              Start Date:<br />
              <input type="date" name="startDate" value={props.startDate} onChange={props.onStartChange}/><br />
              End Date:<br />
              <input type="date" name="endDate" value={props.endDate} onChange={props.onEndChange}/><br />
              <input type="text" name="page" value="foodandevents" readOnly hidden /> {/*Temporary routing*/}
              <button onClick={() => props.history.push('/foodandevents')}>Submit</button>
            </form>
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default LandingPageBody;