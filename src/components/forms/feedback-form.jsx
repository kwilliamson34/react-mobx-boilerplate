import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import asForm from './asForm.js';
import config from 'config';
import {userStore} from '../../core/stores/user.store';

import TextInput from './text-input';
import SelectInput from './select-input';

@observer
class FeedbackForm extends React.Component {

  static propTypes = {
    store: PropTypes.object
  }

  static defaultProps = {
  }

  constructor (props) {
    super(props)
    this.store = this.props.store;

    this.adminOptions = [
      {value: 'System Performance', title: 'System Performance'},
      {value: 'App Management', title: 'App Management'},
      {value: 'Network Status', title: 'Network Status'},
      {value: 'Purchasing and Provisioning', title: 'Purchasing and Provisioning'},
      {value: 'Account Management', title: 'Account Management'},
      {value: 'Other', title: 'Other'}
    ];
    this.nonAdminOptions = [
      {value: 'System Performance', title: 'System Performance'},
      {value: 'Network Status', title: 'Network Status'},
      {value: 'Other', title: 'Other'}
    ];
  }

  renderTextInput(props) {
    return <TextInput {...props}/>
  }

  renderSelectInput({id, type, labelText, required, placeholder, value, optionsList}) {
    return <SelectInput {...arguments[0]}/>
  }

  render() {
    return (
      <div id="feedback-form">
        {this.renderTextInput({
          id: 'feedback_title',
          type: 'input',
          labelText: 'Title',
          errorMessage: 'Please enter a title',
          value: this.store.values.feedback_title,
          onChange: this.store.onChange.bind(this.store),
          required: true,
          charLimit: 250
        })}
        {this.renderSelectInput({
          id: 'feedback_topic',
          type: 'select',
          labelText: 'Topic',
          required: true,
          placeholder: 'Select Feedback Topic',
          value: this.store.values.feedback_topic,
          onChange: this.store.onChange.bind(this.store),
          optionsList: userStore.isAdmin
            ? this.adminOptions
            : this.nonAdminOptions
        })}
        {this.renderTextInput({
          id: 'feedback_details',
          type: 'textarea',
          labelText: 'Details',
          required: true,
          errorMessage: 'Please enter a summary of your feedback',
          value: this.store.values.feedback_details,
          onChange: this.store.onChange.bind(this.store),
          charLimit: 10000
        })}

        <p>Your feedback will help us improve your experience. We cannot respond directly to feedback comments, but can follow up with you if you leave your email below.&nbsp;
          <span aria-hidden='true'>For immediate help, please contact us directly at&nbsp;</span>
          <a href={`tel:${config.attCustomerSupportPhone}`}>
            <span className='sr-only'>For immediate help, please contact us directly at&nbsp;</span>
            {config.attCustomerSupportPhone}
          </a>.
        </p>

        {this.renderTextInput({
          id: 'feedback_email',
          type: 'input',
          labelText: 'Email (Optional)',
          required: false,
          errorMessage: 'Please enter a valid email address',
          onChange: this.store.onChange.bind(this.store),
          value: this.store.values.feedback_email
        })}
      </div>
    );
  }
}

export default asForm(FeedbackForm, {submitButtonText: 'Submit Feedback'})
