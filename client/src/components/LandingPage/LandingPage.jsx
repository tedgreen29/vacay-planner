import React from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import LandingPageBody from './LandingPageBody.jsx';

const LandingPage = (props) => (
  <div>

    <NavBar />
    <LandingPageBody history={props.history} handleLocationChange={props.handleLocationChange} handleStartDayChange={props.handleStartDayChange} handleEndDayChange={props.handleEndDayChange} />

  </div>
);

export default LandingPage;