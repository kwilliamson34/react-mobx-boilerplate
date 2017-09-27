import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import asForm from '../forms/asForm.js';
import TextInput from '../forms/text-input';

@observer
class MobileIronForm extends React.Component {
	static propTypes = {
		store: PropTypes.object
	}

	constructor(props) {
	  super(props)
	  this.store = this.props.store;
	}

	render() {
		const disabled = this.store.mdmIsConfigured;
		return (
			<div>
				<TextInput
					dataObject={this.store.values}
					id="mi_hostName"
					type="input"
					labelText="Host Name"
					required={true}
					disabled={disabled}
					errorMessage="Please enter a valid host name."/>

				<TextInput
					dataObject={this.store.values}
					id="mi_userName"
					type="input"
					labelText="MobileIron Core Username"
					required={true}
					disabled={disabled}
					errorMessage="Please enter a valid MobileIron Core username."/>

				<TextInput
					dataObject={this.store.values}
					id="mi_password"
					type="password"
					labelText="MobileIron Core Password"
					required={true}
					disabled={disabled}
					errorMessage="Please enter a valid MobileIron Core password."/>
			</div>
		);
	}
}

export default asForm(MobileIronForm)
