import React from 'react';
import { Card, Icon, Grid, Form, Button, Segment, Header } from 'semantic-ui-react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, {formatDate, parseDate} from 'react-day-picker/moment';


const LandingPageBody = (props) => (

  <Grid verticalAlign="middle">
    <Grid.Row>
      <Grid.Column style={{ maxWidth: 450}}>
        <Card centered fluid>
          <Card.Content header='Vacation Planner' />
          <Card.Content extra>
            <Form onSubmit={() => {props.history.push('/foodandevents')}}>
              <Header as='h2' color='red' textAlign='center'>
                {' '}Where to?
              </Header>

              <Segment stacked>
                <Form.Input
                onChange={props.handleLocationChange}
                type="text"
                name="location"
                label="City, State Code"/><br />
                Start Date:<br />

                <DayPickerInput
                onDayChange={props.handleStartDayChange}
                formatDate={formatDate}
                parseDate={parseDate}
                placeholder={`${formatDate(new Date())}`}
                />
                <br /><br />
                End Date:<br />

                <DayPickerInput
                onDayChange={props.handleEndDayChange}
                formatDate={formatDate}
                parseDate={parseDate}
                placeholder={`${formatDate(new Date())}`}
                />
                <br /><br />

                <Form.Button content='Submit' fluid size='large' />
              </Segment>
            </Form>
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);
//
//

export default LandingPageBody;