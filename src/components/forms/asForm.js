/**
 * asForm Higher Order Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import {history} from '../../core/services/history.service';
import {observer} from 'mobx-react';
import $ from 'jquery';

@observer
export default function asForm (MyComponent, attributes) {
  return class Form extends React.Component {
    static propTypes = {
      store: PropTypes.shape({
        clearForm: PropTypes.func,
        submitForm: PropTypes.func,
        formIsDirty: PropTypes.bool,
        showAlert: PropTypes.bool,
        formHasError: PropTypes.bool
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
      this.alertText = attributes && attributes.alertText ? attributes.alertText : 'Please fix the following errors.';
      this.submitButtonText = attributes && attributes.submitButtonText ? attributes.submitButtonText : 'Submit';

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

    renderAlert = () => {
      return (
        <div className="alert alert-error">
          <button type="button" className="close_btn icon-close" onClick={this.clearAlert}>
            <span className="sr-only">Close alert</span>
          </button>
          <p role="alert" aria-live="assertive">
            <strong>Error:&nbsp;</strong>{this.alertText}
          </p>
        </div>
      )
    }

    renderSubmitButton = () => {
      console.log('re-rendering button...');//xxx
      console.log('disabled prop is true? ' + this.props.disabled);//xxx
      console.log('store formHasError is true? ' + this.store.formHasError);//xxx
      return (
        <div className="form-group text-center">
          <button type="button" onClick={this.handleSubmit} className={`fn-primary form-submit ${(this.props.disabled || this.store.formHasError) ? 'disabled' : ''}`}>
            {this.submitButtonText}
          </button>
        </div>
      )
    }

    handleSubmit = (event) => {
      event.preventDefault();
      this.store.submitForm();
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
            {this.store.showAlert && this.renderAlert()}
            <MyComponent {...this.props}
              showExitModal={this.showExitModal}
              hideExitModal={this.hideExitModal}/>
            {this.renderSubmitButton()}
          </form>
          {this.renderExitModal()}
        </section>
      )
    }
  }
}
