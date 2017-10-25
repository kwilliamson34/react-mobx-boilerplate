/**
 * asForm Higher Order Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import {history} from '../../core/services/history.service';
import {observer} from 'mobx-react';
import Alerts from '../alerts/alerts';
import $ from 'jquery';

@observer
export default function asForm (MyComponent, attributes) {
  return class Form extends React.Component {
    static propTypes = {
      store: PropTypes.shape({
        clearForm: PropTypes.func,
        submitForm: PropTypes.func,
        handleSecondaryAction: PropTypes.func,
        formIsDirty: PropTypes.bool,
        formHasError: PropTypes.bool,
        showAlert: PropTypes.bool,
        alertText: PropTypes.string,
        successText: PropTypes.string,
        submitButtonText: PropTypes.string //optional computed, overwrites attribute and default
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
      this.secondaryButtonText = attributes && attributes.secondaryButtonText ? attributes.secondaryButtonText : '';
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

    renderSubmitButton = () => {
      let submitButtonText = 'Submit';
      if(attributes && attributes.submitButtonText) {
        submitButtonText = attributes.submitButtonText;
      }
      if(this.store.submitButtonText) {
        submitButtonText = this.store.submitButtonText;
      }
      return (
        <div className="form-group text-center submit-button-wrapper">
          <button type="button" onClick={this.handleSubmit} className={`fn-primary form-submit ${(this.props.disabled || this.store.formHasError) ? 'disabled' : ''}`}>
            {submitButtonText}
          </button>
        </div>
      )
    }

    renderSecondaryButton = () => {
      return (
        <div className="form-group text-center submit-button-wrapper">
          <button type="button" onClick={this.handleSecondaryAction} className='fn-secondary form-submit'>
            {this.secondaryButtonText}
          </button>
        </div>
      )
    }

    handleSubmit = (event) => {
      event.preventDefault();
      if(this.store.formHasError) {
        this.showAllFormErrors();
      } else if(!this.store.formIsDirty) {
        this.store.alertText = 'Please make a change to continue, or discard.';
        this.store.showAlert = true;
      } else {
        this.store.submitForm();
      }
    }

    showAllFormErrors = () => {
      this.store.formFieldRefList.forEach(ref => {
        if(ref && ref.hasFunctionalError) {
          ref.hasVisibleError = ref.hasFunctionalError;
        }
      });
      this.store.alertText = 'Please fix the following errors.';
      this.store.showAlert = true;
    }

    handleSecondaryAction = (event) => {
      event.preventDefault();
      if(this.store.handleSecondaryAction) {
        this.store.handleSecondaryAction();
      }
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
                <div className="row no-gutters" id="modal-title">
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
            <Alerts showAlert={this.store.showAlert} alertText={this.store.alertText} clearAlert={this.store.clearAlert.bind(this.store)} showSuccess={this.store.showSuccess} successText={this.store.successText} clearSuccess={this.store.clearSuccess.bind(this.store)} formColClass={this.formColClass}/>

            <MyComponent {...this.props}
              showExitModal={this.showExitModal}
              hideExitModal={this.hideExitModal}/>

            <div className={`form-actions ${this.formColClass}`}>
              {this.includeDivider ? <hr/> : ''}
              {this.renderSubmitButton()}
              {this.secondaryButtonText ? this.renderSecondaryButton() : ''}
            </div>
          </form>
          {this.renderExitModal()}
        </section>
      )
    }
  }
}
