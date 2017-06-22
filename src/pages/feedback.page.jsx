import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {history} from '../core/services/history.service';

@inject('store')
@observer
export default class FeedbackPage extends React.Component {

  static propTypes = {
    store: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.feedbackStore = this.props.store.feedbackStore;
  }

  componentWillUnmount() {
    console.log('modal   ', this.feedbackStore.formHasEntries);
    if (this.feedbackStore.formHasEntries && !this.feedbackStore.hasBeenSubmitted) {
        this.feedbackStore.toggleExitModal();
        history.goBack();
      }
    if (this.feedbackStore.hasBeenSubmitted) {
      this.feedbackStore.toggleHasBeenSubmitted();
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.feedbackStore.submitForm(e.target);
  }

  handleOnChange = (e) => {
    e.preventDefault();
    this.feedbackStore.changeValue(e.target);
  }

  handleOnBlur = (e) => {
    e.preventDefault();
    this.feedbackStore.validateInput(e.target);
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
    history.replace('/');
  }

  renderExitModal = () => {
    return (
      <div>
        <div id="customer-feedback-exit-modal" className="modal fade in">
          <div className="modal-dialog">
            <div className="modal-content">
              <button type="button" className="btn close-modal icon-close" onClick={this.toggleExitModal}>
                <span className="sr-only">close window</span>
              </button>
              <div className="row no-gutters">
                <div className="col-xs-12">
                  <h1 className="as-h2">Unsaved changes</h1>
                  <p>Your form changes will not be saved if you navigate away from this page.</p>
                </div>
                <div className="col-xs-12 text-center">
                  <button className='fn-primary' onClick={this.toggleExitModal}>Stay on Page</button>
                  <button className='fn-secondary' onClick={this.discardFormChanges}>Discard Changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade in" ></div>
      </div>
    )
  }

  renderSuccessPage = () => {
    return (
      <div>
        <div id="customer-feedback-success">
          <div className="success-content">
            <h1>Thanks for your feedback!</h1>
            <p>We appreciate you taking the time to provide your thoughts about this site. Your comments will help us to improve our tools going forward.</p>
            <button className='fn-primary' onClick={this.discardFormChanges}>Return Home</button>
          </div>
        </div>
      </div>
    )
  }

  renderAlertBar = () => {
    return (
      <div>
        <div role="alert" className="alert alert-error">
          <button type="button" className="close_btn" onClick={this.toggleAlertBar}>
            <span aria-hidden="true">X</span>
            <span className="sr-only">Close alert</span>
          </button>
          <p><strong>Error: </strong>Please correct the errors below</p>
        </div>
      </div>
    )
  }

  renderFeedbackForm = () => {
    return (
      <section className='content-wrapper'>
        <div className='container'>
            <div className='row text-center'>
              <div className='col-xs-offset-1 col-xs-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6'>
                <h1>Give Us Feedback</h1>
              </div>
            </div>
            <div className='row'>

              <section>
                <form className="feedback-form col-xs-offset-1 col-xs-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6" onSubmit={this.handleSubmit}>
                  {this.feedbackStore.showAlertBar && this.renderAlertBar()}
                  <div className={this.feedbackStore.hasErrors.feedback_title ? 'form-group has-error' : 'form-group'}>
                    <label className='control-label' htmlFor='feedback_title'>Title<span className='required-asterisks'> *</span></label><br />
                    {this.feedbackStore.hasErrors.feedback_title &&
                      <label className='control-label' htmlFor="feedback_title"><span>Please title your feedback</span></label>
                    }
                    <input type='text' id='feedback_title' maxLength="250" className='form-control input-lg' value={this.feedbackStore.feedbackObject.feedback_title} onChange={this.handleOnChange} onBlur={this.handleOnBlur}/>
                  </div>
                  <div className={this.feedbackStore.hasErrors.feedback_topic ? 'form-group has-error' : 'form-group'}>
                    <label className='control-label' htmlFor='feedback_topic'>Topic<span className='required-asterisks'> *</span></label><br />
                    {this.feedbackStore.hasErrors.feedback_topic &&
                      <label className='control-label' htmlFor="feedback_topic"><span>Please select a topic</span></label>
                    }
                    <select id='feedback_topic' className='form-control form-control-lg' value={this.feedbackStore.feedbackObject.feedback_topic} onChange={this.handleOnChange} onBlur={this.handleOnBlur}>
                      <option value='' hidden>Select Feedback Topic</option>
                      <option value='System Performance'>System Performance</option>
                      <option value='App Management'>App Management</option>
                      <option value='Network Status'>Network Status</option>
                      <option value='Purchasing and Provisioning'>Purchasing & Provisioning</option>
                      <option value='Account Management'>Account Management</option>
                      <option value='Other'>Other</option>
                    </select>
                  </div>
                  <div className={this.feedbackStore.hasErrors.feedback_details ? 'form-group has-error' : 'form-group'}>
                    <label className='control-label' htmlFor='feedback_details'>Details<span className='required-asterisks'> *</span></label><br />
                    {this.feedbackStore.hasErrors.feedback_details &&
                      <label className='control-label' htmlFor="feedback_details"><span>Please summarize your feedback</span></label>
                    }
                    <textarea type='text' id='feedback_details' maxLength="10000" className='form-control' rows="7" value={this.feedbackStore.feedbackObject.feedback_details} onChange={this.handleOnChange} onBlur={this.handleOnBlur}/>
                  </div>
                  <div>
                    <p>
                      Your feedback will help us improve your experience. We cannot respond directly to feedback comments, but can follow up with you if you leave your email below. For immediate help, please contact us directly at <a href="tel:+18005747000">1-800-574-7000</a>.
                    </p>
                  </div>
                  <div className='form-group'>
                    <label className='control-label' htmlFor='feedback_email'>Email (Optional)</label>
                    <input type='email' id='feedback_email' className='form-control input-lg' value={this.feedbackStore.feedbackObject.feedback_email} onChange={this.handleOnChange}/>
                  </div>
                  <div className='form-group text-center'>
                    <button type='submit' className={this.feedbackStore.requiredFieldsEntered ? 'feedback-btn fn-primary' : 'feedback-btn fn-primary disabled'} aria-labelledby='feedback-form'>
                      Submit Feedback
                    </button>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </section>
    )
  }

  render() {
    return (
      <article id='customer-feedback-page'>
          {this.feedbackStore.hasBeenSubmitted
            ? this.renderSuccessPage()
            : this.renderFeedbackForm()
          }
          {this.feedbackStore.showExitModal && this.renderExitModal()}
      </article>
    )
  }
}
