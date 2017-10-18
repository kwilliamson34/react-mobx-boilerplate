import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import config from 'config';
import {utilsService} from '../../core/services/utils.service';

import asForm from '../forms/asForm.js';
import TextInput from '../forms/text-input';
import SelectInput from '../forms/select-input';
import Checkbox from '../forms/checkbox';

@observer
class FeedbackForm extends React.Component {

  static propTypes = {
    store: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.store = this.props.store;

    //title is set as the value, unless the value field is present;
    this.topics = [
      {title: 'System Performance'},
      {title: 'App Management'},
      {title: 'Portal Design'},
      {title: 'Credential & Account Management'},
      {title: 'Purchasing & Provisioning'},
      {value: 'Billing & Payment', title: 'Billing & Payment'},
      {value: 'Other', title: 'Other'}
    ];
    this.operatingSystems = [
      {title: 'iOS'},
      {title: 'MacOS'},
      {title: 'Android'},
      {title: 'Windows'},
      {title: 'Other'}
    ];
    this.likelihoods = [
      {title: '1 – Not Likely'},
      {title: '2 – Somewhat Likely'},
      {title: '3 – Very Likely'}
    ];
  }

  componentWillMount() {
    this.store.clearFormFieldRefList();
    this.store.fetchDefaultValues();
  }

  handleCheckboxOnChange = () => {
    this.store.toggleContactAgreement();
  }

  render() {
    return (
      <div id="feedback-form">

        <SelectInput
          ref={ref => this.store.formFieldRefList.push(ref)}
          dataObject={this.store.values}
          id="topic"
          type="select"
          labelText="Topic"
          required={true}
          placeholder="Select a topic"
          errorMessage="Please choose a topic."
          optionsList={this.topics}/>

        <TextInput
          ref={ref => this.store.formFieldRefList.push(ref)}
          dataObject={this.store.values}
          id="subject"
          type="input"
          labelText="Subject"
          required={true}
          errorMessage="Please enter a subject."
          charLimit={250}/>

        <TextInput
          ref={ref => this.store.formFieldRefList.push(ref)}
          dataObject={this.store.values}
          id="details"
          type="textarea"
          labelText="Details"
          required={true}
          errorMessage="Please enter a summary of your feedback."
          charLimit={10000}/>

        <SelectInput
          ref={ref => this.store.formFieldRefList.push(ref)}
          dataObject={this.store.values}
          id="operatingSystem"
          type="select"
          labelText="Operating System"
          required={true}
          placeholder="Select your operating system"
          errorMessage="Select your operating system."
          optionsList={this.operatingSystems}/>

        <TextInput
          ref={ref => this.store.formFieldRefList.push(ref)}
          dataObject={this.store.values}
          id="email"
          type="input"
          labelText={
            this.store.emailIsRequired
              ? 'Email'
              : 'Email (Optional)'}
          required={this.store.emailIsRequired}
          getIsValid={utilsService.isValidEmailAddress}
          errorMessage="Please enter an email address."/>

        <TextInput
          ref={ref => this.store.formFieldRefList.push(ref)}
          dataObject={this.store.values}
          id="phoneNo"
          type="input"
          labelText="Phone (Optional)"
          required={false}
          errorMessage="Please enter a valid phone number."/>

        <SelectInput
          ref={ref => this.store.formFieldRefList.push(ref)}
          dataObject={this.store.values}
          id="likely"
          type="select"
          labelText="How likely are you to recommend FirstNet?"
          required={true}
          placeholder="Select your likelihood"
          errorMessage="Select your likelihood."
          optionsList={this.likelihoods}/>


        <div className="text-block">
          <p>Your feedback will help us respond to issues and improve your overall experience.&nbsp;
            <span aria-hidden='true'>If you are experiencing technical issues with devices/applications/network, please call </span>
            <a href={`tel:${config.attCustomerSupportPhone}`}>
              <span className='sr-only'>If you are experiencing technical issues with devices/applications/network, please call&nbsp;</span>
              {config.attCustomerSupportPhone}
            </a>.
          </p>
        </div>

        {
          this.store.showContactAgreement &&
          <Checkbox
            ref={ref => this.store.formFieldRefList.push(ref)}
            value="contactAgreement"
            label="By submitting this information, you agree to be contacted by FirstNet. We will never sell or share your information."
            required={true}
            errorMessage="Please provide consent to be contacted by FirstNet."
            checked={this.store.contactAgreement}
            handleOnChange={this.handleCheckboxOnChange} />
        }

      </div>
    );
  }
}



export default asForm(FeedbackForm, {submitButtonText: 'Submit'})
