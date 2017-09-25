import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {observable} from 'mobx';

import FormLabel from './form-label';

@observer
export default class TextInput extends React.Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    isRequired: PropTypes.bool,
    disabled: PropTypes.bool,
    labelText: PropTypes.string,
    errorMessage: PropTypes.string
  }

  static defaultProps = {
    value: '',
    isRequired: false,
    disabled: false
  }

  @observable hasError = false;

  handleOnChange = (e) => {
    this.props.onChange(e.target.name, e.target.value);
  }

  render() {
    const Tag = this.props.type === 'textarea' ? 'textarea' : 'input';

    return (
      <div>
        <FormLabel
          id={this.props.name}
          hasError={this.hasError}
          fieldIsRequired={this.props.isRequired}
          labelText={this.props.labelText}
          errorMessage={this.props.errorMessage}/>
        <Tag
          className="form-control"
          name={this.props.name}
          type={this.props.type}
          disabled={this.props.disabled}
          onChange={this.handleOnChange}
          value={this.props.value}/>
      </div>
    )
  }
}
