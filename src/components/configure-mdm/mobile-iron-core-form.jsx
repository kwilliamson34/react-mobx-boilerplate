import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import asForm from '../forms/asForm.js';
import TextInput from '../forms/text-input';

@observer
class MobileIronCoreForm extends React.Component {
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
        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} id="mi_core_hostName" type="input" labelText="Host Name" required={true} disabled={disabled} errorMessage="Please enter a valid host name." charLimit={256} {...this.props.formChildProps}/>

        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} id="mi_core_companycode" type="input" labelText="Company Code" required={true} disabled={disabled} errorMessage="Please enter a valid company code." charLimit={256} {...this.props.formChildProps}/>

        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} id="mi_core_userName" type="input" labelText="MobileIron Core Username" required={true} disabled={disabled} errorMessage="Please enter a valid MobileIron Core username." charLimit={256} {...this.props.formChildProps}/>

        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} id="mi_core_password" type="password" labelText="MobileIron Core Password" required={true} disabled={disabled} errorMessage="Please enter a valid MobileIron Core password." charLimit={256} {...this.props.formChildProps}/>
      </div>
    );
  }
}

export default asForm(MobileIronCoreForm)
