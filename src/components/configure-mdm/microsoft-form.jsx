import React from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
import asForm from '../forms/asForm.js';
import TextInput from '../forms/text-input';

@observer
class MicrosoftForm extends React.Component {
  static propTypes = {
    store: PropTypes.object,
    formChildProps: PropTypes.object
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
        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} id="msintune_clientID" type="input" labelText="Client ID" required={true} disabled={disabled} errorMessage="Please enter a valid client ID." charLimit={256} {...this.props.formChildProps}/>

        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} id="msintune_clientSecret" type="input" labelText="Client Secret" required={true} disabled={disabled} errorMessage="Please enter a valid client secret." charLimit={256} {...this.props.formChildProps}/>

        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} id="msintune_hostName" type="input" labelText="Host Name" required={true} disabled={disabled} errorMessage="Please enter a valid host name." charLimit={256} {...this.props.formChildProps}/>

        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} id="msintune_tenantCode" type="input" labelText="Tenant Code" required={true} disabled={disabled} errorMessage="Please enter a valid tenant code." charLimit={256} {...this.props.formChildProps}/>

        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} id="msintune_userName" type="input" labelText="Microsoft Intune Username" required={true} disabled={disabled} errorMessage="Please enter a valid Microsoft Intune username." charLimit={256} {...this.props.formChildProps}/>

        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} id="msintune_password" type="password" labelText="Microsoft Intune Password" required={true} disabled={disabled} errorMessage="Please enter a valid Microsoft Intune password." charLimit={256} {...this.props.formChildProps}/>
      </div>
    );
  }
}

export default asForm(MicrosoftForm)
