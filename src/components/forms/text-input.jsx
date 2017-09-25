import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {observable} from 'mobx';

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
    errorMessage: PropTypes.string
  }

  static defaultProps = {
    labelText: '',
    required: false,
    disabled: false,
    errorMessage: 'This entry is not valid.'
  }

  @observable hasError = false;

  handleOnChange = (e) => {
    this.props.dataObject[this.props.id] = e.target.value;
  }

  charLimitedValue = (value, charLimit) => {
    return value ? value.substr(0, charLimit) : '';
  }

  render() {
    const Tag = this.props.type === 'textarea' ? 'textarea' : 'input';
    const value = this.props.dataObject[this.props.id];

    return (
      <div className="form-group">
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
          value={
            this.props.charLimit
            ? this.charLimitedValue(value, this.props.charLimit)
            : value
          }/>
      </div>
    )
  }
}
