import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
export default class FormLabel extends React.Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    charLimitMessage: PropTypes.string,
    labelText: PropTypes.string.isRequired,
    helperText: PropTypes.string,
    hasError: PropTypes.bool,
    errorMessage: PropTypes.string,
    fieldIsRequired: PropTypes.bool,
    srOnly: PropTypes.bool
  }

  static defaultProps = {
    helperText: '',
    hasError: false,
    errorMessage: 'This field has an error',
    fieldIsRequired: false
  }

  renderFieldError () {
    let markup = '';
    if(this.props.charLimitMessage || this.props.hasError){
      markup = (
        <div className="msgBlock error error-list" role="alert" aria-live="polite">
					{this.props.charLimitMessage && (this.props.charLimitMessage)}
					{this.props.hasError && (<span>{this.props.errorMessage}</span>)}
        </div>
			);
    }
    return markup;
  }

  render() {
    return (
      <div className="form-label">
        <label className={`control-label ${this.props.srOnly ? 'sr-only' : ''}`} htmlFor={this.props.id}>
          {this.props.labelText}
          {this.props.fieldIsRequired &&
            <span className="required-asterisks"> *</span>
          }
          {this.props.helperText ? <span className="help-text">{this.props.helperText}</span> : ''}
        </label>
        {this.renderFieldError()}
      </div>
    )
  }
}
