import React from 'react';
import PropTypes from 'prop-types';

export default class Checkbox extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    strongLabel: PropTypes.string,
    handleOnChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    checked: PropTypes.bool
  }

  handleOnChange = (event) => {
    if (this.props.disabled) {
      event.preventDefault();
    } else {
      if (this.props.handleOnChange) {
        this.props.handleOnChange(event.target);
      }
    }
  }

  turnOn() {
    this.input.checked = true;
  }

  turnOff() {
    this.input.checked = false;
  }

  isChecked() {
    return this.input.checked;
  }

  render() {
    //Note: checked must always have a value so this can be a controlled component
    const checked = this.props.checked === undefined
      ? false
      : this.props.checked;
    const disabledClass = this.props.disabled
      ? 'disabled'
      : '';
    return (
      <div className={`checkbox ${disabledClass}`}>
        <label>
          <input type="checkbox" ref={ref => this.input = ref} aria-disabled={this.props.disabled} className={disabledClass} value={this.props.value || this.props.label} checked={checked} data-checked={checked/*custom DOM prop included for automated testing*/} onChange={this.handleOnChange}/>
          <span className="cr"></span>
          <span className="label-text">
            {this.props.strongLabel
              ? <strong>{this.props.strongLabel}&nbsp;</strong>
              : ''}
            {this.props.label}
          </span>
        </label>
      </div>
    )
  }
}
