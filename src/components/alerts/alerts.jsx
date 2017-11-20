import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
export default class Alerts extends React.Component {

    static propTypes = {
      showAlert: PropTypes.bool,
      alertText: PropTypes.string,
      clearAlert: PropTypes.func,
      showSuccess: PropTypes.bool,
      successText: PropTypes.string,
      clearSuccess: PropTypes.func,
      formColClass: PropTypes.string
    }

    static defaultProps = {
      showAlert: false,
      alertText: 'Please fix the following errors.',
      showSuccess: false,
      successText: 'Your submission was successful.',
      formColClass: ''
    }

    renderAlert = () => {
      return (
        <div className="alert alert-error">
          <button type="button" className="close_btn icon-close" onClick={this.props.clearAlert}>
            <span className="sr-only">Close alert</span>
          </button>
          <p role="alert" aria-live="assertive">
            <strong>Error: </strong>{this.props.alertText}
          </p>
        </div>
      )
    }

    renderSuccess = () => {
      return (
        <div className="alert alert-success">
          <button type="button" className="close_btn icon-close" onClick={this.props.clearSuccess}>
            <span className="sr-only">Close alert</span>
          </button>
          <p role="alert" aria-live="assertive">
            <strong>Success! </strong>{this.props.successText}
          </p>
        </div>
      )
    }

    render () {
      return (
        <div className={`alert-bars ${this.props.formColClass}`}>
          {this.props.showAlert && this.renderAlert()}
          {this.props.showSuccess && this.renderSuccess()}
        </div>
      )
  }
}
