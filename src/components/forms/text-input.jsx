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
    getIsValid: PropTypes.func,
    checkFormForErrors: PropTypes.func,
    errorMessage: PropTypes.string
  }

  static defaultProps = {
    labelText: '',
    required: false,
    disabled: false,
    errorMessage: 'This entry is not valid.'
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

  handleOnChange = (e) => {
    const newValue = e.target.value;
    if(this.props.charLimit) {
      this.props.dataObject[this.props.id] = newValue.substr(0, this.props.charLimit);
    } else {
      this.props.dataObject[this.props.id] = newValue;
    }
    this.hasVisibleError = this.hasFunctionalError;
    this.props.checkFormForErrors();
  }

  handleOnBlur = () => {
    this.hasVisibleError = this.hasFunctionalError;
    this.props.checkFormForErrors();
  }

  render() {
    const Tag = this.props.type === 'textarea' ? 'textarea' : 'input';
    return (
      <div className={`form-group ${this.hasVisibleError ? 'has-error' : ''}`}>
        <FormLabel
          id={this.props.id}
          hasError={this.hasVisibleError}
          fieldIsRequired={this.props.required}
          labelText={this.props.labelText}
          errorMessage={this.props.errorMessage}/>
        <Tag
          className="form-control"
          id={this.props.id}
          type={this.props.type}
          disabled={this.props.disabled}
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
          value={this.valueInStore}/>
      </div>
    )
  }
}
