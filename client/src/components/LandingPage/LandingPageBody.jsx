import React from 'react';

const LandingPageBody = (props) => (
  <div>
    <form>
      Where to? <br />
      <input type="text" name="city" /><br />
      Start Date:<br />
      <input type="text" name="startDate" /><br />
      End Date:<br />
      <input type="text" name="endDate" /><br />
      <input type="submit" />
    </form>
  </div>
);

export default LandingPageBody;