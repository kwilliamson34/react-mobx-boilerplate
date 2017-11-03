import React from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
import asForm from '../forms/asForm.js';
import TextInput from '../forms/text-input';

@observer
class MicrosoftForm extends React.Component {
  static propTypes = {
    store: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.store = this.props.store;
  }

  componentWillMount() {
    this.store.clearFormFieldRefList();
  }

  render() {
    const disabled = this.store.mdmIsConfigured;
    return (
      <div>
        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} dataObject={this.store.values} id="msintune_clientID" type="input" labelText="Client ID" required={true} disabled={disabled} errorMessage="Please enter a valid client ID." announceError={this.store.showAlert} charLimit={256}/>

        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} dataObject={this.store.values} id="msintune_clientSecret" type="input" labelText="Client Secret" required={true} disabled={disabled} errorMessage="Please enter a valid client secret." announceError={this.store.showAlert} charLimit={256}/>

        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} dataObject={this.store.values} id="msintune_hostName" type="input" labelText="Host Name" required={true} disabled={disabled} errorMessage="Please enter a valid host name." announceError={this.store.showAlert} charLimit={256}/>

        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} dataObject={this.store.values} id="msintune_tenantCode" type="input" labelText="Tenant Code" required={true} disabled={disabled} errorMessage="Please enter a valid tenant code." announceError={this.store.showAlert} charLimit={256}/>

        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} dataObject={this.store.values} id="msintune_userName" type="input" labelText="Microsoft InTune Username" required={true} disabled={disabled} errorMessage="Please enter a valid Microsoft InTune username." announceError={this.store.showAlert} charLimit={256}/>

        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} dataObject={this.store.values} id="msintune_password" type="password" labelText="Microsoft InTune Password" required={true} disabled={disabled} errorMessage="Please enter a valid Microsoft InTune password." announceError={this.store.showAlert} charLimit={256}/>
      </div>
    );
  }
}

export default asForm(MicrosoftForm)
