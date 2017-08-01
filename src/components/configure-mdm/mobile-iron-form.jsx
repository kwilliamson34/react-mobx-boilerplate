import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

@observer
export class MobileIronForm extends React.Component {
	static propTypes = {
		renderFormInput: PropTypes.func.isRequired
	}

	render() {
		return (
			<div>
				{this.props.renderFormInput({
					id: 'mi_hostName',
					label: 'Host Name'
				})}

				{this.props.renderFormInput({
					id: 'mi_userName',
					label: 'MobileIron Core Username',
					genericLabel: 'username'
				})}

				{this.props.renderFormInput({
					id: 'mi_password',
					label: 'MobileIron Core Password',
					genericLabel: 'password',
					type: 'password'
				})}
			</div>
		);
	}

}
