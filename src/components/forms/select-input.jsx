import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import FormLabel from './form-label';

@observer
export default class SelectInput extends React.Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    optionsList: PropTypes.object,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    value: '',
    optionsList: [],
    disabled: false
  }

  handleOnChange = (e) => {
    this.props.onChange(e.target.id, e.target.value);
  }

  render() {
    return (
      <div>
        
        <select
          id={this.props.id}
          name={this.props.name}
          onChange={this.handleOnChange}
          value={this.props.value}
          className="form-control form-control-lg"
          disabled={this.props.disabled}
          >
          {this.props.placeholder && <option value="">{this.props.placeholder}</option>}
          {this.props.optionsList.map(option => <option value={option.value} key={option.value}>{option.title}</option> )}
        </select>
      </div>
    )
  }
}
