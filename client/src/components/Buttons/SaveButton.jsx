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
    this.props.toggleFavorite();
  }

  render() {
    return (
      <div style={ {float: 'right'} }>
        { this.state.isSaved ?
          (
            <Icon color = 'red' 
              name="heart" 
              size='big' 
              onClick={this.onClick}
            />
          )
        :
          (
            <Icon color = 'red'
              name="empty heart" 
              size='big' 
              onClick={this.onClick}
            />
          )
        }
      </div>
    );
  }
}

export default SaveButton;