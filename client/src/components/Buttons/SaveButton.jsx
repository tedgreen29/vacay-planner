import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

class SaveButton extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.props.toggleFavorite();
  }

  render() {
    return (
      <div style={ {float: 'right'} }>
        <Icon color = 'red' 
            name={this.props.isSaved ? "heart" : "empty heart"}
            size='big' 
            onClick={this.onClick}
          />
      </div>
    );
  }
}

export default SaveButton;