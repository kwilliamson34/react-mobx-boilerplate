import React, {PropTypes} from 'react';
import $ from 'jquery';

class GeolinkLayerToggle extends React.Component {
  constructor(props) {
    super(props);
    if(this.props.onClick){
      this.onClick = this.props.onClick.bind(this);
    }
    this.handleFocusEnter = this.handleFocusEnter.bind(this);
  }

  handleFocusEnter(event) {
    if (event.key === 'Enter') {
      $(event.target.parentElement).find('input').click();
    }
  }

  render() {
    const inputIdentifier = this.props.value + '-checkbox';
    return (
      <div>
        <input
          id={inputIdentifier}
          type="checkbox"
          value={this.props.value}
          defaultChecked={this.props.defaultOn}
          onClick={this.onClick}/>
        <label htmlFor={inputIdentifier}>
          {this.props.label}
        </label>
      </div>
    )
  }
}

GeolinkLayerToggle.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  defaultOn: PropTypes.bool
}

export default GeolinkLayerToggle;
