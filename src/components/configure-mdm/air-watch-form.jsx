import React from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
import asForm from '../forms/asForm.js';
import TextInput from '../forms/text-input';

@observer
class AirWatchForm extends React.Component {
  static propTypes = {
    store: PropTypes.object,
    announceErrors: PropTypes.bool
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
        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} dataObject={this.store.values} id="aw_hostName" type="input" labelText="Host Name" required={true} disabled={disabled} errorMessage="Please enter a host name." announceError={this.props.announceErrors} charLimit={256}/>

        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} dataObject={this.store.values} id="aw_tenantCode" type="input" labelText="Tenant Code" required={true} disabled={disabled} errorMessage="Please enter a tenant code." announceError={this.props.announceErrors} charLimit={256}/>

        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} dataObject={this.store.values} id="aw_userName" type="input" labelText="AirWatch Username" required={true} disabled={disabled} errorMessage="Please enter a valid AirWatch username." announceError={this.props.announceErrors} charLimit={256}/>

        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} dataObject={this.store.values} id="aw_password" type="password" labelText="AirWatch Password" required={true} disabled={disabled} errorMessage="Please enter a valid AirWatch password." announceError={this.props.announceErrors} charLimit={256}/>
      </div>
    );
  }
}

export default asForm(AirWatchForm)
