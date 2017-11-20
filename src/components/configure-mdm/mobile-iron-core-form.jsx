import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import asForm from '../forms/asForm.js';
import TextInput from '../forms/text-input';
import Checkbox from '../forms/checkbox';


@observer
class MobileIronCoreForm extends React.Component {
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

  handleCheckboxOnChange = (target) => {
    this.store.toggleBoolValue(target.id);
  }

  render() {
    const disabled = this.store.mdmIsConfigured;
    return (
      <div>
        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} dataObject={this.store.values} id="mi_core_hostName" type="input" labelText="Host Name" required={true} disabled={disabled} errorMessage="Please enter a valid host name." announceError={this.props.announceErrors} charLimit={256} />

        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} dataObject={this.store.values} id="mi_core_companycode" type="input" labelText="Company Code" required={true} disabled={disabled} errorMessage="Please enter a valid Company Code." announceError={this.props.announceErrors} charLimit={256} />

        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} dataObject={this.store.values} id="mi_core_userName" type="input" labelText="MobileIron Core Username" required={true} disabled={disabled} errorMessage="Please enter a valid MobileIron Core username." announceError={this.props.announceErrors} charLimit={256} />

        <TextInput ref={ref => this.store.formFieldRefList.push(ref)} dataObject={this.store.values} id="mi_core_password" type="password" labelText="MobileIron Core Password" required={true} disabled={disabled} errorMessage="Please enter a valid MobileIron Core password." announceError={this.props.announceErrors} charLimit={256} />
      </div>
    );
  }
}

export default asForm(MobileIronCoreForm)
