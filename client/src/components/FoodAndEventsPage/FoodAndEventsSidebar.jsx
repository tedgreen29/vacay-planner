import React from 'react';
import { Button, Card, Image, Icon, Input, Segment, Tab, Item } from 'semantic-ui-react';

const FoodAndEventsSidebar = (props) => {
    const panes = [
        {
            menuItem: 'Favorites', render: () => (
                <Tab.Pane>
                    <Input focus placeholder="Enter your trip name here" /><br /><br />
                    <Card.Group>
                        {props.favorites.map((fav, index) => {
                            return (
                            <Card fluid key={index}>
                                {fav.name}
                            </Card>
                            );
                        })}
                    </Card.Group>
                </Tab.Pane>
            )
        }
    ];
    return <Tab panes={panes} />;
}

export default FoodAndEventsSidebar;