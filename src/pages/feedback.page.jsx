import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';

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

  handleSubmit = (e) => {
    e.preventDefault();
    this.feedbackStore.submitForm(e.target);
  }

  hasError = (id) => {
    this.feedbackStore.findError(id);
  }

  render() {
    return (
      <article id='help-center-page'>
        <section className='content-wrapper'>
        <div className='container'>
          <div className='row text-center'>
            <div className='col-xs-12'><h1 className='as-h2'>Give Us Feedback</h1></div>
          </div>

          <div className='row'>
            <section>
              <form id='feedback-form'
                noValidate
                onSubmit={this.handleSubmit}>
                <div className={this.hasError('title') ? 'form-group has-error' : 'form-group'}>
                  <label className='control-label' htmlFor='feedback-title'>Title<span className='required-asterisks'> *</span></label>
                  <input type='text' id='feedback-title' className='form-control'/>
                </div>
                <div className={this.hasError('topic') ? 'form-group has-error' : 'form-group'}>
                  <label className='control-label' htmlFor='feedback-topic'>Topic<span className='required-asterisks'> *</span></label>
                  <select id='feedback-topic' className='form-control'>
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
                <div className={this.hasError('details') ? 'form-group has-error' : 'form-group'}>
                  <label className='control-label' htmlFor='feedback-details'>Details<span className='required-asterisks'> *</span></label>
                  <input type='text' id='feedback-details' className='form-control'/>
                </div>
                <div>
                  <p>
                    Want to be contacted about your feedback? Leave your email below so that we can follow up with you about your comments!
                  </p>
                </div>
                <div className={this.hasError('email') ? 'form-group has-error' : 'form-group'}>
                  <label className='control-label' htmlFor='feedback-email'>Email (Optional)</label>
                  <input type='text' id='feedback-email' className='form-control'/>
                </div>
                <div className='form-group text-center'>
                  <button type='submit' id='feedback-submit-btn' className='fn-primary' aria-labelledby='feedback-form'>
                    Submit Feedback
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
        </section>
      </article>
    )
  }
}
