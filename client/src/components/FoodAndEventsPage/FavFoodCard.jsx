import React from 'react';
import { Button, Card, Image, Icon, Item, Segment } from 'semantic-ui-react';

const FavFoodCard = (props) => (
    <Card fluid>
        {props.restaurant.name}
    </Card>
);

export default FavFoodCard;
