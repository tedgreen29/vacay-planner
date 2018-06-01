import React from 'react';
import { Image, List } from 'semantic-ui-react';

const FavEventCard = (props) => (
  <List.Item>
    <Image avatar src={props.event.images[0].url} />
    <List.Content>
        <List.Header>{props.event.name}</List.Header>
    </List.Content>
  </List.Item>
);

export default FavEventCard;

