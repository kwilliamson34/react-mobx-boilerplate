/**
 * asForm Higher Order Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import {history} from '../../core/services/history.service';
import {observer} from 'mobx-react';
import {observable, computed, autorun} from 'mobx';
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
        updateAlert: PropTypes.func,
        updateSuccess: PropTypes.func,
        alertToDisplay: PropTypes.string,
        successToDisplay: PropTypes.string,
        submitButtonText: PropTypes.string //optional computed, overwrites attribute and default
      }),
      disabled: PropTypes.bool,
      suppressAlertBars: PropTypes.bool
    }

    static defaultProps = {
      disabled: false,
      suppressAlertBars: false
    }

    constructor (props) {
      super(props)
      this.store = this.props.store;

      autorun(() => {
        // pause before announcing errors, so that Assertive alert doesn't interrupt Polite field errors
        if(this.announceErrors !== this.showAlertBar) {
          setTimeout(() => {
            this.announceErrors = this.showAlertBar;
          }, 1000)
        }
      });
    }

    @observable announceErrors = false;

    @computed get showAlertBar() {
      return this.store.alertToDisplay != undefined && this.store.alertToDisplay.length > 0;
    }

    @computed get alertMessage() {
      return this.store.alertToDisplay === 'DEFAULT' ? 'Please fix the following errors.' : this.store.alertToDisplay;
    }

    @computed get showSuccessBar() {
      return this.store.successToDisplay != undefined && this.store.successToDisplay.length > 0;
    }

    @computed get successMessage() {
      return this.store.successToDisplay === 'DEFAULT' ? 'Your submission was successful.' : this.store.successToDisplay;
    }

    clearAlert = () => {
      if(this.store.updateAlert) {
        this.store.updateAlert('');
      }
    }

    clearSuccess = () => {
      if(this.store.updateSuccess) {
        this.store.updateSuccess('');
      }
    }

    componentWillMount() {
      this.interceptedRoute = '';
      this.includeDivider = attributes && attributes.includeDivider;
      this.secondaryButtonText = attributes && attributes.secondaryButtonText ? attributes.secondaryButtonText : '';
      this.formColClass = attributes && attributes.formColClass ? attributes.formColClass : '';

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
      this.clearAlert();
      this.clearSuccess();

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
        <div className="form-group button-wrapper">
          <button type="button" onClick={this.handleSubmit} className={`fn-primary form-submit ${(this.props.disabled || this.store.formHasError) ? 'disabled' : ''}`}>
            {submitButtonText}
          </button>
        </div>
      )
    }

    renderSecondaryButton = () => {
      return (
        <div className="form-group button-wrapper">
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
        this.store.updateAlert('Please make a change to continue, or discard.');
      } else {
        this.store.submitForm();
      }
    }

    showAllFormErrors = () => {
      //manage the alert bar first, so that it's read first
      this.store.updateAlert('Please fix the following errors.');

      this.store.formFieldRefList.forEach(ref => {
        if(ref && ref.hasFunctionalError) {
          ref.hasVisibleError = ref.hasFunctionalError;
        }
      });
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
            {!this.props.suppressAlertBars &&
              <Alerts
                showAlert={this.showAlertBar}
                alertText={this.alertMessage}
                clearAlert={this.clearAlert.bind(this)}
                showSuccess={this.showSuccessBar}
                successText={this.successMessage}
                clearSuccess={this.clearSuccess.bind(this)}
                formColClass={this.formColClass}/>}

            <MyComponent {...this.props} announceErrors={this.announceErrors}/>

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
