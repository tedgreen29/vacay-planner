import React from 'react';
import { Card, Icon, Grid } from 'semantic-ui-react';

const LandingPageBody = (props) => (
/*  <div>

  </div> className="ui container center aligned"*/
  <Grid verticalAlign="middle">
    <Grid.Row>
      <Grid.Column>
        <Card centered>
          <Card.Content header='Vacation Planner' />
          <Card.Content extra>
            <form>
              Where to? <br />
              <input type="text" name="city" /><br />
              Start Date:<br />
              <input type="text" name="startDate" /><br />
              End Date:<br />
              <input type="text" name="endDate" /><br />
              <input type="submit" />
            </form>
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default LandingPageBody;