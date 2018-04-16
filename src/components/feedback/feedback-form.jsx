import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
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

    this.operatingSystems = [
      {title: 'iOS'},
      {title: 'MacOS'},
      {title: 'Android'},
      {title: 'Windows'},
      {title: 'Other'}
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
          labelText="Email (Optional)"
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

        <div className="text-block">
          <p>Your feedback will help us respond to issues and improve your overall experience.</p>
        </div>

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
    );
  }
}



export default asForm(FeedbackForm, {submitButtonText: 'Submit'})
