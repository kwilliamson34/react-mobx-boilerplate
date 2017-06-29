import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

@observer
export class MobileIronForm extends React.Component {
	static propTypes = {
		store: PropTypes.object.isRequired,
		connectionSet: PropTypes.bool.isRequired,
		formData: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);
		this.store = this.props.store;
	}

	inputHasError = (id) => {
		let val = this.props.formData[id];
		let hasError = false;
		if(val === ''){
			hasError = true;
		}
		return hasError;
	}

	render() {

		return (
			<div>
				<div className={this.inputHasError('mi_hostName') ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
					<label className="control-label" htmlFor="mi_hostName">Host Name<span className="required-asterisks"> *</span></label>
					{this.inputHasError('mi_hostName') && <div className="msgBlock error error-list" role="alert" aria-live = "assertive"><span>Please enter a valid host name.</span></div>}
					<input id="mi_hostName" type="text" className="form-control" disabled={this.props.connectionSet} defaultValue={this.props.formData.mi_hostName}/>
				</div>

				<div className={this.inputHasError('mi_userName') ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
					<label className="control-label" htmlFor="mi_userName">MobileIron Core Username<span className="required-asterisks"> *</span></label>
					{this.inputHasError('mi_userName') && <div className="msgBlock error error-list" role="alert" aria-live = "assertive"><span>Please enter a valid username.</span></div>}
					<input id="mi_userName" type="text" className="form-control" disabled={this.props.connectionSet} defaultValue={this.props.formData.mi_userName}/>
				</div>

				<div className={this.inputHasError('mi_password') ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
					<label className="control-label" htmlFor="mi_password">MobileIron Core Password<span className="required-asterisks"> *</span></label>
					{this.inputHasError('mi_password') && <div className="msgBlock error error-list" role="alert" aria-live = "assertive"><span>Please enter a valid password.</span></div>}
					<input id="mi_password" type="password" className="form-control" disabled={this.props.connectionSet} defaultValue={this.props.formData.mi_password}/>
				</div>

			</div>
		);
	}

}
