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
		this.isConfigured = this.props.connectionSet;
	}

	updateInput = (event) => {
		event.preventDefault();
		this.store.updateInput(event.target.id,event.target.value)
	}

	updateForm = (event) => {
		event.preventDefault();
		this.store.updateForm(document.getElementById('configure-mdm-form'))
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.store.submitForm(event.target)
	}

	render() {

		return (
			<form id="configure-mdm-form" onSubmit={this.handleSubmit} noValidate onBlur={this.updateForm}>
				<div className={this.store.ibmForm.get('ibm_rootURL') === '' ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
					<label className="control-label" htmlFor="ibm_rootURL">Root URL<span className="required-asterisks"> *</span></label>
					<p className="help-text">Help text.</p>
					<select id="ibm_rootURL"
					className='form-control'
					onChange={this.updateInput}
					onBlur={this.updateInput}
					disabled={this.props.connectionSet}
					defaultValue={this.props.formData.ibm_rootURL}>
						<option value="" hidden>Select Root URL</option>
						<option value="TBD">Service will provide...</option>
					</select>
				</div>
				<div className={this.store.ibmForm.get('ibm_billingID') === '' ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
					<label className="control-label" htmlFor="ibm_billingID">Billing ID<span className="required-asterisks"> *</span></label>
					<p className="help-text">Help text.</p>
					<input id="ibm_billingID" onBlur={this.updateInput} type="text" className="form-control" disabled={this.props.connectionSet} defaultValue={this.props.formData.ibm_billingID}/>
				</div>

				<div className={this.store.ibmForm.get('ibm_userName') === '' ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
					<label className="control-label" htmlFor="ibm_userName">MaaS360 User Name<span className="required-asterisks"> *</span></label>
					<p className="help-text">Help text.</p>
					<input id="ibm_userName" onBlur={this.updateInput} type="text" className="form-control" disabled={this.props.connectionSet} defaultValue={this.props.formData.ibm_userName}/>
				</div>

				<div className={this.store.ibmForm.get('ibm_password') === '' ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
					<label className="control-label" htmlFor="ibm_password">MaaS360 Password<span className="required-asterisks"> *</span></label>
					<p className="help-text">Help text.</p>
					<input id="ibm_password" onBlur={this.updateInput} type="text" className="form-control" disabled={this.props.connectionSet} defaultValue={this.props.formData.ibm_password}/>
				</div>

				<div className={this.store.ibmForm.get('ibm_platformID') === '' ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
					<label className="control-label" htmlFor="ibm_platformID">Platform ID<span className="required-asterisks"> *</span></label>
					<p className="help-text">Help text.</p>
					<select id="ibm_platformID"
					className='form-control'
					onChange={this.updateInput}
					onBlur={this.updateInput}
					disabled={this.props.connectionSet}
					defaultValue={this.props.formData.ibm_platformID}>
						<option value="" hidden>Select Platform ID</option>
						<option value="3">3</option>
					</select>
				</div>

				<div className={this.store.ibmForm.get('ibm_appID') === '' ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
					<label className="control-label" htmlFor="ibm_appID">App ID<span className="required-asterisks"> *</span></label>
					<p className="help-text">Help text.</p>
					<input id="ibm_appID" onBlur={this.updateInput} type="text" className="form-control" disabled={this.props.connectionSet} defaultValue={this.props.formData.ibm_appID}/>
				</div>

				<div className={this.store.ibmForm.get('ibm_appVersion') === '' ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
					<label className="control-label" htmlFor="ibm_appVersion">App Version<span className="required-asterisks"> *</span></label>
					<p className="help-text">Help text.</p>
					<select id="ibm_appVersion"
					className='form-control'
					onChange={this.updateInput}
					onBlur={this.updateInput}
					disabled={this.props.connectionSet}
					defaultValue={this.props.formData.ibm_appVersion}>
						<option value="" hidden>Select App Version</option>
						<option value="1.0">1.0</option>
					</select>
				</div>

				<div className={this.store.ibmForm.get('ibm_appAccessKey') === '' ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
					<label className="control-label" htmlFor="ibm_appAccessKey">App Access Key<span className="required-asterisks"> *</span></label>
					<p className="help-text">Help text.</p>
					<input id="ibm_appAccessKey" onBlur={this.updateInput} type="text" className="form-control" disabled={this.props.connectionSet} defaultValue={this.props.formData.ibm_appAccessKey}/>
				</div>

				<div className="form-group text-center">
					<button aria-labelledby="configure-mdm-form" aria-disabled={!this.store.formIsValid || this.props.connectionSet} type="submit" className='fn-primary'>Submit</button>
				</div>
			</form>
		);
	}

}
