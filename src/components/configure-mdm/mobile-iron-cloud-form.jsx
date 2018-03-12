import React from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
import asForm from '../forms/asForm.js';
import TextInput from '../forms/text-input';

@observer
class MobileIronCloudForm extends React.Component {
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
        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} id="mi_hostName" type="input" labelText="Host Name" required={true} disabled={disabled} errorMessage="Please enter a valid host name." charLimit={256} {...this.props.formChildProps}/>

        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} id="mi_userName" type="input" labelText="MobileIron Cloud Username" required={true} disabled={disabled} errorMessage="Please enter a valid MobileIron Cloud username." charLimit={256} {...this.props.formChildProps}/>

        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} id="mi_password" type="password" labelText="MobileIron Cloud Password" required={true} disabled={disabled} errorMessage="Please enter a valid MobileIron Cloud password." charLimit={256} {...this.props.formChildProps}/>
      </div>
    );
  }
}

export default asForm(MobileIronCloudForm)
