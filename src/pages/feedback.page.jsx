import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {history} from '../core/services/history.service';
import $ from 'jquery';
import config from 'config';

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
    if (this.feedbackStore.hasBeenSubmitted) {
      this.feedbackStore.toggleHasBeenSubmitted();
    }
    if (!this.feedbackStore.formHasEntries && !this.feedbackStore.formIsValid) {
      this.feedbackStore.clearFeedbackForm();
    }
  }

  componentDidUpdate() {
    if (this.feedbackStore.hasBeenSubmitted) {
      this.refs.success.children[0].scrollIntoView();
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.feedbackStore.submitForm(e.target);
  }

  handleOnChange = (e, num) => {
    e.preventDefault();
    this.feedbackStore.changeValue(e.target, num);
  }

  handleOnBlur = (e) => {
    e.preventDefault();
    this.feedbackStore.validateInput(e.target);
  }

  handleAlertFocus = () => {
    if (this.feedbackStore.showAlertBar) {
      $('#feedback-alert').focus();
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
    this.feedbackStore.clearFeedbackForm();
    if (this.feedbackStore.hasBeenSubmitted) {
      this.feedbackStore.toggleHasBeenSubmitted();
    }
    history.replace(this.feedbackStore.interceptedRoute);
  }

  showModal = (shouldShow, modalID) => {
    this.headerStore.closeAdminSubMenu();
    if (shouldShow) {
      $(modalID).modal({backdrop:'static'});
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
      <div id="customer-feedback-exit-modal" tabIndex="-1" role="dialog" className="modal fade" aria-labelledby="feedback-modal-title">
        <div>
          <div className="modal-dialog">
            <div className="modal-content">
              <button type="button" className="fn-modal-close" onClick={this.toggleExitModal}>
                <i aria-hidden="true" className="icon-close"></i>
                <span className="sr-only">close window</span>
              </button>
              <div className="row no-gutters">
                <div className="col-xs-12">
                  <h1 id="feedback-modal-title" aria-hidden="true">Unsaved changes</h1>
                  <p aria-hidden="true">Your form changes will not be saved if you navigate away from this page.</p>
                  <span className="sr-only">Unsaved changes. Your form changes will not be saved if you navigate away from this page.</span>
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

  renderSuccessPage = () => {
    return (
      <div>
        <div id="customer-feedback-success" ref="success">
          <div className="success-content">
            <h1>Thanks for your feedback!</h1>
            <p>We appreciate you taking the time to provide your thoughts about this site. Your comments will help us to improve our tools going forward.</p>
            <button className="fn-primary" onClick={this.discardFormChanges}>Return Home</button>
          </div>
        </div>
      </div>
    )
  }

  renderAlertBar = () => {
    return (
      <div>
        <div role="alert" id="feedback-alert" ref={this.handleAlertFocus} className="alert alert-error" aria-live="assertive" aria-atomic="true" tabIndex="0">
          <button type="button" className="close_btn" onClick={this.toggleAlertBar}>
            <span aria-hidden="true" className="icon-close" />
            <span className="sr-only">Close alert</span>
          </button>
          <p><strong>Error: </strong>Please correct the errors below</p>
        </div>
      </div>
    )
  }

  renderFeedbackForm = () => {
    return (
      <section className="content-wrapper">
        <div className="container">
            <div className="row text-center">
              <div className="col-xs-offset-1 col-xs-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
                <h1>Give Us Feedback</h1>
              </div>
            </div>
            <div className="row">

              <section>
                <form id="feedback-form" className="col-xs-offset-1 col-xs-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6" noValidate onSubmit={this.handleSubmit}>
                  {this.feedbackStore.showAlertBar && this.renderAlertBar()}
                  <div className={this.feedbackStore.hasErrors.feedback_title ? 'form-group has-error' : 'form-group'}>
                    <label className="control-label" htmlFor="feedback_title">Title<span className="required-asterisks"> *</span></label><br />
                    {this.feedbackStore.hasErrors.feedback_title &&
                      <label className="control-label" htmlFor="feedback_title"><span>Please title your feedback</span></label>
                    }
                    <input type="text" id="feedback_title" className="form-control input-lg" value={this.feedbackStore.feedbackObject.feedback_title} onChange={(e) => this.handleOnChange(e, 250)} onBlur={this.handleOnBlur}/>
                  </div>
                  <div className={this.feedbackStore.hasErrors.feedback_topic ? 'form-group has-error' : 'form-group'}>
                    <label className="control-label" htmlFor="feedback_topic">Topic<span className="required-asterisks"> *</span></label><br />
                    {this.feedbackStore.hasErrors.feedback_topic &&
                      <label className="control-label" htmlFor="feedback_topic"><span>Please select a topic</span></label>
                    }
                    <select id="feedback_topic" className="form-control form-control-lg" value={this.feedbackStore.feedbackObject.feedback_topic} onChange={(e) => this.handleOnChange(e, 10000)} onBlur={this.handleOnBlur}>
                      <option value="" hidden>Select Feedback Topic</option>
                      <option value="System Performance">System Performance</option>
                      {this.userStore.isAdmin && <option value="App Management">App Management</option> }
                      <option value="Network Status">Network Status</option>
                      {this.userStore.isAdmin && <option value="Purchasing and Provisioning">Purchasing & Provisioning</option>}
                      {this.userStore.isAdmin && <option value="Account Management">Account Management</option>}
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className={this.feedbackStore.hasErrors.feedback_details ? 'form-group has-error' : 'form-group'}>
                    <label className="control-label" htmlFor="feedback_details">Details<span className="required-asterisks"> *</span></label><br />
                    {this.feedbackStore.hasErrors.feedback_details &&
                      <label className="control-label" htmlFor="feedback_details"><span>Please summarize your feedback</span></label>
                    }
                    <textarea type="text" id="feedback_details" className="form-control" value={this.feedbackStore.feedbackObject.feedback_details} onChange={(e) => this.handleOnChange(e, 10000)} onBlur={this.handleOnBlur}/>
                  </div>
                  <div>
                    <p className="feedback-text">
                      Your feedback will help us improve your experience. We cannot respond directly to feedback comments, but can follow up with you if you leave your email below. For immediate help, please contact us directly at <a href={`tel:${config.attCustomerSupportPhone}`}>{`${config.attCustomerSupportPhone}`}</a>.
                    </p>
                  </div>
                  <div className={this.feedbackStore.hasErrors.feedback_email ? 'form-group has-error' : 'form-group'}>
                    <label className="control-label" htmlFor="feedback_email">Email (Optional)</label>
                      {this.feedbackStore.hasErrors.feedback_email &&
                        <label className="control-label" htmlFor="feedback_email"><span>Please enter a valid email address</span></label>
                      }
                    <input type="email" id="feedback_email" className="form-control input-lg" value={this.feedbackStore.feedbackObject.feedback_email} onChange={(e) => this.handleOnChange(e, 10000)} onBlur={this.handleOnBlur} />
                  </div>
                  <div className="form-group text-center">
                    <button type="submit" onClick={this.handleAlertFocus} className={this.feedbackStore.requiredFieldsEntered ? 'feedback-btn fn-primary' : 'feedback-btn fn-primary disabled'} aria-labelledby="feedback-form">
                      Submit Feedback
                    </button>
                  </div>
                </form>
              </section>
            </div>
          </div>

          {this.renderExitModal(this.feedbackStore.showExitModal)}

        </section>
    )
  }

  render() {
    return (
      <article id="customer-feedback-page">
          {this.feedbackStore.hasBeenSubmitted
            ? this.renderSuccessPage()
            : this.renderFeedbackForm()
          }
      </article>
    )
  }
}
