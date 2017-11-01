import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {observable, computed} from 'mobx';

import FormLabel from './form-label';

@observer
export default class TextInput extends React.Component {

  static propTypes = {
    dataObject: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    required: PropTypes.bool,
    charLimit: PropTypes.number,
    disabled: PropTypes.bool,
    labelText: PropTypes.string,
    helperText: PropTypes.string,
    labelIsSrOnly: PropTypes.bool,
    getIsValid: PropTypes.func,
    errorMessage: PropTypes.string,
    className: PropTypes.string,
    showClearButton: PropTypes.bool,
    handleClearClick: PropTypes.func,
    handleSubmit: PropTypes.func,
    submitIcon: PropTypes.string,
    iconClass: PropTypes.string,
    onDropIntoList: PropTypes.func,
    disableAutoComplete: PropTypes.bool
  }

  static defaultProps = {
    labelText: '',
    helperText: '',
    labelIsSrOnly: false,
    required: false,
    disabled: false,
    errorMessage: 'This entry is not valid.',
    className: '',
    showClearButton: false,
    disabledAutocomplete: false
  }

  @observable charLimitMessage = '';
  @observable hasVisibleError = false;
  @computed get valueInStore() {
    return this.props.dataObject[this.props.id];
  }
  @computed get hasFunctionalError() {
    return this.isEmpty || this.failsExtraValidation;
  }
  @computed get isEmpty() {
    const inputIsEmptyOrSpaces = !this.valueInStore || !/\w+/.test(this.valueInStore);
    return this.props.required && inputIsEmptyOrSpaces;
  }
  @computed get failsExtraValidation() {
    const inputIsEmptyOrSpaces = !this.valueInStore || !/\w+/.test(this.valueInStore);
    return !inputIsEmptyOrSpaces && this.props.getIsValid !== undefined && !this.props.getIsValid(this.valueInStore);
  }

  handleOnChange = (e) => {
    const newValue = e.target.value;
    if (this.props.charLimit) {
      this.props.dataObject[this.props.id] = newValue.substr(0, this.props.charLimit);
      this.checkCharLimitMessage(newValue);
    } else {
      this.props.dataObject[this.props.id] = newValue;
    }
    this.hasVisibleError = this.isEmpty;
  }

  checkCharLimitMessage = (fieldValue) => {
    if (fieldValue.length >= this.props.charLimit) {
      this.charLimitMessage = 'Character limit reached.';
    } else {
      this.charLimitMessage = '';
    }
  }

  handleOnBlur = () => {
    this.hasVisibleError = this.hasFunctionalError;
  }

  handleKeyPress = (e) => {
    if (this.props.handleSubmit && e.key == 'Enter') {
      e.preventDefault();
      this.props.handleSubmit();
    }
  }

  handleClearClick = () => {
    this.props.dataObject[this.props.id] = '';
    this.btnSubmit.focus();
    this.hasVisibleError = this.isEmpty;
    if(this.props.handleClearClick) {
      this.props.handleClearClick();
    }
  }

  handleSubmit = () => {
    this.input.blur();
    this.props.handleSubmit();
  }

  render() {
    const Tag = this.props.type === 'textarea' ? 'textarea' : 'input';
    const clearButtonVisible = this.props.showClearButton && this.valueInStore !== '';
    const submitButtonVisible = this.props.handleSubmit !== undefined;
    return (
      <div className={`form-group ${this.props.className} ${this.hasVisibleError || this.charLimitMessage ? 'has-error' : ''}`}>
        <FormLabel
          id={this.props.id}
          charLimitMessage={this.charLimitMessage}
          hasError={this.hasVisibleError}
          fieldIsRequired={this.props.required}
          labelText={this.props.labelText}
          srOnly={this.props.labelIsSrOnly}
          helperText={this.props.helperText}
          errorMessage={this.props.errorMessage} />
        <div className={`input-group ${this.props.iconClass ? 'has-icon' : ''}`}>
          <Tag
            className="form-control"
            ref={(i) => {this.input = i;}}
            id={this.props.id}
            type={this.props.type}
            disabled={this.props.disabled}
            onChange={this.handleOnChange}
            onBlur={this.handleOnBlur}
            onKeyPress={this.handleKeyPress}
            value={this.valueInStore}
            onKeyDown={this.props.onDropIntoList}
            autoComplete={this.props.disableAutoComplete ? 'off' : 'on'}/>
          {this.props.iconClass && <i className={`prefix-icon ${this.props.iconClass}`}></i>}
          {clearButtonVisible &&
            <span className="input-group-btn">
              <button
                ref={(i) => {this.btnClear = i }}
                className="clear-btn"
                type="button"
                onClick={this.handleClearClick}>
                <span className="sr-only">Clear</span>
                <span aria-hidden="true" className="icon-close" />
              </button>
            </span>
          }
          {submitButtonVisible &&
            <span className="input-group-btn">
              <button className="submit-btn" type="button" ref={(i) => { this.btnSubmit = i }} onClick={this.handleSubmit} disabled={this.props.disabled}>
                <span className="sr-only">{this.props.type === 'search' ? 'Search' : 'Submit'}</span>
                <span aria-hidden="true" className={this.props.type === 'search' ? 'icon-search' : 'icon-arrowRight'} />
              </button>
            </span>
          }
        </div>
      </div>
    )
  }
}
