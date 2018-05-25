import React from 'react'
import { Button, Card, Image, Icon } from 'semantic-ui-react'

const EventsTabContent = () => (
  <Card.Group>
    <Card fluid>
      <Card.Content>
        <Image floated='right' size='mini' src='/media/mapAndAirplaneCoffee.jpg' />
        <Card.Header>
          Event 1
        </Card.Header>
        <Card.Meta>
          Rating 1
        </Card.Meta>
        <Card.Description>
          Description 1 <strong>Category 1</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='red'><Icon name="empty heart" /></Button>
        </div>
      </Card.Content>
    </Card>
    <Card fluid>
      <Card.Content>
        <Image floated='right' size='mini' src='/media/mapAndAirplaneCoffee.jpg' />
        <Card.Header>
          Event 2
        </Card.Header>
        <Card.Meta>
          Rating 2 fluid
        </Card.Meta>
        <Card.Description>
          Description 2 <strong>Category 2</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='red'><Icon name="empty heart" /></Button>
        </div>
      </Card.Content>
    </Card>
    <Card fluid>
      <Card.Content>
        <Image floated='right' size='mini' src='/media/mapAndAirplaneCoffee.jpg' />
        <Card.Header>
          Event 3
        </Card.Header>
        <Card.Meta>
          Rating 3
        </Card.Meta>
        <Card.Description>
          Description 3 xxxxxxxx xxxxxxxx xxxxxxxx <strong>Category 3</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='red'><Icon name="empty heart" /></Button>
        </div>
      </Card.Content>
    </Card>
  </Card.Group>
)

export default EventsTabContent;