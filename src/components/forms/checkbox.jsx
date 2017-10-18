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
    labelIsSrOnly: PropTypes.bool,
    checked: PropTypes.bool,
    required: PropTypes.bool,
    errorMessage: PropTypes.string
  }

  static defaultProps = {
    id: '',
    value: '',
    strongLabel: '',
    checked: false, //Note: checked must always have a value so this can be a controlled component
    disabled: false,
    errorMessage: ''
  }

  @observable hasBeenVisited = false;
  @observable hasVisibleError = false;
  @computed get hasFunctionalError() {
    return this.hasVisibleError || !this.hasBeenVisited;
  }

  handleOnChange = (event) => {
    if (!this.props.disabled && this.props.handleOnChange) {
      this.props.handleOnChange(event.target);
      this.showError(event);
    }
    this.hasBeenVisited = true;
  }

  handleOnBlur = (event) => {
    this.showError(event);
    this.hasBeenVisited = true;
  }

  showError = (event) => {
    if(!event.target.checked && this.props.required) {
      this.hasVisibleError = true;
    } else {
      this.hasVisibleError = false;
    }
  }

  render() {
    const disabledClass = this.props.disabled
      ? 'disabled'
      : '';
    return (
      <div className={`checkbox form-group ${disabledClass}`}>
        {this.hasVisibleError && <div className="msgBlock error error-list" role="alert" aria-live="assertive">
          <span>{this.props.errorMessage}</span>
        </div>}
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
            onChange={this.handleOnChange}
            onBlur={this.handleOnBlur}/>
          <span className="cr"></span>
          <span className={`label-text ${this.props.labelIsSrOnly ? 'sr-only' : ''}`}>
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
