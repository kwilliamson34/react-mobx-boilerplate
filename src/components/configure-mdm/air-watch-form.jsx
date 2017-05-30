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

	updateInput = (event) => {
		event.preventDefault();
		this.store.updateInput(event.target.id,event.target.value)
	}

	updateForm = (event) => {
		event.preventDefault();
		this.store.updateForm(document.getElementById('configure-mdm-form'))
	}

	inputHasError = (id) => {
		let val = this.props.formData[id];
		let hasError = false;
		if(val === ''){
			hasError = true;
		}
		return hasError;
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.store.submitForm(event.target)
	}

	render() {

		return (
			<form id="configure-mdm-form" onSubmit={this.handleSubmit} noValidate onBlur={this.updateForm}>
				<div className={this.inputHasError('aw_hostName') ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
					<label className="control-label" htmlFor="aw_hostName">Host<span className="required-asterisks"> *</span></label>
					{this.inputHasError('aw_hostName') && <div className="msgBlock error error-list" role="alert" aria-live = "assertive"><span>error</span></div>}
					<input id="aw_hostName" onBlur={this.updateInput} type="text" className="form-control" disabled={this.props.connectionSet} defaultValue={this.props.formData.aw_hostName}/>
				</div>

				<div className={this.inputHasError('aw_tenantCode') ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
					<label className="control-label" htmlFor="aw_tenantCode">Tenant Code<span className="required-asterisks"> *</span></label>
					{this.inputHasError('aw_tenantCode') && <div className="msgBlock error error-list" role="alert" aria-live = "assertive"><span>error</span></div>}
					<input id="aw_tenantCode" onBlur={this.updateInput} type="text" className="form-control" disabled={this.props.connectionSet} defaultValue={this.props.formData.aw_tenantCode}/>
				</div>

				<div className={this.inputHasError('aw_userName') ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
					<label className="control-label" htmlFor="aw_userName">AirWatch User Name<span className="required-asterisks"> *</span></label>
					{this.inputHasError('aw_userName') && <div className="msgBlock error error-list" role="alert" aria-live = "assertive"><span>error</span></div>}
					<input id="aw_userName" onBlur={this.updateInput} type="text" className="form-control" disabled={this.props.connectionSet} defaultValue={this.props.formData.aw_userName}/>
				</div>

				<div className={this.inputHasError('aw_password') ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
					<label className="control-label" htmlFor="aw_password">AirWatch Password<span className="required-asterisks"> *</span></label>
					{this.inputHasError('aw_password') && <div className="msgBlock error error-list" role="alert" aria-live = "assertive"><span>error</span></div>}
					<input id="aw_password" onBlur={this.updateInput} type="text" className="form-control" disabled={this.props.connectionSet} defaultValue={this.props.formData.aw_password}/>
				</div>

				<div className="form-group text-center">
					<button aria-labelledby="configure-mdm-form" aria-disabled={!this.store.formIsValid || this.props.connectionSet || this.store.beingSubmitted} type="submit" className='fn-primary'>
						{this.store.beingSubmitted && <i className="icon-profile" aria-label="Still Submitting Form"></i>}
						Submit{this.store.beingSubmitted && <span>ting...</span>}
					</button>
				</div>
			</form>
		);
	}

}
