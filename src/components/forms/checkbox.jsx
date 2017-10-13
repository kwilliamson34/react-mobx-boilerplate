import React from 'react';
import PropTypes from 'prop-types';
import {observable, computed} from 'mobx';

export default class Checkbox extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string.isRequired,
    strongLabel: PropTypes.string,
    handleOnChange: PropTypes.func,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    required: PropTypes.bool
  }

  static defaultProps = {
    id: '',
    value: '',
    strongLabel: '',
    checked: false, //Note: checked must always have a value so this can be a controlled component
    disabled: false
  }

  @observable hasVisibleError = false;
  @computed get hasFunctionalError() {
    let hasError = false;
    if(this.props.required && !this.props.checked) {
      hasError = true;
    }
    return hasError;
  }

  handleOnChange = (event) => {
    if (this.props.disabled) {
      event.preventDefault();
    } else {
      this.hasVisibleError = this.props.required && this.hasFunctionalError;
      if (this.props.handleOnChange) {
        this.props.handleOnChange(event.target);
      }
    }
  }

  render() {
    const disabledClass = this.props.disabled
      ? 'disabled'
      : '';
    return (
      <div className={`checkbox ${disabledClass}`}>
        <label>
          <input
            type="checkbox"
            id={this.props.id}
            ref="input"
            aria-disabled={this.props.disabled}
            className={disabledClass}
            value={this.props.value || this.props.label}
            checked={this.props.checked}
            data-checked={this.props.checked/*custom DOM prop included for automated testing*/}
            onChange={this.handleOnChange}/>
          <span className="cr"></span>
          <span className="label-text">
            {this.props.strongLabel
              ? <strong>{this.props.strongLabel}:&nbsp;</strong>
              : ''}
            <span className="label-text-normal">{this.props.label}</span>
            {this.props.required &&
              <span className="required-asterisks"> *</span>
            }
          </span>
        </label>
      </div>
    )
  }
}
