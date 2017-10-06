/**
 * asForm Higher Order Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import {history} from '../../core/services/history.service';
import $ from 'jquery';

export default function asForm (MyComponent, attributes) {
  return class Form extends React.Component {
    static propTypes = {
      store: PropTypes.shape({
        clearForm: PropTypes.func,
        submitForm: PropTypes.func,
        formIsDirty: PropTypes.bool,
        formHasError: PropTypes.bool,
        showAlert: PropTypes.bool,
        alertText: PropTypes.string,
        successText: PropTypes.string
      }),
      disabled: PropTypes.bool
    }

    static defaultProps = {
      disabled: false
    }

    constructor (props) {
      super(props)
      this.store = this.props.store;
    }

    componentWillMount() {
      this.interceptedRoute = '';
      this.includeDivider = attributes && attributes.includeDivider;
      this.submitButtonText = attributes && attributes.submitButtonText ? attributes.submitButtonText : 'Submit';
      this.discardButtonText = attributes && attributes.discardButtonText ? attributes.discardButtonText : '';
      this.formColClass = attributes && attributes.formColClass ? attributes.formColClass : ''
      if(!this.store.alertText) {
        this.store.alertText = 'Please fix the following errors.';
      }
      if(!this.store.successText) {
        this.store.successText = 'Your submission was successful.';
      }

      //set up reroute blockade (returns unblocking function)
      this.unblock = history.block((location) => {
        if (this.store.formIsDirty && !this.props.disabled) {
          this.interceptedRoute = location.pathname;
          this.showExitModal();
          return false; //does not allow to proceed to new page
        }
      });
    }

    componentWillUnmount() {
      //undo the reroute blockade
      this.unblock();
    }

    showAlert = () => {
      this.store.showAlert = true;
    }

    clearAlert = () => {
      this.store.showAlert = false;
    }

    showSuccess = () => {
      this.store.showSuccess = true;
    }

    clearSuccess = () => {
      this.store.showSuccess = false;
    }

    renderAlert = () => {
      return (
        <div className="alert alert-error">
          <button type="button" className="close_btn icon-close" onClick={this.clearAlert}>
            <span className="sr-only">Close alert</span>
          </button>
          <p role="alert" aria-live="assertive">
            <strong>Error:&nbsp;</strong>{this.store.alertText}
          </p>
        </div>
      )
    }

    renderSuccess = () => {
      return (
        <div className="alert alert-success">
          <button type="button" className="close_btn icon-close" onClick={this.clearSuccess}>
            <span className="sr-only">Close alert</span>
          </button>
          <p role="alert" aria-live="assertive">
            <strong>Success!&nbsp;</strong>{this.store.successText}
          </p>
        </div>
      )
    }

    renderSubmitButton = () => {
      return (
        <div className="form-group text-center submit-button-wrapper">
          <button type="button" onClick={this.handleSubmit} className={`fn-primary form-submit ${(this.props.disabled || this.store.formHasError) ? 'disabled' : ''}`}>
            {this.submitButtonText}
          </button>
        </div>
      )
    }

    renderDiscardButton = () => {
      return (
        <div className="form-group text-center submit-button-wrapper">
          <button type="button" onClick={this.handleDiscard} className='fn-secondary form-submit'>
            {this.discardButtonText}
          </button>
        </div>
      )
    }

    handleSubmit = (event) => {
      event.preventDefault();
      this.store.submitForm();
    }

    handleDiscard = (event) => {
      event.preventDefault();
      this.store.clearForm();
      history.go(-1);
    }

    renderExitModal = () => {
      return (
        <div id="exit-modal" role="dialog" tabIndex="-1" className="modal fade" aria-labelledby="modal-title">
          <div>
            <div className="modal-dialog">
              <div className="modal-content">
                <button type="button" className="fn-modal-close" onClick={this.hideExitModal}>
                  <i aria-hidden="true" className="icon-close"></i>
                  <span className="sr-only">Close window</span>
                </button>
                <div className="row no-gutters" id="fmodal-title">
                  <div className="col-xs-12">
                    <h1 className="as-h2">Unsaved changes</h1>
                    <p>Your form changes will not be saved if you navigate away from this page.</p>
                  </div>
                  <div className="col-xs-12 text-center">
                    <button className="fn-primary" onClick={this.stayOnPage}>Stay on Page</button>
                    <button className="fn-secondary" onClick={this.discardFormChanges}>Discard Changes</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    showExitModal = () => {
      $('#exit-modal').modal({backdrop: 'static'});
      $('#exit-modal').modal('show');
    }

    hideExitModal = () => {
      $('#exit-modal').modal('hide');
      $('#exit-modal').data('bs.modal', null);
    }

    stayOnPage = (e) => {
      e.preventDefault();
      this.hideExitModal();
      this.interceptedRoute = '';
    }

    discardFormChanges = (e) => {
      e.preventDefault();
      this.hideExitModal();
      this.store.clearForm();
      history.replace(this.interceptedRoute);
    }

    render () {
      return (
        <section>
          <form noValidate>
            <div className={`alert-bars ${this.formColClass}`}>
              {this.store.showAlert && this.renderAlert()}
              {this.store.showSuccess && this.renderSuccess()}
            </div>

            <MyComponent {...this.props}
              showExitModal={this.showExitModal}
              hideExitModal={this.hideExitModal}/>

            <div className={`form-actions ${this.formColClass}`}>
              {this.includeDivider ? <hr/> : ''}
              {this.renderSubmitButton()}
              {this.discardButtonText ? this.renderDiscardButton() : ''}
            </div>
          </form>
          {this.renderExitModal()}
        </section>
      )
    }
  }
}
