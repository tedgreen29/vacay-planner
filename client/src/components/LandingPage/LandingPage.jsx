import React from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import LandingPageBody from './LandingPageBody.jsx';

const LandingPage = (props) => (
  <div>

    <NavBar user={props.user} />
    <LandingPageBody history={props.history} handleLocationChange={props.handleLocationChange} handleStartDayChange={props.handleStartDayChange} handleEndDayChange={props.handleEndDayChange} handleLogout={props.handleLogout}/>

  </div>
);

export default LandingPage;