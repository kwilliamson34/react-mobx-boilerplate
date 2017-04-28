import React, {PropTypes} from 'react';
import $ from 'jquery';

class Toggle extends React.Component {
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
    const inputIdentifier = this.props.id + '-checkbox';
    const labelIdentifier = this.props.id + '-label';
    return (
      <div className="checkbox-as-toggle">
        <input className="checkbox" id={inputIdentifier} type="checkbox" defaultChecked={this.props.defaultOn} value={this.props.value} onClick={this.onClick} tabIndex="-1"/>
        <label id={labelIdentifier} htmlFor={inputIdentifier} className="checkbox-label" tabIndex="0" role="button" onKeyUp={this.handleFocusEnter}>
          <span className="sr-only">Toggle:</span>
          <span className="text-label">{this.props.label}</span>
          <span className="pill" aria-hidden={true}></span>
        </label>
      </div>
    )
  }
}

Toggle.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  defaultOn: PropTypes.bool
}

export default Toggle;