import React from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import LandingPageBody from './LandingPageBody.jsx';

const LandingPage = (props) => (
  <div>
    <NavBar />
    <LandingPageBody 
      history={props.history}
      startDate={props.startDate} 
      endDate={props.endDate}
      onStartChange={props.onStartChange}
      onEndChange={props.onEndChange} 
    />
  </div>
);

export default LandingPage;