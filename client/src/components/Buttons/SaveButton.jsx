import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

class SaveButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSaved: false
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.setState({
      isSaved: !this.state.isSaved
    });
  }

  render() {
    return (
      <div>
        { this.state.isSaved ?
        (<Button icon floated='right' basic color='red' style={ {marginRight: 20} }  onClick={this.onClick}>
          <Icon style={ {color: 'red'} } name="heart" />
        </Button>) 
        :
        (<Button icon floated='right' basic color='red' style={ {marginRight: 20} }  onClick={this.onClick}>
          <Icon style={ {color: 'red'} } name="empty heart" />
        </Button>
        )}
      </div>
    );
  }
}

export default SaveButton;