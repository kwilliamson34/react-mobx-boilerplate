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
    this.userStore = this.props.store.userStore;
  }

  componentWillMount() {
    this.feedbackStore.hasBeenSubmitted = false;
    this.feedbackStore.feedbackObject.email = this.userStore.user.email;
  }

  componentWillUnmount() {
    if (this.feedbackStore.formHasEntries && !this.feedbackStore.hasBeenSubmitted) {
        this.feedbackStore.showExitModal = true;
        history.goBack();
      }
    if (this.feedbackStore.hasBeenSubmitted === true) {
      this.feedbackStore.hasBeenSubmitted = false;
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.feedbackStore.submitForm(e.target);
  }

  handleChange = (e) => {
    e.preventDefault();
    this.feedbackStore.changeValue(e.target);
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
    this.feedbackStore.discardFormChanges();
    history.replace('/admin/');
  }

  // //TODO: julia wants errors to show up on blur. prob have to pass all the events in again.
  // validateForm = (e) => {
  //   e.preventDefault();
  //   console.log('triggered blur');
  //   this.feedbackStore.validateForm();
  // }

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
          <div className="success-content col-xs-6 col-md-8 col-md-offset-4">
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
              <div className='col-md-offset-3 col-xs-12 col-sm-offset-3 col-sm-8 col-md-6 col-md'>
                <h1>Give Us Feedback</h1>
              </div>
            </div>
            <div className='row'>

              <section>
                <form className="feedback-form col-md-offset-3 col-xs-12 col-sm-offset-3 col-sm-8 col-md-6 col-md" onSubmit={this.handleSubmit}>
                  {this.feedbackStore.showAlertBar && this.renderAlertBar()}
                  <div className={this.feedbackStore.hasErrors.title ? 'form-group has-error' : 'form-group'}>
                    <label className='control-label' htmlFor='feedback-title'>Title<span className='required-asterisks'> *</span></label><br />
                    {this.feedbackStore.hasErrors.title &&
                      <label className='control-label' htmlFor="feedback-title"><span>Please title your feedback</span></label>
                    }
                    <input type='text' id='feedback-title' maxLength="250" className='form-control input-lg' value={this.feedbackStore.feedbackObject.title} onChange={this.handleChange}/>
                  </div>
                  <div className={this.feedbackStore.hasErrors.topic ? 'form-group has-error' : 'form-group'}>
                    <label className='control-label' htmlFor='feedback-topic'>Topic<span className='required-asterisks'> *</span></label><br />
                    {this.feedbackStore.hasErrors.topic &&
                      <label className='control-label' htmlFor="feedback-topic"><span>Please select a topic</span></label>
                    }
                    <select id='feedback-topic' className='form-control' value={this.feedbackStore.feedbackObject.topic} onChange={this.handleChange}>
                      <option value='' hidden>Select Feedback Topic</option>
                      <option value='System Performance'>System Performance</option>
                      <option value='App Management'>App Management</option>
                      <option value='Network Status'>Network Status</option>
                      <option value='Purchasing and Provisioning'>Purchasing & Provisioning</option>
                      <option value='Account Management'>Account Management</option>
                      <option value='Other'>Other</option>
                    </select>
                  </div>
                  <div className={this.feedbackStore.hasErrors.details ? 'form-group has-error' : 'form-group'}>
                    <label className='control-label' htmlFor='feedback-details'>Details<span className='required-asterisks'> *</span></label><br />
                    {this.feedbackStore.hasErrors.details &&
                      <label className='control-label' htmlFor="feedback-details"><span>Please summarize your feedback</span></label>
                    }
                    <textarea type='text' id='feedback-details' maxLength="10000" className='form-control' rows="7" value={this.feedbackStore.feedbackObject.details} onChange={this.handleChange}/>
                  </div>
                  <div>
                    <p>
                      Your feedback will help us improve your experience. We cannot respond directly to feedback comments, but can follow up with you if you leave your email below. For immediate help, please contact us directly at <a href="tel:1800XXXXXX">1-800-XXX-XXX</a>.
                    </p>
                  </div>
                  <div className='form-group'>
                    <label className='control-label' htmlFor='feedback-email'>Email (Optional)</label>
                    <input type='email' id='feedback-email' className='form-control input-lg' value={this.feedbackStore.feedbackObject.email} onChange={this.handleChange}/>
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
