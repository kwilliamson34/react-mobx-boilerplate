import React from 'react';
import PropTypes from 'prop-types';

import {observer} from 'mobx-react';

@observer
export class PushToMDM extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    psk: PropTypes.string.isRequired,
    configuredMDMType: PropTypes.string,
    pushToMDM: PropTypes.func.isRequired,
    appCatalogMDMStatuses: PropTypes.object
  }

  getMDMStatusForAppCatalog = (psk) => {
    return this.props.appCatalogMDMStatuses[psk];
  }

  handleButtonClick = (event) => {
    event.preventDefault();
    if(this.props.configuredMDMType){
      this.props.pushToMDM(this.props.psk);
    }
  }

  render() {
    let status = this.props.configuredMDMType ? this.getMDMStatusForAppCatalog(this.props.psk) : null;
    let disabled = !this.props.configuredMDMType;
    let screenReaderMessage = '';
    let btnLabel = null;
    let btnClass ='fn-primary';
    let icon = '';

    switch(status) {
      case 'NOT_INSTALLED':
        screenReaderMessage = `Push ${this.props.name} to MDM`;
        btnLabel = 'Push to MDM';
        break;
      case 'IN_PROGRESS':
      case 'PENDING':
        btnClass = 'fn-primary deaden';
        screenReaderMessage = 'Submitting the app to MDM.';
        icon = (<i className="icon-reload"></i>);
        btnLabel = 'Submitting&hellip;'
        break;
      case 'FAILED':
        screenReaderMessage = 'This app failed to push to MDM. Click again to re-push.';
        btnLabel = 'Push to MDM';
        break;
      case 'INSTALLED':
        btnClass = 'fn-secondary';
        screenReaderMessage = 'This app has already been pushed to MDM. Click to re-push.';
        btnLabel = 'Re-Push to MDM';
        break;
      case 'NEEDS_UPDATE':
        screenReaderMessage = 'This app has been pushed to MDM and has an available update. Click to push the update.';
        btnLabel = 'Update';
        break;
      default:
        disabled = true;
        screenReaderMessage = 'Push to MDM is not available. Configure an MDM to push apps to the system.';
        btnLabel = 'Push to MDM';
        break;
    }

    return (
      <button id={'pushBtn' + this.props.psk} onClick={this.handleButtonClick} aria-disabled={disabled} className={`push-button ${btnClass}`}>
        <span className="sr-only">{screenReaderMessage}</span>
        {icon}
        <span aria-hidden="true" dangerouslySetInnerHTML={{__html: btnLabel}}></span>
      </button>
    );
  }
}
