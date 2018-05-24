import React from 'react'
import { Button, Card, Image, Icon } from 'semantic-ui-react'

const FoodTabContent = () => (
  <Card.Group>
    <Card>
      <Card.Content>
        <Image floated='right' size='mini' src='/media/mapAndAirplaneCoffee.jpg' />
        <Card.Header>
          Restaurant 1
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
    <Card>
      <Card.Content>
        <Image floated='right' size='mini' src='/media/mapAndAirplaneCoffee.jpg' />
        <Card.Header>
          Restaurant 2
        </Card.Header>
        <Card.Meta>
          Rating 2
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
    <Card>
      <Card.Content>
        <Image floated='right' size='mini' src='/media/mapAndAirplaneCoffee.jpg' />
        <Card.Header>
          Restaurant 3
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

export default FoodTabContent;