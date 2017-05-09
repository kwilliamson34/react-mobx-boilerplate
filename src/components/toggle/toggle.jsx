import React, {PropTypes} from 'react';
import $ from 'jquery';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    }
    this.handleFocusEnter = this.handleFocusEnter.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    if(this.props.onClick && !this.state.disabled) {
      this.props.onClick(event);
    }
  }

  handleFocusEnter(event) {
    if (event.key === 'Enter') {
      $(event.target.parentElement).find('input').click();
    }
  }

  toggleOffAndDisable() {
    this.input.checked = false;
    this.setState({disabled: true});
  }

  enable() {
    this.setState({disabled: false});
  }

  render() {
    const inputIdentifier = this.props.id + '-checkbox';
    const labelIdentifier = this.props.id + '-label';
    return (
      <div className={`checkbox-as-toggle ${this.state.disabled ? 'disabled' : ''}`}>
        <input
          ref={ref => this.input = ref}
          aria-disabled={this.state.disabled}
          className="checkbox"
          id={inputIdentifier}
          type="checkbox"
          defaultChecked={this.props.defaultOn}
          value={this.props.value || this.props.label}
          onClick={this.onClick} tabIndex="-1"/>
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
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  defaultOn: PropTypes.bool
}

export default Toggle;
