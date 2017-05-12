import React, {PropTypes} from 'react';

class GeolinkLayerToggle extends React.Component {
  constructor(props) {
    super(props);
    if(this.props.onClick){
      this.onClick = this.props.onClick.bind(this);
    }
  }

  render() {
    return (
      <div className="checkbox">
        <label>
          <input type="checkbox" value={this.props.value} defaultChecked={this.props.defaultOn} onClick={this.onClick}/>
          <span className="cr"></span>
          <span>{this.props.label}</span>
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
