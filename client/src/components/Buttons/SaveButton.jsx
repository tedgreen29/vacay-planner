import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

class SaveButton extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          isSaved: false
      }
  }

  onClick(e) {
      this.setState({
        isSaved: !this.state.isSaved
      });
  }

  render() {
    return (
      <Button icon floated='right' basic color='red' style={ {marginRight: 20} }>
        <Icon style={ {color: 'red'} } name="empty heart" />
      </Button>
    );
  }
}

export default SaveButton;