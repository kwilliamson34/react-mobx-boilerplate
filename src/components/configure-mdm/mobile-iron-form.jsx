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
				<div className={this.store.mobileIronForm.get('mi_hostName') === '' ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
					<label className="control-label" htmlFor="mi_hostName">Host Name<span className="required-asterisks"> *</span></label>
					<p className="help-text">Help text.</p>
					<input id="mi_hostName" onBlur={this.updateInput} type="text" className="form-control" disabled={this.props.connectionSet} defaultValue={this.props.formData.ibm_platformID}/>
				</div>

				<div className={this.store.mobileIronForm.get('mi_userName') === '' ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
					<label className="control-label" htmlFor="mi_userName">MobileIron Core User Name<span className="required-asterisks"> *</span></label>
					<p className="help-text">Help text.</p>
					<input id="mi_userName" onBlur={this.updateInput} type="text" className="form-control" disabled={this.props.connectionSet} defaultValue={this.props.formData.mi_userName}/>
				</div>

				<div className={this.store.mobileIronForm.get('mi_password') === '' ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
					<label className="control-label" htmlFor="mi_password">MobileIron Core Password<span className="required-asterisks"> *</span></label>
					<p className="help-text">Help text.</p>
					<input id="mi_password" onBlur={this.updateInput} type="text" className="form-control" disabled={this.props.connectionSet} defaultValue={this.props.formData.mi_password}/>
				</div>

				<div className="form-group text-center">
					<button aria-labelledby="configure-mdm-form" aria-disabled={!this.store.formIsValid} type="submit" className='fn-primary'>Submit</button>
				</div>
			</form>
		);
	}

}
