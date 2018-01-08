import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
export default class RadioInput extends React.Component {

  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    labelText: PropTypes.string,
    helperText: PropTypes.string,
    handleOnChange: PropTypes.func,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    requiredAsteriskOnHelperText: PropTypes.bool,
    requiredAsteriskOnLabelText: PropTypes.bool
  }

  static defaultProps = {
    id: '',
    value: '',
    checked: false,
    disabled: false,
    requiredAsteriskOnHelperText: false,
    requiredAsteriskOnLabelText: false
  }

  handleOnChange = (event) => {
    if(this.props.disabled) {
      event.preventDefault();
    } else {
      if (this.props.handleOnChange) {
        this.props.handleOnChange(event.target);
      }
    }
  }

  // title === 'Subscribe to alerts' && this.store.values.gtocSelection === 'Subscribe to alerts' &&

  render() {
    return (
      <label className="radio-label">
        <input type="radio"
          name={this.props.id}
          value={this.props.value}
          checked={this.props.checked}
          aria-disabled={this.props.disabled}
          onChange={this.handleOnChange}/>
        {this.props.labelText || this.props.value}
        {
          this.props.requiredAsteriskOnLabelText &&
          <span className="required-asterisks"> *</span>
        }
        <span className="cr"></span>
        <span className="help-text-wrapper">
          <div className="help-text">{this.props.helperText}</div>
          {
            this.props.requiredAsteriskOnHelperText &&
            <span className="required-asterisks"> *</span>
          }
        </span>
      </label>
    )
  }
}
