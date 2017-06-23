import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

@observer
export class IBMForm extends React.Component {
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
				<div className={this.inputHasError('ibm_rootURL') ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
					<label className="control-label" htmlFor="ibm_rootURL">Root URL<span className="required-asterisks"> *</span></label>
					{this.inputHasError('ibm_rootURL') && <div className="msgBlock error error-list" role="alert" aria-live = "assertive"><span>Please enter a valid root URL.</span></div>}
					<input id="ibm_rootURL" type="text" className="form-control" disabled={this.props.connectionSet} defaultValue={this.props.formData.ibm_rootURL}/>
				</div>

				<div className={this.inputHasError('ibm_billingID') ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
					<label className="control-label" htmlFor="ibm_billingID">Billing ID<span className="required-asterisks"> *</span></label>
					{this.inputHasError('ibm_billingID') && <div className="msgBlock error error-list" role="alert" aria-live = "assertive"><span>Please enter a valid billing ID.</span></div>}
					<input id="ibm_billingID" type="text" className="form-control" disabled={this.props.connectionSet} defaultValue={this.props.formData.ibm_billingID}/>
				</div>

				<div className={this.inputHasError('ibm_userName') ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
					<label className="control-label" htmlFor="ibm_userName">MaaS360 User Name<span className="required-asterisks"> *</span></label>
					{this.inputHasError('ibm_userName') && <div className="msgBlock error error-list" role="alert" aria-live = "assertive"><span>Please enter a valid user name.</span></div>}
					<input id="ibm_userName" type="text" className="form-control" disabled={this.props.connectionSet} defaultValue={this.props.formData.ibm_userName}/>
				</div>

				<div className={this.inputHasError('ibm_password') ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
					<label className="control-label" htmlFor="ibm_password">MaaS360 Password<span className="required-asterisks"> *</span></label>
					{this.inputHasError('ibm_password') && <div className="msgBlock error error-list" role="alert" aria-live = "assertive"><span>Please enter a valid password.</span></div>}
					<input id="ibm_password" type="password" className="form-control" disabled={this.props.connectionSet} defaultValue={this.props.formData.ibm_password}/>
				</div>

				<div className={this.inputHasError('ibm_platformID') ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
					<label className="control-label" htmlFor="ibm_platformID">Platform ID<span className="required-asterisks"> *</span></label>
					{this.inputHasError('ibm_platformID') && <div className="msgBlock error error-list" role="alert" aria-live = "assertive"><span>Please enter a valid platform ID.</span></div>}
					<input id="ibm_platformID" type="text" className="form-control" disabled={this.props.connectionSet} defaultValue={this.props.formData.ibm_platformID}/>
				</div>

				<div className={this.inputHasError('ibm_appID') ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
					<label className="control-label" htmlFor="ibm_appID">App ID<span className="required-asterisks"> *</span></label>
					{this.inputHasError('ibm_appID') && <div className="msgBlock error error-list" role="alert" aria-live = "assertive"><span>Please enter a valid app ID.</span></div>}
					<input id="ibm_appID" type="text" className="form-control" disabled={this.props.connectionSet} defaultValue={this.props.formData.ibm_appID}/>
				</div>

				<div className={this.inputHasError('ibm_appVersion') ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
					<label className="control-label" htmlFor="ibm_appVersion">App Version<span className="required-asterisks"> *</span></label>
					{this.inputHasError('ibm_appVersion') && <div className="msgBlock error error-list" role="alert" aria-live = "assertive"><span>Please enter a valid app version.</span></div>}
					<input id="ibm_appVersion" type="text" className="form-control" disabled={this.props.connectionSet} defaultValue={this.props.formData.ibm_appVersion}/>
				</div>

				<div className={this.inputHasError('ibm_appAccessKey') ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
					<label className="control-label" htmlFor="ibm_appAccessKey">App Access Key<span className="required-asterisks"> *</span></label>
					{this.inputHasError('ibm_appAccessKey') && <div className="msgBlock error error-list" role="alert" aria-live = "assertive"><span>Please enter a valid app access key.</span></div>}
					<input id="ibm_appAccessKey" type="text" className="form-control" disabled={this.props.connectionSet} defaultValue={this.props.formData.ibm_appAccessKey}/>
				</div>

			</div>
		);
	}

}
