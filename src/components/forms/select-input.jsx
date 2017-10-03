import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {observable, computed} from 'mobx';

import FormLabel from './form-label';

@observer
export default class SelectInput extends React.Component {

  static propTypes = {
    dataObject: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    required: PropTypes.bool,
    labelText: PropTypes.string,
    optionsList: PropTypes.array,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    errorMessage: PropTypes.string,
    checkFormForErrors: PropTypes.func
  }

  static defaultProps = {
    optionsList: [],
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

    return hasError;
  }

  handleOnChange = (e) => {
    this.props.dataObject[this.props.id] = e.target.value;
    this.props.checkFormForErrors();
  }

  handleOnBlur = () => {
    if(this.props.required && !this.valueInStore) {
      this.hasVisibleError = true;
    }
    this.props.checkFormForErrors();
  }

  render() {
    const value = this.props.dataObject[this.props.id];

    return (
      <div className={`form-group ${this.hasVisibleError ? 'has-error' : ''}`}>
        <FormLabel
          id={this.props.id}
          hasError={this.hasVisibleError}
          fieldIsRequired={this.props.required}
          labelText={this.props.labelText}
          errorMessage={this.props.errorMessage}/>
        <select
          className="form-control form-control-lg"
          id={this.props.id}
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
          value={value}
          disabled={this.props.disabled}>
          {this.props.placeholder && <option value="">{this.props.placeholder}</option>}
          {this.props.optionsList.map(option => <option value={option.value} key={option.value}>{option.title}</option> )}
        </select>
      </div>
    )
  }
}
