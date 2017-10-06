import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import config from 'config';
import {userStore} from '../../core/stores/user.store';
import {utilsService} from '../../core/services/utils.service';

import asForm from '../forms/asForm.js';
import TextInput from '../forms/text-input';
import SelectInput from '../forms/select-input';

@observer
class FeedbackForm extends React.Component {

  static propTypes = {
    store: PropTypes.object
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

  componentWillMount() {
    this.store.formFieldRefList = [];
  }

  render() {
    return (
      <div id="feedback-form">
        <TextInput
          ref={ref => this.store.formFieldRefList.push(ref)}
          checkFormForErrors={this.store.checkFormForErrors.bind(this.store)}
          dataObject={this.store.values}
          id="title"
          type="input"
          labelText="Title"
          required={true}
          errorMessage="Please enter title."
          charLimit={250}/>

        <SelectInput
          ref={ref => this.store.formFieldRefList.push(ref)}
          checkFormForErrors={this.store.checkFormForErrors.bind(this.store)}
          dataObject={this.store.values}
          id="topic"
          type="select"
          labelText="Topic"
          required={true}
          placeholder="Select Feedback Topic"
          errorMessage="Please choose a topic."
          optionsList={userStore.isAdmin
            ? this.adminOptions
            : this.nonAdminOptions}/>

        <TextInput
          ref={ref => this.store.formFieldRefList.push(ref)}
          checkFormForErrors={this.store.checkFormForErrors.bind(this.store)}
          dataObject={this.store.values}
          id="details"
          type="textarea"
          labelText="Details"
          required={true}
          errorMessage="Please enter a summary of your feedback."
          charLimit={10000}/>

        <p>Your feedback will help us improve your experience. We cannot respond directly to feedback comments, but can follow up with you if you leave your email below.&nbsp;
          <span aria-hidden='true'>For immediate help, please contact us directly at&nbsp;</span>
          <a href={`tel:${config.attCustomerSupportPhone}`}>
            <span className='sr-only'>For immediate help, please contact us directly at&nbsp;</span>
            {config.attCustomerSupportPhone}
          </a>.
        </p>

        <TextInput
          ref={ref => this.store.formFieldRefList.push(ref)}
          checkFormForErrors={this.store.checkFormForErrors.bind(this.store)}
          dataObject={this.store.values}
          id="email"
          type="input"
          labelText="Email (Optional)"
          required={false}
          getIsValid={utilsService.isValidEmailAddress}
          errorMessage="Please enter a valid email address."/>
      </div>
    );
  }
}

export default asForm(FeedbackForm, {submitButtonText: 'Submit Feedback'})
