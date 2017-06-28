import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {history} from '../core/services/history.service';

import {MDMAlerts} from '../components/configure-mdm/mdm-alerts';
import {AirWatchForm} from '../components/configure-mdm/air-watch-form';
import {IBMForm} from '../components/configure-mdm/ibm-form';
import {MobileIronForm} from '../components/configure-mdm/mobile-iron-form';
import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';

@inject('store')
@observer
export default class ConfigureMDM extends React.Component {

  static propTypes = {
    store: PropTypes.object
  }

	constructor(props) {
		super(props);
    this.pathHistory = this.props.store.pathHistory;
		this.store = this.props.store.mdmStore;
    this.isConfigured = false;
	}

  componentWillMount() {
    this.store.clearAlerts();
    this.store.hasBeenSubmitted = false;
    this.store.getMDMConfiguration();
    if(this.store.showExitModal){
      this.store.interceptedRoute = this.pathHistory[this.pathHistory.length - 2];
    }
  }

  componentDidUpdate() {
    if(this.store.hasBeenSubmitted){
      history.replace('/admin/manage-apps');
    }
  }

  componentWillUnmount() {
    if(this.store.formHasChanged && !this.store.hasBeenSubmitted && this.store.mdmProvider){
      this.store.showExitModal = true;
      history.goBack();
    }
  }

  // Configure MDM Form Functions

	updateMDM = (event) => {
		this.store.updateMDM(event.target.value);
	}

  updateForm = (event) => {
    event.preventDefault();
    if(event.target.id !== 'mdm_submit_btn'){
      this.store.updateForm(event.target, document.getElementById('configure-mdm-form'))
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.store.submitForm(event.target)
    window.scrollTo(0, 0);
    document.getElementById('mdm-alerts').focus();
  }

  // MDM Modals Functions

  discardFormChanges = (event) => {
    event.preventDefault();
    this.store.resetMDMForm();
    // this.store.clearAlerts();
    history.replace(this.store.interceptedRoute);
  }

  breakMDMConnection = (event) => {
    event.preventDefault();
    this.store.breakMDMConnection()
  }

  toggleExitModal = (event) => {
    event.preventDefault();
    this.store.toggleExitModal()
    document.getElementById('exitModal').focus();
  }

  togglebreakMDMConnection = (event) => {
    event.preventDefault();
    this.store.togglebreakMDMConnection();
  }

  renderExitModal = () => {
    return (
      <div>
        <div id="exitModal" className="modal fade in">
          <div className="modal-dialog">
            <div className="modal-content">
              <button type="button" className="btn close-modal icon-close" onClick={this.toggleExitModal}>
                <span className="sr-only">close window</span>
              </button>
              <div className="row no-gutters">
                <div className="col-xs-12">
                  <h1 className="as-h2">Unsaved changes</h1>
                  <p>Your form changes will not be saved if you navigate away from this page.</p>
                </div>
                <div className="col-xs-12 text-center">
                  <button className='fn-primary' onClick={this.toggleExitModal}>Stay on Page</button>
                  <button className='fn-secondary' onClick={this.discardFormChanges}>Discard Changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade in" ></div>
      </div>
    )
  }

  renderBreakConnectionModal = () => {
    return (
      <div id="breakConnectionModal" >
        <div className="modal fade in">
          <div className="modal-dialog">
            <div className="modal-content">
              <button type="button" className="btn close-modal icon-close" onClick={this.togglebreakMDMConnection}>
                <span className="sr-only">close window</span>
              </button>
              <div className="row no-gutters">
                <div className="col-xs-12">
                  <h1 className="as-h2">Confirm break connection</h1>
                  <p>This cannot be undone. If you break this application’s connection to MDM, you will have to re-configure it using this form to establish a new connection.</p>
                </div>
                <div className="col-xs-12 text-center">
                  <button className='fn-primary' onClick={this.togglebreakMDMConnection}>Keep Connection</button>
                  <button className='fn-secondary' onClick={this.breakMDMConnection}>Break Connection</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade in" ></div>
      </div>
    )
  }

	render() {

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

    let mdm_provider = this.store.mdmProvider;
    let mdm_form = null;

    this.isConfigured = this.store.pseMDMObject.get('mdm_type') ? true : false;

    let formData = this.isConfigured ? this.store.pseMDMObject.toJS() : this.store.currentMDMForm.toJS();

    switch(mdm_provider) {
      case 'airWatchForm':
        mdm_form = <AirWatchForm store={this.store} connectionSet={this.isConfigured} formData={formData}/>;
        break;
      case 'ibmForm':
        mdm_form = <IBMForm store={this.store} connectionSet={this.isConfigured} formData={formData}/>;
        break;
      case 'mobileIronForm':
        mdm_form = <MobileIronForm store={this.store} connectionSet={this.isConfigured} formData={formData}/>;
        break;
      default:
        mdm_form = null;
    }

		return (
			<article id="configure-mdm-page">
        <BreadcrumbNav links={crumbs}/>
        <div className="mdm-form-wrapper container">
            {this.isConfigured && <button onClick={this.togglebreakMDMConnection} className= "break-mdm-btn fn-primary" aria-labelledby="break-mdm-connection" aria-disabled={!this.isConfigured}>Break Connection</button>}
            <div className="col-xs-12 text-center">
                <h1 className="as-h2">Configure Mobile Device Management (MDM)</h1>
            </div>

            <div className="row no-gutters">
                <section className="col-xs-12 col-lg-10 col-lg-offset-1">
                    <div className="mdm-form col-md-offset-2 col-xs-12 col-md-8 col-md">

                      {this.store.form_alerts && <MDMAlerts store = {this.store} page = "mdm_form"/>}

                      <form id="configure-mdm-form" onSubmit={this.handleSubmit} noValidate onChange={this.updateForm} onBlur={this.updateForm}>
                        
                        {this.isConfigured && <p className="mdm-description">Only one MDM can be configured at a time. To configure a new MDM, the existing connection must be broken. Once the existing connection is broken, a new one can be configured.</p>}
                        
                        <div className='form-group has-feedback'>
                          <label className="control-label" htmlFor="mdm">Your MDM<span className="required-asterisks"> *</span></label>
                            <select id="mdm"
                              className={`form-control ${mdm_provider ==='' && 'placeholder'}`}
                              onChange={this.updateMDM}
                              value={mdm_provider}
                              disabled={this.isConfigured}>
                              <option value="">Select MDM</option>
                              <option value="airWatchForm">Airwatch</option>
                              <option value="ibmForm">IBM MaaS360</option>
                              <option value="mobileIronForm">MobileIron</option>
                            </select>
                        </div>
                        
                        {mdm_form}
                        
                        <div className="form-group text-center">
                          <button id="mdm_submit_btn" aria-labelledby="configure-mdm-form" aria-disabled={!this.store.formIsValid || this.isConfigured || this.store.beingSubmitted} type="submit" className='fn-primary'>
                          {this.store.beingSubmitted
                            ? <span>
                                <i className="icon-reload" aria-label="Still Submitting Form"></i>
                                &nbsp;&nbsp;Submitting&hellip;
                              </span>
                            : <span>Submit</span>}
                          </button>
                        </div>
                      </form>
                    </div>
                </section>
            </div>
        </div>

        {this.store.showExitModal && this.renderExitModal()}
        {(this.isConfigured && this.store.showbreakMDMConnection) && this.renderBreakConnectionModal()}

      </article>
		)
	}
}
