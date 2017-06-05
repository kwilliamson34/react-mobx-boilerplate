import React from 'react';
import PropTypes from 'prop-types';
import { inject,	observer} from 'mobx-react';
import { withRouter } from 'react-router-dom';

import { MDMAlerts } from '../components/configure-mdm/mdm-alerts';

import { AirWatchForm } from '../components/configure-mdm/air-watch-form';
import { IBMForm } from '../components/configure-mdm/ibm-form';
import { MobileIronForm } from '../components/configure-mdm/mobile-iron-form';


@inject('store')
@observer
export default withRouter(class ConfigureMDM extends React.Component {

  static propTypes = {
    store: PropTypes.object,
    history: PropTypes.object
  }

	constructor(props) {
		super(props);
		this.store = this.props.store.mdmStore;
    this.history = this.props.history;
    this.isConfigured = false;
	}

  componentWillMount() {
    this.store.clearAlerts();
    this.store.hasBeenSubmitted = false;
    this.store.getMDMConfiguration();
  }

  componentDidUpdate() {
    if(this.store.hasBeenSubmitted){
      this.history.replace('/admin/manage-apps');
    }
  }

  componentWillUnmount() {
    if(this.store.formHasChanged && !this.store.hasBeenSubmitted){
      this.store.showExitModal = true;
      this.history.goBack();
    }
  }

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
  }


  showMDMProviderError = (messages) => {
    if (messages.length) {
      return (<div className="msgBlock error error-list" role="alert" aria-live = "assertive" key={messages}><span>{messages}</span></div>);
    }
  }

  toggleExitModal = (event) => {
    event.preventDefault();
    this.store.toggleExitModal()
  }

  discardFormChanges = (event) => {
    event.preventDefault();
    this.store.discardFormChanges()
    this.history.replace('/admin/manage-apps');
  }

  breakMDMConnection = (event) => {
    event.preventDefault();
    this.store.breakMDMConnection()
  }

  renderExitModal = () => {
    return (
      <div>
        <div id="exitModal" className="modal fade in" ref="exit modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <button type="button" className="btn close-modal icon-close" onClick={this.toggleExitModal}>
                <span className="sr-only">close window</span>
              </button>
              <div className="row no-gutters">
                <div className="col-xs-12">
                  <h4 className="as-h2">Unsaved changes</h4>
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
      <div className="modal fade" id="breakConnectionModal" ref="modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <button type="button" className="btn close-modal icon-close" data-dismiss="modal">
              <span className="sr-only">close window</span>
            </button>
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
    )
  }

	render() {

    let mdm_provider = this.store.currentMDMForm.get('mdmProvider') || this.store.mdmProvider;
    let mdm_form = null;

    this.isConfigured = this.store.pseMDMObject.entries().length ? true : false;
    // let isConfigured = this.store.pseMDMObject.entries().length ? true : false;
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
        <div className="container">
            {this.isConfigured && <button data-toggle="modal" data-target="#breakConnectionModal" className= "break-mdm-btn fn-primary" aria-labelledby="break-mdm-connection" aria-disabled={!this.isConfigured}>Break Connection</button>}
            <div className="col-xs-12 text-center">
                <h1 className="as-h2">Configure Mobile Device Management (MDM)</h1>
            </div>

            <div className="row no-gutters">
                <section className="col-xs-12 col-lg-10 col-lg-offset-1">
                    <div className="mdm-form col-md-offset-2 col-xs-12 col-md-8 col-md">

                    {this.store.alert_msgs && <MDMAlerts store = {this.store}/>}

                        {this.isConfigured && <p className="mdm-description">Only one MDM can be configured at a time. To configure a new MDM, the existing connection must be broken. Once the existing connection is broken, a new one can be configured.</p>}
                        <div className={this.store.mdmErrorMessages.length ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
                          <label className="control-label" htmlFor="mdm">Your MDM<span className="required-asterisks"> *</span></label>
                          {this.showMDMProviderError(this.store.mdmErrorMessages)}
                            <select id="mdm"
                              className={mdm_provider ==='' ? 'form-control placeholder': 'form-control'}
                              onChange={this.updateMDM}
                              onBlur={this.updateMDM}
                              value={mdm_provider}
                              disabled={this.isConfigured}>
                              <option value="" hidden>Select MDM</option>
                              <option value="airWatchForm">Airwatch</option>
                              <option value="ibmForm">IBM Maas 360</option>
                              <option value="mobileIronForm">MobileIron</option>
                            </select>
                        </div>

                        <form id="configure-mdm-form" onSubmit={this.handleSubmit} noValidate onBlur={this.updateForm}>
                          {mdm_form}
                          <div className="form-group text-center">
                            <button id="mdm_submit_btn" aria-labelledby="configure-mdm-form" aria-disabled={!this.store.formIsValid || this.isConfigured || this.store.beingSubmitted} type="submit" className='fn-primary'>
                            {this.store.beingSubmitted && <i className="icon-profile" aria-label="Still Submitting Form"></i>}
                            <span>Submit</span>{this.store.beingSubmitted && <span>ting...</span>}
                            </button>
                          </div>
                        </form>
                    </div>
                </section>
            </div>
        </div>

        {this.store.showExitModal && this.renderExitModal()}
        {this.isConfigured && this.renderBreakConnectionModal()}

      </article>
		)
	}
});
