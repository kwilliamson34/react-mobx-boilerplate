import React from 'react';
import PropTypes from 'prop-types';
import { inject,	observer} from 'mobx-react';
import { Link } from 'react-router-dom';

import { AirWatchForm } from '../components/configure-mdm/air-watch-form';
import { IBMForm } from '../components/configure-mdm/ibm-form';
import { MobileIronForm } from '../components/configure-mdm/mobile-iron-form';


@inject('store')
@observer
export default class ConfigureMDM extends React.Component {

  static propTypes = {
    store: PropTypes.object
  }

	constructor(props) {
		super(props);
		this.store = this.props.store.mdmStore;
	}

	updateMDM = (event) => {
		this.store.updateMDM(event.target.value);
	}

  showErrorMessages = (messages) => {
    let jsx = '';
    if (messages.length) {
      jsx = (
        <div className="msgBlock error error-list"
        role="alert"
        aria-live = "assertive"
        key={messages}>
        <span>{messages}</span>
        </div>
      );
    }
    return jsx;
  }

  breakMDMConnection = (event) => {
    event.preventDefault();
    this.store.breakMDMConnection()
  }

	render() {

    let mdm_provider = this.store.currentMDM.get('mdmProvider') || this.store.mdmProvider;
    let isConfigured = this.store.currentMDM.entries().length ? true : false;
    let mdm_form = null;

    switch(mdm_provider) {
      case 'airWatchForm':
        mdm_form = <AirWatchForm store={this.store} connectionSet={isConfigured} formData={isConfigured ? this.store.currentMDM.toJS() : this.store.airWatchForm.toJS()}/>;
        break;
      case 'ibmForm':
        mdm_form = <IBMForm store={this.store} connectionSet={isConfigured} formData={isConfigured ? this.store.currentMDM.toJS() : this.store.ibmForm.toJS()}/>;
        break;
      case 'mobileIronForm':
        mdm_form = <MobileIronForm store={this.store} connectionSet={isConfigured} formData={isConfigured ? this.store.currentMDM.toJS() : this.store.mobileIronForm.toJS()}/>;
        break;
      default:
        mdm_form = null;
    }

		return (
			<article id="configure-mdm-page">
        <div className="container">
            {isConfigured && <button data-toggle="modal" data-target="#breakConnectionModal" className= "break-mdm-btn fn-primary" aria-labelledby="break-mdm-connection" aria-disabled={!isConfigured}>Break Connection</button>}
            <div className="col-xs-12 text-center">
                <h1 className="as-h2">Configure Mobile Device Management (MDM)</h1>
            </div>

            <div className="row no-gutters">
                <section className="col-xs-12 col-lg-10 col-lg-offset-1">
                    <div className="mdm-form col-md-offset-2 col-xs-12 col-md-8 col-md">

                      {this.store.alert_msg &&
                        <div role="alert" className={`alert alert-${this.store.alert_msg === 'ERROR' ? 'danger' : 'success'}`}>
                          <button type="button" className="close"><span aria-hidden="true">×</span><span className="sr-only">Close alert</span></button>
                          {this.store.alert_msg === 'ERROR' && <p><strong>Error:</strong> Please correct the errors below.</p>}
                          {this.store.alert_msg === 'SUCCESS' && <p><strong>Success!</strong> The connection to MDM has been broken.</p>}
                        </div>
                      }

                        {isConfigured && <p className="mdm-description">Only one MDM can be configured at a time. To configure a new MDM, the existing connection must be broken. Once the existing connection is broken, a new one can be configured.</p>}
                        <div className={this.store.mdmErrorMessages.length ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
                          <label className="control-label" htmlFor="mdm">Your MDM<span className="required-asterisks"> *</span></label>
                          {this.showErrorMessages(this.store.mdmErrorMessages)}

                            <select id="mdm"
                              className={mdm_provider ==='' ? 'form-control placeholder': 'form-control'}
                              onChange={this.updateMDM}
                              onBlur={this.updateMDM}
                              value={mdm_provider}
                              disabled={isConfigured}>
                              <option value="" hidden>Select MDM</option>
                              <option value="airWatchForm">Airwatch</option>
                              <option value="ibmForm">IBM Maas 360</option>
                              <option value="mobileIronForm">MobileIron</option>
                            </select>
                        </div>
                        {mdm_form}
                    </div>
                </section>
            </div>
        </div>

        <div className="modal fade" id="exitModal" ref="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="row no-gutters">
                <div className="col-xs-12">
                  <h4 className="as-h2">Unsaved changes</h4>
                  <p>Your form changes will not be saved if you navigate away from this page.</p>
                </div>
                <div className="col-xs-12 text-center">
                  <button className='fn-primary' data-dismiss="modal">Stay on Page</button>
                  <Link className='fn-secondary' to='/admin'>Discard Changes</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="breakConnectionModal" ref="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="row no-gutters">
                <div className="col-xs-12">
                  <h4 className="as-h2">Confirm break connection</h4>
                  <p>This cannot be undone. If you break this application’s connection to MDM, you will have to re-configure it using this form to establish a new connection.</p>
                </div>
                <div className="col-xs-12 text-center">
                  <button className='fn-primary' data-dismiss="modal">Keep Connection</button>
                  <button className='fn-secondary' data-dismiss="modal" onClick={this.breakMDMConnection}>Break Connection</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
		)
	}
}
