import React from 'react';
import { Button, Card, Image, Icon, Input, Segment } from 'semantic-ui-react';

const FoodAndEventsSidebar = () => (
    <Segment>
        <Icon name="calendar" />
        <Icon name="time" />
        <Input focus placeholder="Enter your trip name here" />
        
    </Segment>
)

export default FoodAndEventsSidebar;