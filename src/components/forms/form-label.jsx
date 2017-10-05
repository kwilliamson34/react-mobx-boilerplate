import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
export default class FormLabel extends React.Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    hasError: PropTypes.bool,
    errorMessage: PropTypes.string,
    fieldIsRequired: PropTypes.bool,
    srOnly: PropTypes.bool
  }

  static defaultProps = {
    hasError: false,
    errorMessage: 'This field has an error',
    fieldIsRequired: false
  }

  render() {
    return (
      <div>
        <label className={`control-label ${this.props.srOnly ? 'sr-only' : ''}`} htmlFor={this.props.id}>
          {this.props.labelText}
          {this.props.fieldIsRequired &&
            <span className="required-asterisks"> *</span>
          }
        </label>
        {this.props.hasError && <div className="msgBlock error error-list" role="alert" aria-live="assertive">
          <span>{this.props.errorMessage}</span>
        </div>}
      </div>
    )
  }
}
