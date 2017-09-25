import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import config from 'config';
import FeedbackForm from '../components/forms/feedback-form';

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
  }

  toggleAlertBar = (e) => {
    e.preventDefault();
    this.feedbackStore.toggleAlertBar();
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
        required: true,
        hasError: this.feedbackStore.hasErrors.feedback_title,
        charLimit: 250
      }, {
        id: 'feedback_topic',
        type: 'select',
        label: 'Topic',
        required: true,
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
        required: true,
        genericLabel: 'summary of your feedback',
        value: this.feedbackStore.feedbackObject.feedback_details,
        hasError: this.feedbackStore.hasErrors.feedback_details,
        charLimit: 10000
      }, {
        type: 'textblock',
        body: `Your feedback will help us improve your experience. We cannot respond directly to feedback comments, but can follow up with you if you leave your email below.&nbsp;<span aria-hidden='true'>For immediate help, please contact us directly at&nbsp;</span><a href='tel:${config.attCustomerSupportPhone}'><span class='sr-only'>For immediate help, please contact us directly at&nbsp;</span>${config.attCustomerSupportPhone}</a>.`
      }, {
        id: 'feedback_email',
        label: 'Email (Optional)',
        required: false,
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
                <FeedbackForm store={this.feedbackStore} submitButtonText='Submit Feedback'/>
              </section>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
