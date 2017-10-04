import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';

import PageTitle from '../components/page-title/page-title';
import {MDMAlerts} from '../components/configure-mdm/mdm-alerts';
import AirWatchForm from '../components/configure-mdm/air-watch-form';
import IBMForm from '../components/configure-mdm/ibm-form';
import MobileIronForm from '../components/configure-mdm/mobile-iron-form';
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
		this.mdmStore = this.props.store.mdmStore;
	}

  componentWillMount() {
    this.mdmStore.hasBeenSubmitted = false;
    this.mdmStore.getMDMConfiguration();
  }

  componentWillUnmount() {
    this.mdmStore.form = undefined;

    //FPSE-1064 clear all alerts from this page
    this.mdmStore.mdm_form_alerts = [];
  }

	handleSelectChange = (event) => {
		this.mdmStore.updateMDM(event.target.value);
	}

  breakMDMConnection = (event) => {
    event.preventDefault();
    this.mdmStore.breakMDMConnection();
    this.togglebreakMDMConnection(event);
  }

  togglebreakMDMConnection = (event) => {
    event.preventDefault();
    this.mdmStore.togglebreakMDMConnection();
  }

  renderBreakConnectionModal = (showbreakMDMConnection) => {
    this.showModal(showbreakMDMConnection, '#breakConnectionModal');
    return (
      <div id="breakConnectionModal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="break-connection-modal-title">
        <div className="modal-dialog">
          <div className="modal-content">
            <button type="button" className="fn-modal-close" onClick={this.togglebreakMDMConnection}>
              <i aria-hidden="true" className="icon-close"></i>
              <span className="sr-only">Close window</span>
            </button>
            <div className="row no-gutters" id="break-connection-modal-title">
              <div className="col-xs-12">
                <PageTitle className="as-h2">Confirm break connection</PageTitle>
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
          className='form-control'
          onChange={this.handleSelectChange}
          value={this.mdmStore.values.mdm_type}
          disabled={this.mdmStore.mdmIsConfigured}>
          <option value="">Select MDM</option>
          <option value="AIRWATCH">Airwatch</option>
          <option value="MAAS360">IBM MaaS360</option>
          <option value="MOBILE_IRON">MobileIron</option>
        </select>
      </div>
    )
  }

  renderProperMDMForm = () => {
    let MDMFormComponent;
    switch(this.mdmStore.values.mdm_type) {
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
      return <MDMFormComponent store={this.mdmStore} disabled={this.mdmStore.mdmIsConfigured}/>
    }
    return null;
  }

  renderBreakConnectionButton = () => {
    return (
      <div className="break-mdm-wrapper col-xs-12">
        <div className="container">
          <button onClick={this.togglebreakMDMConnection} className="break-mdm-btn fn-primary" aria-labelledby="break-mdm-connection" aria-disabled={!this.mdmStore.mdmIsConfigured}>Break Connection</button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <article id="configure-mdm-page">
        {this.renderBreadcrumb()}
        {this.mdmStore.mdmIsConfigured && this.renderBreakConnectionButton()}
        <div className="mdm-form-wrapper container">
          <div className="col-xs-12 text-center">
            <PageTitle childrenContainHTML>
              <span className="hidden-xs">Configure Mobile Device Management (MDM)</span>
              <span className="visible-xs-inline">Configure MDM</span>
            </PageTitle>
          </div>

          <div className="row no-gutters">
            <section className="col-xs-12 col-lg-10 col-lg-offset-1">
              <div className="mdm-form col-md-offset-2 col-xs-12 col-md-8 col-md">
                <MDMAlerts store={this.mdmStore} alertList={this.mdmStore.mdm_form_alerts}/>
                <section>
                  {this.mdmStore.mdmIsConfigured && <p className="mdm-description">Only one MDM can be configured at a time. To configure a new MDM, the existing connection must be broken. Once the existing connection is broken, a new one can be configured.</p>}
                  {this.renderMDMSelectMenu()}
                  {this.renderProperMDMForm()}
                </section>
              </div>
            </section>
          </div>
        </div>
        {this.renderBreakConnectionModal(this.mdmStore.showbreakMDMConnection)}
      </article>
    )
  }
}
