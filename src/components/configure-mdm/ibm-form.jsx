import React from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
import asForm from '../forms/asForm.js';
import TextInput from '../forms/text-input';

@observer
class IBMForm extends React.Component {
  static propTypes = {
    store: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.store = this.props.store;
  }

  componentWillMount() {
    this.store.formFieldRefList = [];
    this.store.formHasError = true;
  }

  render() {
    const disabled = this.store.mdmIsConfigured;
    return (
      <div>
        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} dataObject={this.store.values} id="ibm_rootURL" type="input" labelText="Root URL" required={true} disabled={disabled} errorMessage="Please enter a valid root URL."/>

        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} dataObject={this.store.values} id="ibm_billingID" type="input" labelText="Billing ID" required={true} disabled={disabled} errorMessage="Please enter a valid billing ID."/>

        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} dataObject={this.store.values} id="ibm_userName" type="input" labelText="MaaS360 Username" required={true} disabled={disabled} errorMessage="Please enter a valid MaaS360 username."/>

        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} dataObject={this.store.values} id="ibm_password" type="password" labelText="MaaS360 Password" required={true} disabled={disabled} errorMessage="Please enter a valid MaaS360 password."/>

        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} dataObject={this.store.values} id="ibm_platformID" type="input" labelText="Platform ID" required={true} disabled={disabled} errorMessage="Please enter a valid platform ID."/>

        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} dataObject={this.store.values} id="ibm_appID" type="input" labelText="App ID" required={true} disabled={disabled} errorMessage="Please enter a valid app ID."/>

        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} dataObject={this.store.values} id="ibm_appVersion" type="input" labelText="App Version" required={true} disabled={disabled} errorMessage="Please enter a valid app version."/>

        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} dataObject={this.store.values} id="ibm_appAccessKey" type="input" labelText="App Access Key" required={true} disabled={disabled} errorMessage="Please enter a valid app access key."/>
      </div>
    );
  }
}

export default asForm(IBMForm)
