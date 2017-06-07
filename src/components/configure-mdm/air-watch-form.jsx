import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';




@observer
export class AirWatchForm extends React.Component {
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
				<div className={this.inputHasError('aw_hostName') ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
					<label className="control-label" htmlFor="aw_hostName">Host<span className="required-asterisks"> *</span></label>
					{this.inputHasError('aw_hostName') && <div className="msgBlock error error-list" role="alert" aria-live = "assertive"><span>Please enter a valid host name.</span></div>}
					<input id="aw_hostName" type="text" className="form-control" disabled={this.props.connectionSet} defaultValue={this.props.formData.aw_hostName}/>
				</div>

				<div className={this.inputHasError('aw_tenantCode') ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
					<label className="control-label" htmlFor="aw_tenantCode">Tenant Code<span className="required-asterisks"> *</span></label>
					{this.inputHasError('aw_tenantCode') && <div className="msgBlock error error-list" role="alert" aria-live = "assertive"><span>Please enter a valid tenant code.</span></div>}
					<input id="aw_tenantCode" type="text" className="form-control" disabled={this.props.connectionSet} defaultValue={this.props.formData.aw_tenantCode}/>
				</div>

				<div className={this.inputHasError('aw_userName') ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
					<label className="control-label" htmlFor="aw_userName">AirWatch User Name<span className="required-asterisks"> *</span></label>
					{this.inputHasError('aw_userName') && <div className="msgBlock error error-list" role="alert" aria-live = "assertive"><span>Please enter a valid user name.</span></div>}
					<input id="aw_userName" type="text" className="form-control" disabled={this.props.connectionSet} defaultValue={this.props.formData.aw_userName}/>
				</div>

				<div className={this.inputHasError('aw_password') ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
					<label className="control-label" htmlFor="aw_password">AirWatch Password<span className="required-asterisks"> *</span></label>
					{this.inputHasError('aw_password') && <div className="msgBlock error error-list" role="alert" aria-live = "assertive"><span>Please enter a valid password.</span></div>}
					<input id="aw_password" type="password" className="form-control" disabled={this.props.connectionSet} defaultValue={this.props.formData.aw_password}/>
				</div>
			</div>
		);
	}

}
