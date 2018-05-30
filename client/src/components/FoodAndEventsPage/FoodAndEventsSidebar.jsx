import React from 'react';
import { Button, Card, Image, Icon, Input, Segment, Tab } from 'semantic-ui-react';

const FoodAndEventsSidebar = () => {
    const panes = [
        { menuItem: 'Favorites', render: () => (
            <Tab.Pane>
                <Input focus placeholder="Enter your trip name here" /><br />
            </Tab.Pane> 
            )
        }
    ];
    return <Tab panes={panes} />;
}

export default FoodAndEventsSidebar;