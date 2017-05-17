import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {FormGroup, FormControl, ControlLabel, Button, Modal} from 'react-bootstrap';


@inject('store')
@observer
export default class ConfigureMDM extends React.Component {
  constructor(props){
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
        <div className="msgBlock error error-list" role="alert" aria-live="assertive"key={messages}>
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
    if(!this.MDMStore.formHasChanged && !this.MDMStore.showExitModal){
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
                <button href="/admin" onClick={this.toggleExitModal}>Administration Dashboard</button>
                <b>></b>
                <button href="/manage-apps" onClick={this.toggleExitModal}>Manage Apps</button>
                <b>></b>
                <span> Configure MDM</span>
              </div>
              <div className="col-xs-12 text-center">
                  <h1 className="as-h2">Configure Mobile Device Management (MDM)</h1>
              </div>
              <div className="row no-gutters">
                  <section className="col-xs-12 col-lg-10 col-lg-offset-1">
                      <div className="mdm-form col-md-offset-2 col-xs-12 col-md-8 col-md">
                          <form onSubmit={this.handleSubmit} noValidate id="configure-mdm-form">
                              <FormGroup name="regionValue" controlId="regionValue" validationState={this.MDMStore.mdmErrorMessages.length ? 'error' : null}>
                                  <ControlLabel>Your MDM<span className="required-asterisks"> *</span></ControlLabel>
                                  {this.showErrorMessages(this.MDMStore.mdmErrorMessages)}
                                  <FormControl componentClass="select" className={this.MDMStore.regionValue=='' ? 'placeholder': ''} inputRef={(field)=> {this.regionValueField = field;}} onChange={this.validateMDM} onBlur={this.validateMDM}>
                                      <option value="" hidden>Select MDM</option>
                                      <option value="AW">Airwatch</option>
                                      <option value="IBM">IBM Maas 360</option>
                                      <option value="MI">MobileIron</option>
                                  </FormControl>
                              </FormGroup>
                              <FormGroup name="zipCode" controlId="zipCode" validationState={this.MDMStore.endPointErrorMessages.length ? 'error' : null}>
                                  <ControlLabel>API End Point<span className="required-asterisks"> *</span></ControlLabel>
                                  {this.showErrorMessages(this.MDMStore.endPointErrorMessages)}
                                  <FormControl type="text" inputRef={(field)=> {this.zipCodeField = field;}} onBlur={this.validateEndPoint}/>
                              </FormGroup>
                              <FormGroup name="cityName" controlId="cityName" validationState={this.MDMStore.apiKeyErrorMessages.length ? 'error' : null}>
                                  <ControlLabel>API Key<span className="required-asterisks"> *</span></ControlLabel>
                                  {this.showErrorMessages(this.MDMStore.apiKeyErrorMessages)}
                                  <FormControl type="text" inputRef={(field)=> {this.cityNameField = field;}} onBlur={this.validateKey}/>
                              </FormGroup>
                              <FormGroup className="text-center">
                                  <Button aria-labelledby="configure-mdm-form" aria-disabled={!this.MDMStore.formIsValid} type="submit" className='fn-primary'>Submit</Button>
                              </FormGroup>
                          </form>
                      </div>
                  </section>
              </div>
          </div>
          <Modal show={this.MDMStore.showExitModal} onHide={this.toggleExitModal}>
            <div className="row no-gutters">
              <div className="col-xs-12">
                <h4 className="as-h2">Unsaved changes</h4>
                <p>Your form changes will not be saved if you navigate away from this page.</p>
              </div>
              <div className="col-xs-12 text-center">
                <Button className='fn-primary' onClick={this.toggleExitModal}>Stay on Page</Button>
                <Button className='fn-secondary' href='/admin'>Discard Changes</Button>
              </div>
            </div>
          </Modal>
      </article>
    )
  }
}

ConfigureMDM.propTypes = {
  store: PropTypes.object
};