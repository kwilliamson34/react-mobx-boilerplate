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
    store: PropTypes.object,
    formChildProps: PropTypes.object
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
      {title: 'Billing & Payment'},
      {title: 'Other'}
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
  }

  handleCheckboxOnChange = () => {
    this.store.toggleContactAgreement();
  }

  render() {
    return (
      <div id="feedback-form">

        <SelectInput
          ref={ref => utilsService.registerFormFieldRef(ref, this.store.formFieldRefList)}
          id="topic"
          type="select"
          labelText="Topic"
          required={true}
          placeholder="Select a topic"
          errorMessage="Please choose a topic."
          optionsList={this.topics}
          {...this.props.formChildProps}/>

        <TextInput
          ref={ref => utilsService.registerFormFieldRef(ref, this.store.formFieldRefList)}
          id="subject"
          type="input"
          labelText="Subject"
          required={true}
          errorMessage="Please enter a subject."
          charLimit={256}
          {...this.props.formChildProps}/>

        <TextInput
          ref={ref => utilsService.registerFormFieldRef(ref, this.store.formFieldRefList)}
          helperText="Max 2,500 characters."
          id="details"
          type="textarea"
          labelText="Details"
          required={true}
          errorMessage="Please enter a summary of your feedback."
          charLimit={2500}
          {...this.props.formChildProps}/>

        <SelectInput
          ref={ref => utilsService.registerFormFieldRef(ref, this.store.formFieldRefList)}
          id="operatingSystem"
          type="select"
          labelText="Operating System"
          required={true}
          placeholder="Select your operating system"
          errorMessage="Please select your operating system."
          optionsList={this.operatingSystems}
          {...this.props.formChildProps}/>

        <TextInput
          ref={ref => utilsService.registerFormFieldRef(ref, this.store.formFieldRefList)}
          id="email"
          type="input"
          labelText={
            this.store.emailIsRequired
              ? 'Email'
              : 'Email (Optional)'}
          required={this.store.emailIsRequired}
          getIsValid={utilsService.isValidEmailAddress}
          errorMessage="Please enter an email address."
          charLimit={256}
          {...this.props.formChildProps}/>

        <TextInput
          ref={ref => utilsService.registerFormFieldRef(ref, this.store.formFieldRefList)}
          id="phoneNo"
          type="input"
          labelText="Phone (Optional)"
          required={false}
          errorMessage="Please enter a valid phone number."
          charLimit={256}
          {...this.props.formChildProps}/>

        <SelectInput
          ref={ref => utilsService.registerFormFieldRef(ref, this.store.formFieldRefList)}
          id="likely"
          type="select"
          labelText="How likely are you to recommend FirstNet?"
          required={true}
          placeholder="Select your answer"
          errorMessage="Please select your answer."
          optionsList={this.likelihoods}
          {...this.props.formChildProps}/>
        {/* FPSE-1294 and 1640: screen reader had trouble with "likelihood", so we use "answer" */}

        <div className="text-block">
          <p>Your feedback will help us respond to issues and improve your overall experience.&nbsp;
            <span aria-hidden='true'>If you are experiencing technical issues with devices/applications/network, please call </span>
            <a href={`tel:${config.attCustomerSupportPhone}`}>
              <span className='sr-only'>If you are experiencing technical issues with devices/applications/network, please call&nbsp;</span>
              {config.attCustomerSupportPhone}
            </a>.
          </p>
        </div>

        <div className={`${this.store.requireContactAgreement ? '' : 'hidden'}`}>
          <Checkbox
            ref={ref => utilsService.registerFormFieldRef(ref, this.store.formFieldRefList)}
            id="contactAgreement"
            value="contactAgreement"
            label="By submitting this information, you agree to be contacted by FirstNet. We will never sell or share your information."
            required={this.store.requireContactAgreement}
            errorMessage="Please provide consent to be contacted by FirstNet."
            checked={this.store.contactAgreement}
            handleOnChange={this.handleCheckboxOnChange}
            {...this.props.formChildProps}/>
        </div>

      </div>
    );
  }
}



export default asForm(FeedbackForm, {submitButtonText: 'Submit'})
