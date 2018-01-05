import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {observable, computed} from 'mobx';

@observer
export default class RadioInput extends React.Component {

  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    helperText: PropTypes.string,
    handleOnChange: PropTypes.func,
    checked: PropTypes.bool,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    id: '',
    value: '',
    checked: false,
    disabled: false
  }

  handleOnChange = (event) => {
    if(this.props.disabled) {
      event.preventDefault();
    } else {
      if (this.props.handleOnChange) {
        this.props.handleOnChange(event.target);
      }
      this.hasBeenVisited = true;
    }
  }

  render() {
    return (
      <label className="radio-label">
        <input type="radio"
          name={title}
          value={title}
          checked={this.props.checked}
          onChange={this.handleOnChange}/>
        {title}
        <span className="cr"></span>
        <span className="subtitle-wrapper">
          <div className="help-text">{subTitle}</div>
          {
            title === 'Subscribe to alerts' && this.store.values.gtocSelection === 'Subscribe to alerts' &&
            <span className="required-asterisks"> *</span>
          }
        </span>
      </label>
    )
  }

}
