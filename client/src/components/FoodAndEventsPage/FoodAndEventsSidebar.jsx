import React from 'react';
import { Button, Card, Image, Icon, Input, Segment, Tab, Item, Divider } from 'semantic-ui-react';

import FavFoodCard from './FavFoodCard.jsx';
import FavEventCard from './FavEventCard.jsx';

const FoodAndEventsSidebar = (props) => {
    const panes = [
        {
            menuItem: 'Favorites', render: () => (
                <Tab.Pane>
                    <Input focus placeholder="Enter your trip name here" value={props.tripName} onChange={props.onNameChange} /><br /><br />
                    {props.foodFavorites.length > 0 ? <h2>Restaurants</h2> : ""}
                    <Card.Group>
                        {props.foodFavorites.map((restaurant, index) => {
                            return <FavFoodCard restaurant={restaurant} key={"favfood" + restaurant.id} />;
                        })}
                    </Card.Group>
                    {props.eventFavorites.length > 0 ? <h2>Events</h2> : ""}
                    <Card.Group>
                        {props.eventFavorites.map((event, index) => {
                            return <FavEventCard event={event} key={"favevent" + event.id} />;
                        })}
                    </Card.Group>
                    {props.foodFavorites.length + props.eventFavorites.length === 0 ? "" : (
                        <div>
                            <Divider />
                            <Button onClick={props.saveTrip}>Save to My Trips</Button>
                        </div>
                    )}
                </Tab.Pane>
            )
        }
    ];
    return <Tab panes={panes} />;
}

export default FoodAndEventsSidebar;