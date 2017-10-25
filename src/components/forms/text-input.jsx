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
    let hasError = false;

    //empty check
    const inputIsEmptyOrSpaces = !this.valueInStore || !/\w+/.test(this.valueInStore);
    if(this.props.required && inputIsEmptyOrSpaces) {
      hasError = true;
    }

    //other validation rules
    if(!inputIsEmptyOrSpaces && this.props.getIsValid !== undefined && !this.props.getIsValid(this.valueInStore)) {
      hasError = true;
    }

    return hasError;
  }

  showErrors = () => {
    this.hasVisibleError = this.hasFunctionalError;
  }

  handleOnChange = (e) => {
    const newValue = e.target.value;
    if(this.props.charLimit) {
      this.props.dataObject[this.props.id] = newValue.substr(0, this.props.charLimit);
			this.checkCharLimitMessage(e.target.value);
    } else {
      this.props.dataObject[this.props.id] = newValue;
    }
    this.showErrors();
  }

	checkCharLimitMessage = (fieldValue) => {
		if (fieldValue.length >= this.props.charLimit) {
      this.charLimitMessage = 'Character limit reached.';
		} else {
			this.charLimitMessage = '';
		}
	}

  handleOnBlur = () => {
    this.showErrors();
  }

  handleKeyPress = (e) => {
    if (this.props.handleSubmit && e.key == 'Enter') {
      e.preventDefault();
      this.props.handleSubmit();
    }
  }

  handleClearClick = () => {
    this.props.dataObject[this.props.id] = '';
    this.refs.btnSubmit.focus();
    this.showErrors();
    if(this.props.handleClearClick) {
      this.props.handleClearClick();
    }
  }

  handleSubmit = () => {
    this.refs.input.blur();
    this.props.handleSubmit();
  }

  render() {
    const Tag = this.props.type === 'textarea' ? 'textarea' : 'input';
    const clearButtonVisible = this.props.showClearButton && this.valueInStore !== '';
    const submitButtonVisible = this.props.handleSubmit && this.props.submitIcon;
    return (
      <div className={`form-group ${this.props.className} ${this.hasVisibleError ? 'has-error' : ''}`}>
				<span className="sr-only" role="alert" aria-live="assertive">{this.charLimitMessage}</span>
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
            ref="input"
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
              <button className="clear-btn" type="button" ref="btnClear" onClick={this.handleClearClick}>
                <span className="sr-only">Clear</span>
                <span aria-hidden="true" className="icon-close" />
              </button>
            </span>
          }
          {submitButtonVisible &&
            <span className="input-group-btn">
              <button className="submit-btn" type="button" ref="btnSubmit" onClick={this.handleSubmit} disabled={this.props.disabled}>
                <span className="sr-only">Submit</span>
                <span aria-hidden="true" className={this.props.submitIcon} />
              </button>
            </span>
          }
        </div>
      </div>
    )
  }
}
