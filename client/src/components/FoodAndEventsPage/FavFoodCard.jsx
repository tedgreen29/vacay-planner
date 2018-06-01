import React from 'react';
import { Image, List } from 'semantic-ui-react';

const FavFoodCard = (props) => (
  <List.Item>
    <Image avatar src={props.restaurant.image_url} />
    <List.Content>
      <List.Header>{props.restaurant.name}</List.Header>
    </List.Content>
  </List.Item>
);

export default FavFoodCard;
