import React from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
import asForm from '../forms/asForm.js';
import TextInput from '../forms/text-input';

@observer
class AirWatchForm extends React.Component {
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
        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} id="aw_hostName" type="input" labelText="Host Name" required={true} disabled={disabled} errorMessage="Please enter a host name." charLimit={256} {...this.props.formChildProps}/>

        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} id="aw_tenantCode" type="input" labelText="Tenant Code" required={true} disabled={disabled} errorMessage="Please enter a tenant code." charLimit={256} {...this.props.formChildProps}/>

        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} id="aw_userName" type="input" labelText="AirWatch Username" required={true} disabled={disabled} errorMessage="Please enter a valid AirWatch username." charLimit={256} {...this.props.formChildProps}/>

        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} id="aw_password" type="password" labelText="AirWatch Password" required={true} disabled={disabled} errorMessage="Please enter a valid AirWatch password." charLimit={256} {...this.props.formChildProps}/>
      </div>
    );
  }
}

export default asForm(AirWatchForm)
