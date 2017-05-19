import React from 'react';
import PropTypes from 'prop-types';
import { inject,	observer} from 'mobx-react';
import { Link } from 'react-router-dom';


@inject('store')
@observer
export default class ConfigureMDM extends React.Component {
	constructor(props) {
		super(props);
		this.MDMStore = this.props.store.mdmStore;
	}

	componentWillMount() {
		this.MDMStore.getMDMConfiguration();
	}

	// TODO
	// componentDidUpdate() {
	//   if(this.MDMStore.formHasChanged){
	//      window.addEventListener("beforeunload", function (event) {
	//           event.returnValue = "unsaved data"
	//       });
	//    }
	// }

	// componentWillUnmount() {
	//     window.removeEventListener("beforeunload", this.onUnload)
	// }

	validateMDM = (event) => {
		this.MDMStore.validateMDM(event.target.value);
	}

	validateEndPoint = (event) => {
		this.MDMStore.validateEndPoint(event.target.value);
	}

	validateKey = (event) => {
		this.MDMStore.validateKey(event.target.value);
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

	handleSubmit = (event) => {
		event.preventDefault();
		this.MDMStore.setMDMConfiguration();
	}

	toggleExitModal = (event) => {
		if (!this.MDMStore.formHasChanged && !this.MDMStore.showExitModal) {
			event.preventDefault();
		} else {
			this.MDMStore.toggleExitModal();
		}
	}

	render() {
		return (
			<article id="configure-mdm-page">
          <div className="container">
              <div className="sample-breadcrumbs">
                <Link to="/admin" onClick={this.toggleExitModal}>Administration Dashboard</Link>
                <strong>></strong>
                <button data-toggle="modal" data-target="#exitModal">Manage Apps</button>
                <strong>></strong>
                <span> Configure MDM</span>
              </div>
              <div className="col-xs-12 text-center">
                  <h1 className="as-h2">Configure Mobile Device Management (MDM)</h1>
              </div>
              <div className="row no-gutters">
                  <section className="col-xs-12 col-lg-10 col-lg-offset-1">
                      <div className="mdm-form col-md-offset-2 col-xs-12 col-md-8 col-md">
                          <form onSubmit={this.handleSubmit} noValidate id="configure-mdm-form">
                                <div className={this.MDMStore.mdmErrorMessages.length ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
                                  <label className="control-label" htmlFor="mdm">Your MDM<span className="required-asterisks"> *</span></label>
                                  {this.showErrorMessages(this.MDMStore.mdmErrorMessages)}

                                    <select id="mdm"
                                      className={this.MDMStore.regionValue=='' ? 'form-control placeholder': 'form-control'}
                                      onChange={this.validateMDM}
                                      onBlur={this.validateMDM}
                                      >
                                      <option value="" hidden>Select MDM</option>
                                      <option value="AW">Airwatch</option>
                                      <option value="IBM">IBM Maas 360</option>
                                      <option value="MI">MobileIron</option>
                                    </select>
                                </div>

                                <div className={this.MDMStore.endPointErrorMessages.length ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
                                  <label className="control-label" htmlFor="endpoint">API End Point<span className="required-asterisks"> *</span></label>
                                  {this.showErrorMessages(this.MDMStore.endPointErrorMessages)}
                                  <input
                                    id="endpoint"
                                    type="text"
                                    onBlur={this.validateEndPoint}
                                    className="form-control"/>
                                </div>

                                <div className={this.MDMStore.apiKeyErrorMessages.length ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
                                  <label className="control-label" htmlFor="apiKey">API Key<span className="required-asterisks"> *</span></label>
                                  {this.showErrorMessages(this.MDMStore.apiKeyErrorMessages)}
                                  <input
                                    id="apiKey"
                                    className="form-control"
                                    type="text"
                                    onBlur={this.validateKey}/>
                                </div>

                              <div className="form-group text-center">
                                  <button
                                    aria-labelledby="configure-mdm-form"
                                    aria-disabled={!this.MDMStore.formIsValid}
                                    type="submit"
                                    className='fn-primary'>Submit</button>
                              </div>
                          </form>
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
          </article>
		)
	}
}

ConfigureMDM.propTypes = {
	store: PropTypes.object
};
