import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {history} from '../core/services/history.service';
import $ from 'jquery';
import config from 'config';
import {FormTemplate} from '../components/form-template/form-template';

@inject('store')
@observer
export default class FeedbackPage extends React.Component {

  static propTypes = {
    store: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.userStore = this.props.store.userStore;
    this.feedbackStore = this.props.store.feedbackStore;
    this.headerStore = this.props.store.headerStore;
  }

  componentWillMount() {
    this.feedbackStore.setDefaultEmail();
    this.feedbackStore.enableSaveDialogs();
  }

  componentWillUnmount() {
    this.clearModals();
    this.feedbackStore.disableSaveDialogs();
    if (!this.feedbackStore.formHasEntries && !this.feedbackStore.formIsValid) {
      this.feedbackStore.clearForm();
    }
  }

  toggleExitModal = (e) => {
    e.preventDefault();
    this.feedbackStore.toggleExitModal()
  }

  toggleAlertBar = (e) => {
    e.preventDefault();
    this.feedbackStore.toggleAlertBar();
  }

  discardFormChanges = (e) => {
    e.preventDefault();
    this.feedbackStore.clearForm();
    history.replace(this.feedbackStore.interceptedRoute);
  }

  showModal = (shouldShow, modalID) => {
    if (shouldShow) {
      $(modalID).modal({backdrop: 'static'});
    } else {
      $(modalID).modal('hide');
      $(modalID).data('bs.modal', null);
    }
  }

  clearModals = () => {
    $('.modal-backdrop, #customer-feedback-exit-modal').remove();
    $('body').removeClass('modal-open');
  }

  renderExitModal = (showExitModal) => {
    this.showModal(showExitModal, '#customer-feedback-exit-modal');
    return (
      <div id="customer-feedback-exit-modal" role="dialog" tabIndex="-1" className="modal fade" aria-labelledby="feedback-modal-title">
        <div>
          <div className="modal-dialog">
            <div className="modal-content">
              <button type="button" className="fn-modal-close" onClick={this.toggleExitModal}>
                <i aria-hidden="true" className="icon-close"></i>
                <span className="sr-only">close window</span>
              </button>
              <div className="row no-gutters" id="feedback-modal-title">
                <div className="col-xs-12">
                  <h1 className="as-h2">Unsaved changes</h1>
                  <p>Your form changes will not be saved if you navigate away from this page.</p>
                </div>
                <div className="col-xs-12 text-center">
                  <button className="fn-primary" onClick={this.toggleExitModal}>Stay on Page</button>
                  <button className="fn-secondary" onClick={this.discardFormChanges}>Discard Changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  getInputList = () => {
    let adminOptions = [
      {value: 'System Performance', title: 'System Performance'},
      {value: 'App Management', title: 'App Management'},
      {value: 'Network Status', title: 'Network Status'},
      {value: 'Purchasing and Provisioning', title: 'Purchasing and Provisioning'},
      {value: 'Account Management', title: 'Account Management'},
      {value: 'Other', title: 'Other'}
    ];
    let nonAdminOptions = [
      {value: 'System Performance', title: 'System Performance'},
      {value: 'Network Status', title: 'Network Status'},
      {value: 'Other', title: 'Other'}
    ];

    return [
      {
        id: 'feedback_title',
        label: 'Title',
        value: this.feedbackStore.feedbackObject.feedback_title,
        hasError: this.feedbackStore.hasErrors.feedback_title,
        charLimit: 250
      }, {
        id: 'feedback_topic',
        type: 'select',
        label: 'Topic',
        placeholder: 'Select Feedback Topic',
        value: this.feedbackStore.feedbackObject.feedback_topic,
        optionsList: this.userStore.isAdmin
          ? adminOptions
          : nonAdminOptions,
        hasError: this.feedbackStore.hasErrors.feedback_topic
      }, {
        id: 'feedback_details',
        type: 'textarea',
        label: 'Details',
        genericLabel: 'summary of your feedback',
        value: this.feedbackStore.feedbackObject.feedback_details,
        hasError: this.feedbackStore.hasErrors.feedback_details,
        charLimit: 10000
      }, {
        type: 'textblock',
        body: `Your feedback will help us improve your experience. We cannot respond directly to feedback comments, but can follow up with you if you leave your email below. For immediate help, please contact us directly at <a href='tel:${config.attCustomerSupportPhone}'>${config.attCustomerSupportPhone}</a>.`
      }, {
        id: 'feedback_email',
        label: 'Email (Optional)',
        genericLabel: 'valid email address',
        value: this.feedbackStore.feedbackObject.feedback_email,
        hasError: this.feedbackStore.hasErrors.feedback_email,
        charLimit: 10000
      }
    ];
  }

  render = () => {
    return (
      <section id="customer-feedback-page">
        <div className="content-wrapper">
          <div className="container">
            <div className="row text-center">
              <div className="col-xs-offset-1 col-xs-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
                <h1>Give Us Feedback</h1>
              </div>
            </div>
            <div className="row">
              <section className="col-xs-offset-1 col-xs-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
                <FormTemplate id="feedback-form"
                  ref={ref => this.form = ref}
                  inputList={this.getInputList() || []}
                  onSubmit={this.feedbackStore.handleSubmit.bind(this.feedbackStore)}
                  onChange={this.feedbackStore.handleChange.bind(this.feedbackStore)}
                  onBlur={this.feedbackStore.handleBlur.bind(this.feedbackStore)}
                  errorBody={this.feedbackStore.showAlertBar ? 'Please correct the errors below.' : ''}
                  toggleAlertBar={this.feedbackStore.toggleAlertBar.bind(this.feedbackStore)}
                  submitButtonDisabled={!this.feedbackStore.requiredFieldsEntered}
                  submitButtonText='Submit Feedback'/>
              </section>
            </div>
          </div>
        </div>
        {this.renderExitModal(this.feedbackStore.showExitModal)}
      </section>
    )
  }
}
