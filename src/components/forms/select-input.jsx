import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {observable} from 'mobx';

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

  handleOnChange = (e) => {
    this.props.dataObject[this.props.id] = e.target.value;
  }

  render() {
    const value = this.props.dataObject[this.props.id];

    return (
      <div className="form-group">
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
          value={value}
          disabled={this.props.disabled}>
          {this.props.placeholder && <option value="">{this.props.placeholder}</option>}
          {this.props.optionsList.map(option => <option value={option.value} key={option.value}>{option.title}</option> )}
        </select>
      </div>
    )
  }
}
