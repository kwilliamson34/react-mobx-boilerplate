import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {history} from '../core/services/history.service';

import {MDMAlerts} from '../components/configure-mdm/mdm-alerts';
import {AirWatchForm} from '../components/configure-mdm/air-watch-form';
import {IBMForm} from '../components/configure-mdm/ibm-form';
import {MobileIronForm} from '../components/configure-mdm/mobile-iron-form';
import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';
import $ from 'jquery';

@inject('store')
@observer
export default class ConfigureMDM extends React.Component {

  static propTypes = {
    store: PropTypes.shape({
      mdmStore: PropTypes.shape({
        formData: PropTypes.object
      })
    })
  }

	constructor(props) {
		super(props);
		this.store = this.props.store.mdmStore;
	}

  componentWillMount() {
    this.store.hasBeenSubmitted = false;
    this.store.getMDMConfiguration();
    this.store.enableSaveDialogs();
  }

  componentWillUnmount() {
    this.clearModals();
    this.store.disableSaveDialogs();
    this.store.form = undefined;
  }

  // Configure MDM Form Functions
	handleSelectChange = (event) => {
		this.store.updateMDM(event.target.value);
	}

  updateForm = (event) => {
    event.preventDefault();
    if(event.target.id !== 'mdm_submit_btn'){
      this.store.updateForm(event.target);
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.store.submitForm();
  }

  // MDM Modals Functions
  discardFormChanges = (event) => {
    event.preventDefault();
    this.store.resetMDMForm();
    history.push(this.store.interceptedRoute);
  }

  breakMDMConnection = (event) => {
    event.preventDefault();
    this.store.breakMDMConnection();
    this.togglebreakMDMConnection(event);
  }

  toggleExitModal = (event) => {
    event.preventDefault();
    this.store.toggleExitModal();
  }

  togglebreakMDMConnection = (event) => {
    event.preventDefault();
    this.store.togglebreakMDMConnection();
  }

  renderExitModal = (showExitModal) => {
    this.showModal(showExitModal, '#exitModal')

    return (
      <div id="exitModal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="exit-modal-title">
        <div className="modal-dialog">
          <div className="modal-content">
            <button type="button" autoFocus="true" id="exitModalCloseBtn" className="fn-modal-close" onClick={this.toggleExitModal}>
              <i aria-hidden="true" className="icon-close"></i>
              <span className="sr-only">Close window</span>
            </button>
            <div className="row no-gutters" id="exit-modal-title">
              <div className="col-xs-12">
                <h1 className="as-h2">Unsaved changes</h1>
                <p>Your form changes will not be saved if you navigate away from this page.</p>
              </div>
              <div className="col-xs-12 text-center">
                <button className="fn-primary" onClick={this.toggleExitModal}>Stay on Page</button>
                <button className="fn-secondary" onClick={this.discardFormChanges}>Discard Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderBreakConnectionModal = (showbreakMDMConnection) => {
    this.showModal(showbreakMDMConnection, '#breakConnectionModal');
    return (
      <div id="breakConnectionModal"  className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="break-connection-modal-title">
        <div className="modal-dialog">
          <div className="modal-content">
            <button type="button" className="fn-modal-close" onClick={this.togglebreakMDMConnection}>
              <i aria-hidden="true" className="icon-close"></i>
              <span className="sr-only">Close window</span>
            </button>
            <div className="row no-gutters" id="break-connection-modal-title">
              <div className="col-xs-12">
                <h1 className="as-h2">Confirm break connection</h1>
                <p>This cannot be undone. If you break this application’s connection to MDM, you will have to re-configure it using this form to establish a new connection.</p>
              </div>
              <div className="col-xs-12 text-center">
                <button className="fn-primary" onClick={this.togglebreakMDMConnection}>Keep Connection</button>
                <button className="fn-secondary" onClick={this.breakMDMConnection}>Break Connection</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  showModal(shouldShow, modalID) {
    if (shouldShow) {
      $(modalID).modal({backdrop: 'static'});
    } else {
      $(modalID).modal('hide');
      $(modalID).data('bs.modal', null);
    }
  }

  clearModals = () => {
    $('.modal-backdrop, #exitModal, #breakConnectionModal').remove();
    $('body').removeClass('modal-open');
  }

  renderBreadcrumb = () => {
    const crumbs = [
      {
        pageHref: '/admin',
        pageTitle: 'Administration Dashboard'
      },
      {
        pageHref: '/admin/manage-apps',
        pageTitle: 'Manage Apps'
      },
      {
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
        <select id="mdm_type"
          className={`form-control ${this.store.formData.mdm_type ? '' : 'placeholder'}`}
          onChange={this.handleSelectChange}
          value={this.store.formData.mdm_type}
          disabled={this.store.isConfigured}>
          <option value="">Select MDM</option>
          <option value="AIRWATCH">Airwatch</option>
          <option value="MAAS360">IBM MaaS360</option>
          <option value="MOBILE_IRON">MobileIron</option>
        </select>
      </div>
    )
  }

  renderProperMDMForm = () => {
    let MDMFormComponent = null;
    switch(this.store.formData.mdm_type) {
      case 'AIRWATCH':
        MDMFormComponent = AirWatchForm;
        break;
      case 'MAAS360':
        MDMFormComponent = IBMForm;
        break;
      case 'MOBILE_IRON':
        MDMFormComponent = MobileIronForm;
        break;
      default:
        MDMFormComponent = null;
    }
    if (MDMFormComponent) {
      return <MDMFormComponent renderFormInput={this.renderFormInput}/>
    }
    return null;
  }

  renderFormInput = ({id, label, genericLabel, type}) => {
    const value = this.store.formData[id];
    const hasError = value === '';
    return (
      <div className={`form-group has-feedback ${hasError ? 'has-error' : ''}`}>
        <label className="control-label" htmlFor="mi_hostName">{label}<span className="required-asterisks"> *</span></label>
        {hasError && <div className="msgBlock error error-list" role="alert" aria-live="assertive">
          <span>Please enter a valid {genericLabel || label.toLowerCase()}.</span>
        </div>}
        <input id={id} ref={ref => this.store.formFieldRefs[id] = ref} type={type || 'text'} className="form-control" disabled={this.store.isConfigured} defaultValue={value}/>
      </div>
    )
  }

  renderSubmitButton = () => {
    const disabled = !this.store.mdmFormIsValid || this.store.isConfigured || this.store.beingSubmitted;
    return (
      <div className="form-group text-center">
        <button id="mdm_submit_btn" aria-labelledby="configure-mdm-form" aria-disabled={disabled} type="submit" className='fn-primary'>
        {this.store.beingSubmitted
          ? <span>
              <i className="icon-reload" aria-label="Still Submitting Form"></i>
              &nbsp;&nbsp;Submitting&hellip;
            </span>
          : <span>Submit</span>}
        </button>
      </div>
    )
  }

  renderBreakConnectionButton = () => {
    return (
      <div className="break-mdm-wrapper col-xs-12">
        <div className="container">
          <button onClick={this.togglebreakMDMConnection} className="break-mdm-btn fn-primary" aria-labelledby="break-mdm-connection" aria-disabled={!this.store.isConfigured}>Break Connection</button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <article id="configure-mdm-page">
        {this.renderBreadcrumb()}
        {this.store.isConfigured && this.renderBreakConnectionButton()}
        <div className="mdm-form-wrapper container">
          <div className="col-xs-12 text-center">
            <h1>
              <span className="hidden-xs">Configure Mobile Device Management (MDM)</span>
              <span className="visible-xs-inline">Configure MDM</span>
            </h1>
          </div>

          <div className="row no-gutters">
            <section className="col-xs-12 col-lg-10 col-lg-offset-1">
              <div className="mdm-form col-md-offset-2 col-xs-12 col-md-8 col-md">
                <MDMAlerts store={this.store} alertList={this.store.mdm_form_alerts}/>
                <form id="configure-mdm-form" onSubmit={this.handleSubmit} noValidate onChange={this.updateForm} onBlur={this.updateForm}>
                  {this.store.isConfigured && <p className="mdm-description">Only one MDM can be configured at a time. To configure a new MDM, the existing connection must be broken. Once the existing connection is broken, a new one can be configured.</p>}
                  {this.renderMDMSelectMenu()}
                  {this.renderProperMDMForm()}
                  {this.renderSubmitButton()}
                </form>
              </div>
            </section>
          </div>
        </div>
        {this.renderExitModal(this.store.showExitModal)}
        {this.renderBreakConnectionModal(this.store.showbreakMDMConnection)}
      </article>
    )
  }
}
