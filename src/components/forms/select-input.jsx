import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {observable} from 'mobx';

import FormLabel from './form-label';

@observer
export default class SelectInput extends React.Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    labelText: PropTypes.string,
    optionsList: PropTypes.array,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
  }

  static defaultProps = {
    value: '',
    optionsList: [],
    disabled: false
  }

  @observable hasError = false;

  handleOnChange = (e) => {
    this.props.onChange(e.target.id, e.target.value);
  }

  render() {
    return (
      <div>
        <FormLabel
          id={this.props.id}
          hasError={this.hasError}
          fieldIsRequired={this.props.required}
          labelText={this.props.labelText}
          errorMessage={this.props.errorMessage}/>
        <select
          className="form-control form-control-lg"
          id={this.props.id}
          onChange={
            this.props.onChange
            ? this.handleOnChange
            : () => {}
          }
          value={this.props.value}
          disabled={this.props.disabled}>
          {this.props.placeholder && <option value="">{this.props.placeholder}</option>}
          {this.props.optionsList.map(option => <option value={option.value} key={option.value}>{option.title}</option> )}
        </select>
      </div>
    )
  }
}
