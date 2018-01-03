import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
export default class FormLabel extends React.Component {

  static propTypes = {
    htmlFor: PropTypes.string,
    labelText: PropTypes.string.isRequired,
    helperText: PropTypes.string,
    hasError: PropTypes.bool,
    errorMessage: PropTypes.string,
    charLimitReached: PropTypes.bool,
    fieldIsRequired: PropTypes.bool,
    showRequiredAsterisk: PropTypes.bool,
    labelTextIsSrOnly: PropTypes.bool,
    labelErrorIsSrOnly: PropTypes.bool,
    announceError: PropTypes.bool
  }

  static defaultProps = {
    htmlFor: '',
    helperText: '',
    hasError: false,
    errorMessage: 'This field has an error',
    labelTextIsSrOnly: false,
    labelErrorIsSrOnly: false,
    fieldIsRequired: false,
    showRequiredAsterisk: true
  }

  renderFieldError() {
    /* Screen reader section should always be present, not conditionally
    rendered, to allow aria to manage changes appropriately. */
    return (
      <div className={`msgBlock error error-list ${this.props.labelErrorIsSrOnly ? 'sr-only' : ''}`}>
        <span role="alert" aria-live="assertive" aria-atomic="true">
          {this.props.charLimitReached ? 'Character limit reached.' : ''}
        </span>
        <span role={this.props.announceError ? 'status' : ''} aria-live={this.props.announceError ? 'polite' : ''} aria-atomic="true">
          {this.props.hasError ? this.props.errorMessage : ''}
        </span>
      </div>
    );
  }

  render() {
    const TagName = this.props.htmlFor ? 'label' : 'legend';
    return (
      <div className="form-label">
        <TagName className={`control-label ${this.props.labelTextIsSrOnly && this.props.labelErrorIsSrOnly ? 'sr-only' : ''}`} htmlFor={this.props.htmlFor}>
          <span className={`${this.props.labelTextIsSrOnly ? 'sr-only' : ''}`}>{this.props.labelText}</span>
          {this.props.fieldIsRequired && this.props.showRequiredAsterisk ? <span className="required-asterisks"> *</span> : ''}
          {this.props.helperText ? <span className="help-text">{this.props.helperText}</span> : ''}
          {this.renderFieldError()}
        </TagName>
      </div>
    )
  }
}
