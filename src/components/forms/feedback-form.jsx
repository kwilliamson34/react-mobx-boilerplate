import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import asForm from './asForm.js';
import config from 'config';
import {userStore} from '../../core/stores/user.store';

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

  //TODO temporary-- remove when components are done
  renderTextInput = ({id, label, value, genericLabel, type, disabled, hasError, required, charLimit}) => {
    let Tag = type === 'textarea' ? 'textarea' : 'input';
    return (
      <div className={`form-group has-feedback ${id + '-class'} ${hasError ? 'has-error' : ''}`} key={id}>
        <label className="control-label" htmlFor={id}>{label}
          {required &&
            <span className="required-asterisks"> *</span>
          }
        </label>
        {hasError && <div className="msgBlock error error-list" role="alert" aria-live="assertive">
          <span>Please enter a {genericLabel || label.toLowerCase()}.</span>
        </div>}
        <Tag id={id} type="text" className="form-control" disabled={disabled} defaultValue={value} data-charlimit={charLimit}/>
      </div>
    )
  }

  render() {
    return (
      <div id="feedback-form">
        {this.renderTextInput({
          id: 'feedback_title',
          label: 'Title',
          value: this.store.values.title,
          required: true,
          charLimit: 250
        })}
        {this.renderTextInput({
          id: 'feedback_topic',
          type: 'select',
          label: 'Topic',
          required: true,
          placeholder: 'Select Feedback Topic',
          value: this.store.values.topic,
          optionsList: userStore.isAdmin
            ? this.adminOptions
            : this.nonAdminOptions
        })}
        {this.renderTextInput({
          id: 'feedback_details',
          type: 'textarea',
          label: 'Details',
          required: true,
          genericLabel: 'summary of your feedback',
          value: this.store.values.details,
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
          label: 'Email (Optional)',
          required: false,
          genericLabel: 'valid email address',
          value: this.store.values.email,
          charLimit: 10000
        })}
      </div>
    );
  }
}

export default asForm(FeedbackForm, {submitButtonText: 'Submit Feedback'})
