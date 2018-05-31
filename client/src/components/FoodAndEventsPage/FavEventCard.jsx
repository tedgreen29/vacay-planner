import React from 'react';
import { Button, Card, Image, Icon, Item, Segment } from 'semantic-ui-react';

const FavEventCard = (props) => (
    <Card fluid>
        {props.event.name}
    </Card>
);

export default FavEventCard;
