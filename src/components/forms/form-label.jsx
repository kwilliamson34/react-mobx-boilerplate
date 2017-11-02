import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
export default class FormLabel extends React.Component {

  static propTypes = {
    htmlFor: PropTypes.string,
    charLimitMessage: PropTypes.string,
    labelText: PropTypes.string.isRequired,
    helperText: PropTypes.string,
    hasError: PropTypes.bool,
    errorMessage: PropTypes.string,
    fieldIsRequired: PropTypes.bool,
    srOnly: PropTypes.bool
  }

  static defaultProps = {
    htmlFor: '',
    helperText: '',
    hasError: false,
    errorMessage: 'This field has an error',
    fieldIsRequired: false
  }

  renderFieldError() {
    let markup = '';
    if (this.props.charLimitMessage || this.props.hasError) {
      markup = (
        <div className="msgBlock error error-list" role="alert" aria-live="polite">
          {this.props.charLimitMessage && (this.props.charLimitMessage)}
          {this.props.hasError && (
            <span>{this.props.errorMessage}</span>
          )}
        </div>
      );
    }
    return markup;
  }

  render() {
    const TagName = this.props.htmlFor ? 'label' : 'legend';
    return (
      <div className="form-label">
        <TagName className={`control-label ${this.props.srOnly ? 'sr-only' : ''}`} htmlFor={this.props.htmlFor}>
          {this.props.labelText}
          {this.props.fieldIsRequired &&
            <span className="required-asterisks"> *</span>
          }
          {this.props.helperText ? <span className="help-text">{this.props.helperText}</span> : ''}
        </TagName>
        {this.renderFieldError()}
      </div>
    )
  }
}
