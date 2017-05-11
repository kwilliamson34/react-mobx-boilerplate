import React, {PropTypes} from 'react';
import {Checkbox} from 'react-bootstrap';

class GeolinkLayerToggle extends React.Component {
  constructor(props) {
    super(props);
    if(this.props.onClick){
      this.onClick = this.props.onClick.bind(this);
    }
    this.onClick = this.props.onClick.bind(this);
  }

  render() {
    return (
      <Checkbox defaultChecked={this.props.defaultOn} value={this.props.value} onClick={this.onClick} >
        <span className="cr"></span>
        <span className="layer-label">{this.props.label}</span>
      </Checkbox>
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
