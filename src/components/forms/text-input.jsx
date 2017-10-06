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
    labelIsSrOnly: PropTypes.bool,
    getIsValid: PropTypes.func,
    checkFormForErrors: PropTypes.func,
    errorMessage: PropTypes.string,
    className: PropTypes.string,
    showClearButton: PropTypes.bool,
    handleClearClick: PropTypes.func,
    handleSubmit: PropTypes.func,
    submitIcon: PropTypes.string
  }

  static defaultProps = {
    labelText: '',
    required: false,
    disabled: false,
    errorMessage: 'This entry is not valid.',
    className: '',
    showClearButton: false,
    checkFormForErrors: () => {}
  }

  @observable hasVisibleError = false;
  @computed get valueInStore() {
    return this.props.dataObject[this.props.id];
  }
  @computed get hasFunctionalError() {
    let hasError = false;

    //empty check
    if(this.props.required && this.valueInStore === '') {
      hasError = true;
    }

    //other validation rules
    if(this.valueInStore !== '' && this.props.getIsValid !== undefined && !this.props.getIsValid(this.valueInStore)) {
      hasError = true;
    }

    return hasError;
  }

  showErrors = () => {
    this.hasVisibleError = this.hasFunctionalError;
    this.props.checkFormForErrors();
  }

  handleOnChange = (e) => {
    const newValue = e.target.value;
    if(this.props.charLimit) {
      this.props.dataObject[this.props.id] = newValue.substr(0, this.props.charLimit);
    } else {
      this.props.dataObject[this.props.id] = newValue;
    }
    this.showErrors();
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
    return (
      <div className={`form-group ${this.props.className} ${this.hasVisibleError ? 'has-error' : ''}`}>
        <FormLabel
          id={this.props.id}
          hasError={this.hasVisibleError}
          fieldIsRequired={this.props.required}
          labelText={this.props.labelText}
          errorMessage={this.props.errorMessage}/>
        <div className="input-wrapper">
          <Tag
            className="form-control"
            ref="input"
            id={this.props.id}
            type={this.props.type}
            disabled={this.props.disabled}
            onChange={this.handleOnChange}
            onBlur={this.handleOnBlur}
            onKeyPress={this.handleKeyPress}
            value={this.valueInStore}/>
          {this.props.showClearButton && this.valueInStore !== '' &&
            <button className="btn clear-btn" type="button" ref="btnClear" onClick={this.handleClearClick}>
              <span className="sr-only">Clear</span>
              <span aria-hidden="true" className="icon-close"/>
            </button>
          }
          {this.props.handleSubmit && this.props.submitIcon &&
            <button className="btn submit-btn" type="button" ref="btnSubmit" onClick={this.handleSubmit} disabled={this.props.disabled}>
              <span className="sr-only">Submit</span>
              <span aria-hidden="true" className={this.props.submitIcon}/>
            </button>}
        </div>
      </div>
    )
  }
}
