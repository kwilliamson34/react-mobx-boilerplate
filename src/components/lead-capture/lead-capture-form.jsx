import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {utilsService} from '../../core/services/utils.service';

import asForm from '../forms/asForm.js';
import TextInput from '../forms/text-input';
import Checkbox from '../forms/checkbox';

@observer
class LeadCaptureForm extends React.Component {

  static propTypes = {
    store: PropTypes.object,
    announceErrors: PropTypes.bool
  }

  constructor (props) {
    super(props)
    this.store = this.props.store;
  }

  componentWillMount() {
    this.store.clearFormFieldRefList();
  }

  handleCheckboxOnChange = () => {
    this.store.toggleContactAgreement();
  }

  render() {
    return (
      <div id="lead-capture-form">
        <TextInput
          ref={ref => this.store.formFieldRefList.push(ref)}
          dataObject={this.store.values}
          id="firstName"
          type="input"
          labelText="First Name"
          required={true}
          errorMessage="Please enter your name."
          announceError={this.props.announceErrors}
          charLimit={256}/>

        <TextInput
          ref={ref => this.store.formFieldRefList.push(ref)}
          dataObject={this.store.values}
          id="lastName"
          type="input"
          labelText="Last Name"
          required={true}
          errorMessage="Please enter your name."
          announceError={this.props.announceErrors}
          charLimit={256}/>

        <TextInput
          ref={ref => this.store.formFieldRefList.push(ref)}
          dataObject={this.store.values}
          id="email"
          type="input"
          labelText="Email"
          required={true}
          getIsValid={utilsService.isValidEmailAddress}
          errorMessage="Please enter a valid email address."
          announceError={this.props.announceErrors}
          charLimit={256}/>

        <TextInput
          ref={ref => this.store.formFieldRefList.push(ref)}
          dataObject={this.store.values}
          id="phone"
          type="input"
          labelText="Contact Number"
          required={true}
          errorMessage="Please enter your phone number."
          announceError={this.props.announceErrors}
          charLimit={256}/>

        <TextInput
          ref={ref => this.store.formFieldRefList.push(ref)}
          dataObject={this.store.values}
          helperText="Max 600 characters."
          id="message"
          type="textarea"
          labelText="Message (Optional)"
          required={false}
          errorMessage="Please enter a summary of your request."
          announceError={this.props.announceErrors}
          charLimit={600}/>

        <Checkbox
          ref={ref => this.store.formFieldRefList.push(ref)}
          value="contactAgreement"
          label="By submitting this information, you agree to be contacted by FirstNet. We will never sell or share your information."
          required={true}
          errorMessage="Please provide consent to be contacted by FirstNet."
          announceError={this.props.announceErrors}
          checked={this.store.values.contactAgreement}
          handleOnChange={this.handleCheckboxOnChange} />
      </div>
    );
  }
}

export default asForm(LeadCaptureForm, {submitButtonText: 'Submit'})
