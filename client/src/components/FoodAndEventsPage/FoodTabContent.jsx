import React from 'react'
import { Button, Card, Image, Icon } from 'semantic-ui-react'

const FoodTabContent = (props) => (
  <Card.Group>
    {props.restaurantList.map((restaurant) => {
      return (
      <Card fluid key={restaurant.id}>
        <Card.Content>
          <Image floated='right' size='small' src={restaurant.image_url} />
          <Card.Header>
            { restaurant.name }
          </Card.Header>
          <Card.Meta>
          Rating: { restaurant.rating } Stars
          </Card.Meta>
          <Card.Description>
            {restaurant.display_address}
          </Card.Description>
          <Card.Description>
            {restaurant.categories.map(category => {
                return category.title
            }).join(', ')} 
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='red'><Icon name="empty heart" /></Button>
          </div>
        </Card.Content>
      </Card>
      )
    })}
  </Card.Group>
)

export default FoodTabContent;
