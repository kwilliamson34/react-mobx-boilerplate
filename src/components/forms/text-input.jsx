import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {observable} from 'mobx';

import FormLabel from './form-label';

@observer
export default class TextInput extends React.Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    required: PropTypes.bool,
    charLimit: PropTypes.number,
    disabled: PropTypes.bool,
    labelText: PropTypes.string,
    errorMessage: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func
  }

  static defaultProps = {
    value: '',
    required: false,
    disabled: false
  }

  @observable hasError = false;

  handleOnChange = (e) => {
    this.props.onChange(e.target.id, e.target.value);
  }

  charLimitedValue = (value, charLimit) => {
    return value.substr(0, charLimit);
  }

  render() {
    const Tag = this.props.type === 'textarea' ? 'textarea' : 'input';

    return (
      <div>
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
          onChange={
            this.props.onChange
            ? this.handleOnChange
            : () => {}
          }
          onBlur={
            this.props.onBlur
            ? this.handleOnBlur
            : () => {}
          }
          value={
            this.props.charLimit
            ? this.charLimitedValue(this.props.value, this.props.charLimit)
            : this.props.value
          }/>
      </div>
    )
  }
}
