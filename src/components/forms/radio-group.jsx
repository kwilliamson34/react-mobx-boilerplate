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
    labelTextIsSrOnly: PropTypes.bool,
    errorMessage: PropTypes.string,
    labelErrorIsSrOnly: PropTypes.bool,
    helperText: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node
  }

  static defaultProps = {
    labelText: '',
    helperText: '',
    required: false,
    disabled: false,
    errorMessage: 'Please select one of the options.',
    labelTextIsSrOnly: false,
    labelErrorIsSrOnly: false,
    className: ''
  }

  @observable hasVisibleError = false;
  @computed get valueInStore() {
    return this.props.dataObject[this.props.id];
  }
  @computed get hasFunctionalError() {
    return this.props.required && this.valueInStore === '';
  }

  //this handler should be passed to all checkbox children in the list;
  handleRadioOnChange = (e) => {
    this.props.dataObject[this.props.id] = e.value;
    this.hasVisibleError = this.hasFunctionalError;
  }

  handleOnBlur = () => {
    this.hasVisibleError = this.hasFunctionalError;
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
          labelTextIsSrOnly={this.props.labelTextIsSrOnly}
          labelErrorIsSrOnly={this.props.labelErrorIsSrOnly}
          errorMessage={this.props.errorMessage}/>
        {this.props.children}
      </fieldset>
    )
  }
}
