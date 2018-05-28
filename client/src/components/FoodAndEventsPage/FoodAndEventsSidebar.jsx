import React from 'react';
import { Button, Card, Image, Icon, Input, Segment } from 'semantic-ui-react';

const FoodAndEventsSidebar = () => (
    <Segment>
        <Input focus placeholder="Enter your trip name here" /><br />
        <Icon name="calendar" />
        <Icon name="time" />
        
    </Segment>
)

export default FoodAndEventsSidebar;