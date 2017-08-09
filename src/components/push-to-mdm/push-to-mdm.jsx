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
    let enabled = this.props.configuredMDMType !== '';
    let screenReaderMessage = '';
    let btnLabel = '';
    let btnClass = 'fn-primary';
    let iconClass = '';

    if(enabled) {
      switch(this.getMDMStatusForAppCatalog(this.props.psk)) {
        case 'IN_PROGRESS':
        case 'PENDING':
          btnClass = 'fn-primary deaden';
          screenReaderMessage = 'App submission in progress.';
          iconClass = 'icon-reload';
          btnLabel = 'Submitting&hellip;'
          break;
        case 'INSTALLED':
          btnClass = 'fn-secondary';
          screenReaderMessage = `Re-push app titled ${this.props.name} to MDM.`;
          btnLabel = 'Re-Push to MDM';
          break;
        case 'INSTALLED_UPDATABLE':
          //TODO enhancement: customize this case
          console.log('Update available for app_psk=' + this.props.psk);
          screenReaderMessage = `Push app titled ${this.props.name} to MDM.`; //`Push update for app titled ${this.props.name} to MDM.`;
          btnLabel = 'Push to MDM'; //'Update';
          break;
        case 'NOT_INSTALLED':
        case 'FAILED':
        default:
          screenReaderMessage = `Push app titled ${this.props.name} to MDM.`;
          btnLabel = 'Push to MDM';
          break;
      }
    } else {
      enabled = false;
      screenReaderMessage = 'Push to MDM is not available. Configure an MDM to push apps to the system.';
      btnLabel = 'Push to MDM';
    }


    return (
      <button id={'pushBtn' + this.props.psk} onClick={this.handleButtonClick} className={`push-button ${btnClass} ${enabled ? '' : 'disabled'}`}>
        <span className="sr-only" aria-live="assertive">{screenReaderMessage}</span>
        {iconClass ? <i className={iconClass} aria-hidden="true"></i> : ''}
        <span aria-hidden="true" dangerouslySetInnerHTML={{__html: btnLabel}}></span>
      </button>
    );
  }
}
