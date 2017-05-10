import React, {PropTypes} from 'react';
import $ from 'jquery';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

@observer
class Toggle extends React.Component {
  /* MobX managed instance state */
  @observable disabled = null;

  constructor(props) {
    super(props);
    this.handleFocusEnter = this.handleFocusEnter.bind(this);
    this.onClick = this.onClick.bind(this);
    this.disabled = false;
  }

  onClick(event) {
    if(this.disabled) {
      event.preventDefault();
    } else {
      if(this.props.onClick) {
        this.props.onClick(event);
      }
    }
  }

  handleFocusEnter(event) {
    if (event.key === 'Enter') {
      $(event.target.parentElement).find('input').click();
    }
  }

  toggleOffAndDisable() {
    this.input.checked = false;
    this.disabled = true;
  }

  enable() {
    this.disabled = false;
  }

  render() {
    const inputIdentifier = this.props.id + '-checkbox';
    const labelIdentifier = this.props.id + '-label';
    return (
      <div className={`checkbox-as-toggle ${this.disabled ? 'disabled' : ''}`}>
        <input
          ref={ref => this.input = ref}
          aria-disabled={this.disabled}
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
