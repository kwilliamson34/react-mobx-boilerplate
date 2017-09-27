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
    validate: PropTypes.func,
    errorMessage: PropTypes.string
  }

  static defaultProps = {
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
    const newValue = e.target.value;
    if(this.props.charLimit) {
      this.props.dataObject[this.props.id] = newValue.substr(0, this.props.charLimit + 1);
    } else {
      this.props.dataObject[this.props.id] = newValue;
    }

    //check emptiness first, as it should be overwritten by a falsey validation response
    if(this.props.required && this.valueInStore) {
      this.hasError = false;
    }
    if(this.props.validate) {
      this.hasError = this.props.validate();
    }
  }

  handleOnBlur = () => {
    //check emptiness last, as it should overwrite a truthy validation response
    if(this.props.validate) {
      this.hasError = this.props.validate();
    }
    if(this.props.required && !this.valueInStore) {
      this.hasError = true;
    }
  }

  render() {
    const Tag = this.props.type === 'textarea' ? 'textarea' : 'input';
    return (
      <div className={`form-group ${this.hasError ? 'has-error' : ''}`}>
        <FormLabel
          id={this.props.id}
          hasError={this.hasError}
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
