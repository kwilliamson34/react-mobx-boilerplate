/**
 * asForm Higher Order Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import {history} from '../../core/services/history.service';
import {observer} from 'mobx-react';
import {observable, computed, autorun} from 'mobx';
import Alerts from '../alerts/alerts';
import Modal from '../portals/modal';

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
      suppressAlertBars: PropTypes.bool,
      persistAlertBars: PropTypes.bool
    }

    static defaultProps = {
      disabled: false,
      suppressAlertBars: false,
      persistAlertBars: false
    }

    constructor (props) {
      super(props)
      this.store = this.props.store;

      autorun(() => {
        // pause before announcing errors, so that Assertive alert doesn't interrupt Polite field errors
        if(this.announceErrors !== this.showAlertBar) {
          setTimeout(() => {
            this.announceErrors = this.showAlertBar;
          }, 200)
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

    componentWillMount() {
      this.interceptedRoute = '';
      this.includeDivider = attributes && attributes.includeDivider;
      this.secondaryButtonText = (attributes && attributes.secondaryButtonText) ? attributes.secondaryButtonText : '';
      this.formColClass = (attributes && attributes.formColClass) ? attributes.formColClass : '';
    }

    componentDidMount() {
      //set up reroute blockade (returns unblocking function)
      this.unblock = history.block((location) => {
        if (this.store.formIsDirty && !this.props.disabled) {
          this.interceptedRoute = location.pathname;
          this.exitModal.showModal();
          return false; //does not allow to proceed to new page
        }
      });
    }

    componentWillUnmount() {
      if(!this.props.persistAlertBars) {
        this.clearAlert();
        this.clearSuccess();
      }

      //undo the reroute blockade
      this.unblock();
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

      //show all errors that aren't already shown, triggering screen reader
      this.store.formFieldRefList.forEach(ref => {
        if(ref && ref.hasFunctionalError) {
          ref.hasVisibleError = ref.hasFunctionalError;
        }
      });

      //TODO: move keyboard focus to first input with error?
    }

    handleSecondaryAction = (event) => {
      event.preventDefault();
      if(this.store.handleSecondaryAction) {
        this.store.handleSecondaryAction();
      }
    }

    stayOnPage = (e) => {
      e.preventDefault();
      this.exitModal.hideModal();
      this.interceptedRoute = '';
    }

    discardFormChanges = (e) => {
      e.preventDefault();
      this.exitModal.hideModal();
      this.store.clearForm();
      history.replace(this.interceptedRoute);
    }

    render () {
      const formChildProps = {
        dataObject: this.store.values,
        announceError: this.announceErrors
      }
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

            <MyComponent {...this.props} formChildProps={formChildProps}/>

            <div className={`form-actions ${this.formColClass}`}>
              {this.includeDivider ? <hr/> : ''}
              {this.renderSubmitButton()}
              {this.secondaryButtonText ? this.renderSecondaryButton() : ''}
            </div>
          </form>
          <Modal
            id="exit-modal"
            title="Unsaved changes"
            ref={i => this.exitModal = i}
            primaryAction={this.discardFormChanges}
            primaryButtonLabel="Discard Changes"
            secondaryAction={this.stayOnPage}
            secondaryButtonLabel="Stay On Page">
            <p>Your form changes will not be saved if you navigate away from this page.</p>
          </Modal>
        </section>
      )
    }
  }
}
