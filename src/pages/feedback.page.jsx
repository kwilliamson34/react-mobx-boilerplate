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

  componentWillMount() {
    this.feedbackStore.hasBeenSubmitted = false;
  }

  componentWillUnmount() {
    if (this.feedbackStore.formHasEntries && !this.feedbackStore.hasBeenSubmitted) {
      this.feedbackStore.showExitModal = true;
      history.goBack();
    }
  }

  toggleExitModal = (e) => {
    e.preventDefault();
    this.feedbackStore.toggleExitModal()
  }

  discardFormChanges = (e) => {
    e.preventDefault();
    console.log('triggered discard');
    this.feedbackStore.discardFormChanges();
    history.replace('/admin/');
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.feedbackStore.submitForm(e.target);
  }

  handleChange = (e) => {
    e.preventDefault();
    this.feedbackStore.changeValue(e.target);
    // console.log('handleChange   ', this.feedbackStore.requiredFieldsEntered);
  }

  renderExitModal = () => {
    return (
      <div>
        <div id="exitModal" className="modal fade in">
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

  render() {
    // console.log('render', this.feedbackStore.requiredFieldsEntered);
    return (
      <article id='help-center-page'>
        <section className='content-wrapper'>
        <div className='container'>
          <div className='row text-center'>
            <div className='col-xs-12'><h1 className='as-h2'>Give Us Feedback</h1></div>
          </div>

          <div className='row'>
            <section>
              <form id='feedback-form' onSubmit={this.handleSubmit}>
                <div className={this.feedbackStore.hasErrors.title ? 'form-group has-error' : 'form-group'}>
                  <label className='control-label' htmlFor='feedback-title'>Title<span className='required-asterisks'> *</span></label><br />
                  {this.feedbackStore.hasErrors.title &&
                    <label className='control-label' htmlFor="feedback-title"><span>Please title your feedback</span></label>
                  }
                  <input type='text' id='feedback-title' maxLength="250" className='form-control' value={this.feedbackStore.feedbackObject.title} onChange={this.handleChange}/>
                </div>
                <div className={this.feedbackStore.hasErrors.topic ? 'form-group has-error' : 'form-group'}>
                  <label className='control-label' htmlFor='feedback-topic'>Topic<span className='required-asterisks'> *</span></label>
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
                    <option value='General Questions'>General Questions</option>
                    <option value='Other'>Other</option>
                  </select>
                </div>
                <div className={this.feedbackStore.hasErrors.details ? 'form-group has-error' : 'form-group'}>
                  <label className='control-label' htmlFor='feedback-details'>Details<span className='required-asterisks'> *</span></label><br />
                    {this.feedbackStore.hasErrors.details &&
                      <label className='control-label' htmlFor="feedback-details"><span>Please summarize your feedback</span></label>
                    }
                  <input type='text' id='feedback-details' maxLength="10000" className='form-control' value={this.feedbackStore.feedbackObject.details} onChange={this.handleChange}/>
                </div>
                <div>
                  <p>
                    Want to be contacted about your feedback? Leave your email below so that we can follow up with you about your comments!
                  </p>
                </div>
                <div className='form-group'>
                  <label className='control-label' htmlFor='feedback-email'>Email (Optional)</label>
                  <input type='email' id='feedback-email' className='form-control' value={this.feedbackStore.feedbackObject.email} onChange={this.handleChange}/>
                </div>
                <div className='form-group text-center'>
                  <button type='submit' id='feedback-submit-btn' className={this.feedbackStore.requiredFieldsEntered ? 'fn-primary' : 'fn-primary disabled'} aria-labelledby='feedback-form'>
                    Submit Feedback
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
        </section>
        {this.feedbackStore.showExitModal && this.renderExitModal()}
      </article>
    )
  }
}
