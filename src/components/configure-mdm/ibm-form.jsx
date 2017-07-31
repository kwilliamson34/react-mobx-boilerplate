import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

@observer
export class IBMForm extends React.Component {
	static propTypes = {
		renderFormInput: PropTypes.func.isRequired
	}

	render() {
		return (
			<div>
				{this.props.renderFormInput({
					id: 'ibm_rootURL',
					label: 'Root URL',
					genericLabel: 'root URL'
				})}

				{this.props.renderFormInput({
					id: 'ibm_billingID',
					label: 'Billing ID',
					genericLabel: 'billing ID'
				})}

				{this.props.renderFormInput({
					id: 'ibm_userName',
					label: 'MaaS360 Username',
					genericLabel: 'username'
				})}

				{this.props.renderFormInput({
					id: 'ibm_password',
					label: 'MaaS360 Password',
					genericLabel: 'password',
					type: 'password'
				})}

				{this.props.renderFormInput({
					id: 'ibm_platformID',
					label: 'Platform ID',
					genericLabel: 'platform ID'
				})}

				{this.props.renderFormInput({
					id: 'ibm_appID',
					label: 'App ID',
					genericLabel: 'app ID'
				})}

				{this.props.renderFormInput({
					id: 'ibm_appVersion',
					label: 'App Version'
				})}

				{this.props.renderFormInput({
					id: 'ibm_appAccessKey',
					label: 'App Access Key'
				})}
			</div>
		);
	}

}
