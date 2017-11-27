import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';

import PageTitle from '../components/page-title/page-title';
import AirWatchForm from '../components/configure-mdm/air-watch-form';
import IBMForm from '../components/configure-mdm/ibm-form';
import MicrosoftForm from '../components/configure-mdm/microsoft-form';
import MobileIronCloudForm from '../components/configure-mdm/mobile-iron-cloud-form';
import MobileIronCoreForm from '../components/configure-mdm/mobile-iron-core-form';
import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';
import Alerts from '../components/alerts/alerts';
import Modal from '../components/portals/modal';

@inject('store')
@observer
export default class ConfigureMDM extends React.Component {

	static propTypes = {
		store: PropTypes.shape({
			mdmStore: PropTypes.shape({formData: PropTypes.object})
		})
	}

	constructor(props) {
		super(props);
		this.mdmStore = this.props.store.mdmStore;
		this.breakConnectionModal = {};
	}

	componentWillMount() {
		this.mdmStore.hasBeenSubmitted = false;
		this.mdmStore.getMDMConfiguration();
	}

	componentWillUnmount() {
		this.mdmStore.form = undefined;
	}

	handleSelectChange = (event) => {
		this.mdmStore.updateMDM(event.target.value);
	}

	breakMDMConnection = (event) => {
		event.preventDefault();
		this.mdmStore.breakMDMConnection();
		this.breakConnectionModal.hideModal();
	}

	renderBreakConnectionModal = () => {
		return <Modal
			id="break-connection-modal"
			title="Confirm break connection"
			ref={i => this.breakConnectionModal = i}
			restoreFocusTo="#connection-modal-launcher"
			primaryAction={this.breakMDMConnection}
			primaryButtonLabel="Break Connection"
			secondaryAction={this.breakConnectionModal.hideModal}
			secondaryButtonLabel="Keep Connection">
			<p>This cannot be undone. If you break this application’s connection to MDM, you will have to re-configure it using this form to establish a new connection.</p>
		</Modal>
	}

	renderBreadcrumb = () => {
		const crumbs = [
			{
				pageHref: '/admin',
				pageTitle: 'Administration Dashboard'
			}, {
				pageHref: '/admin/manage-apps',
				pageTitle: 'Manage Apps'
			}, {
				pageHref: '/admin/configure-mdm',
				pageTitle: 'Configure MDM'
			}
		];
		return <BreadcrumbNav links={crumbs}/>
	}

	renderMDMSelectMenu = () => {
		return (
			<div className='form-group has-feedback'>
				<label className="control-label" htmlFor="mdm">
					Your MDM<span className="required-asterisks"> *</span>
				</label>
				<select id="mdm_type" className='form-control' onChange={this.handleSelectChange} value={this.mdmStore.values.mdm_type} disabled={this.mdmStore.mdmIsConfigured}>
					<option value="">Select MDM</option>
					<option value="AIRWATCH">AirWatch</option>
					<option value="MAAS360">IBM MaaS360</option>
					<option value="MOBILE_IRON">MobileIron Cloud</option>
					<option value="MOBILE_IRON_CORE">MobileIron Core</option>
					<option value="MICROSOFT_INTUNE">Microsoft Intune</option>
				</select>
			</div>
		)
	}

	renderProperMDMForm = () => {
		let MDMFormComponent;
		switch (this.mdmStore.values.mdm_type) {
			case 'AIRWATCH':
				MDMFormComponent = AirWatchForm;
				break;
			case 'MAAS360':
				MDMFormComponent = IBMForm;
				break;
			case 'MOBILE_IRON':
				MDMFormComponent = MobileIronCloudForm;
				break;
			case 'MOBILE_IRON_CORE':
				MDMFormComponent = MobileIronCoreForm;
				break;
			case 'MICROSOFT_INTUNE':
				MDMFormComponent = MicrosoftForm;
				break;
			default:
				MDMFormComponent = null;
		}
		if (MDMFormComponent) {
			return <MDMFormComponent store={this.mdmStore} disabled={this.mdmStore.mdmIsConfigured} suppressAlertBars={true}/>
		}
		return null;
	}

	renderBreakConnectionButton = () => {
		return (
			<div className="break-mdm-wrapper col-xs-12">
				<div className="container">
					<button id="connection-modal-launcher" onClick={this.breakConnectionModal.showModal} className="break-mdm-btn fn-primary" aria-labelledby="break-mdm-connection" aria-disabled={!this.mdmStore.mdmIsConfigured}>Break Connection</button>
				</div>
			</div>
		)
	}

	renderInTuneDisclaimer = () => {
		return (
			<p className="mdm-descriptive-block">
				Note: only FirstNet applications that are available in the iTunes or Google Play stores can be pushed to an Intune account through the Local Control site.
			</p>
		)
	}

	render() {
		return (
			<article id="configure-mdm-page">
				{this.renderBreadcrumb()}
				{this.mdmStore.mdmIsConfigured && this.renderBreakConnectionButton()}
				<div className="mdm-form-wrapper container">
					<div className="col-xs-12 text-center">
						<PageTitle className="sr-only">
							Configure Mobile Device Management
						</PageTitle>
						<h2 className="as-h1" aria-hidden={true}>
							<span className="hidden-xs">Configure Mobile Device Management (MDM)</span>
							<span className="visible-xs-inline">Configure MDM</span>
						</h2>
					</div>

					<div className="row no-gutters">
						<section className="col-xs-12 col-lg-10 col-lg-offset-1">
							<div className="mdm-form col-md-offset-2 col-xs-12 col-md-8 col-md">
								<section>
									<Alerts showAlert={Boolean(this.mdmStore.alertToDisplay)} alertText={this.mdmStore.alertToDisplay} clearAlert={this.mdmStore.clearAlertAndReferences.bind(this.mdmStore)} showSuccess={Boolean(this.mdmStore.successToDisplay)} successText={this.mdmStore.successToDisplay} clearSuccess={this.mdmStore.clearSuccess.bind(this.mdmStore)}/> {this.mdmStore.mdmIsConfigured && <p className="mdm-descriptive-block">Only one MDM can be configured at a time. To configure a new MDM, the existing connection must be broken. Once the existing connection is broken, a new one can be configured.</p>}
									{this.mdmStore.values.mdm_type === 'MICROSOFT_INTUNE' && this.renderInTuneDisclaimer()}
									{this.renderMDMSelectMenu()}
									{this.renderProperMDMForm()}
								</section>
							</div>
						</section>
					</div>
				</div>
				{this.renderBreakConnectionModal()}
			</article>
		)
	}
}
