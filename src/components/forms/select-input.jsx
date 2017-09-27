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
    validate: PropTypes.func,
    errorMessage: PropTypes.string
  }

  static defaultProps = {
    optionsList: [],
    labelText: '',
    required: false,
    disabled: false,
    errorMessage: 'This entry is not valid.'
  }

  @observable hasError = false;
  @computed get valueInStore() {
    return this.props.dataObject[this.props.id];
  }

  handleOnChange = (e) => {
    this.props.dataObject[this.props.id] = e.target.value;
  }

  handleOnBlur = () => {
    console.log('select on blur');
    //check emptiness last, as it should overwrite a truthy validation response
    if(this.props.validate) {
      this.hasError = this.props.validate();
    }
    if(this.props.required && !this.valueInStore) {
      this.hasError = true;
    }
  }

  render() {
    const value = this.props.dataObject[this.props.id];

    return (
      <div className={`form-group ${this.hasError ? 'has-error' : ''}`}>
        <FormLabel
          id={this.props.id}
          hasError={this.hasError}
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
