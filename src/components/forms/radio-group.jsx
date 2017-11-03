import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {observable, computed} from 'mobx';

import FormLabel from './form-label';

@observer
export default class RadioGroup extends React.Component {

  static propTypes = {
    dataObject: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    required: PropTypes.bool,
    labelText: PropTypes.string,
    helperText: PropTypes.string,
    optionsList: PropTypes.array,
    disabled: PropTypes.bool,
    errorMessage: PropTypes.string,
    className: PropTypes.string
  }

  static defaultProps = {
    optionsList: [],
    labelText: '',
    helperText: '',
    required: false,
    disabled: false,
    errorMessage: 'Please select one of the options.',
    className: ''
  }

  @observable hasVisibleError = false;
  @computed get valueInStore() {
    return this.props.dataObject[this.props.id];
  }
  @computed get hasFunctionalError() {
    return this.props.required && this.valueInStore === '';
  }

  handleOnChange = (e) => {
    this.props.dataObject[this.props.id] = e.target.value;
    this.hasVisibleError = this.hasFunctionalError;
  }

  handleOnBlur = () => {
    this.hasVisibleError = this.hasFunctionalError;
  }

  renderRadioInputs = () => {
    return this.props.optionsList.map(option => (
      <label key={option.title}>
        <input type="radio"
          name={this.props.id}
          value={option.title}
          aria-disabled={this.props.disabled}
          checked={this.valueInStore === option.title}
          onChange={this.handleOnChange}/>
        {option.title}
        <span className="cr"></span>
      </label>
    ));
  }

  render() {
    const disabledClass = this.props.disabled
      ? 'disabled'
      : '';
    return (
      <fieldset className={`form-group radio ${this.props.className} ${disabledClass} ${this.hasVisibleError ? 'has-error' : ''}`} onBlur={this.handleOnBlur}>
        <FormLabel
          hasError={this.hasVisibleError}
          fieldIsRequired={this.props.required}
          labelText={this.props.labelText}
          helperText={this.props.helperText}
          errorMessage={this.props.errorMessage}/>
        {this.renderRadioInputs()}
      </fieldset>
    )
  }
}
