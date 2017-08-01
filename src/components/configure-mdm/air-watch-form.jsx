import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

@observer
export class AirWatchForm extends React.Component {
	static propTypes = {
		renderFormInput: PropTypes.func.isRequired
	}

	render() {
		return (
			<div>
				{this.props.renderFormInput({
					id: 'aw_hostName',
					label: 'Host Name'
				})}

				{this.props.renderFormInput({
					id: 'aw_tenantCode',
					label: 'Tenant Code'
				})}

				{this.props.renderFormInput({
					id: 'aw_userName',
					label: 'AirWatch Username',
					genericLabel: 'username'
				})}

				{this.props.renderFormInput({
					id: 'aw_password',
					label: 'AirWatch Password',
					genericLabel: 'password',
					type: 'password'
				})}
			</div>
		);
	}

}
