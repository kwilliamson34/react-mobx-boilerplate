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

  constructor(props) {
    super(props);
    this.ariaLiveMessage = '';
  }

  getMDMStatusForAppCatalog = (psk) => {
    return this.props.appCatalogMDMStatuses[psk];
  }

  handleButtonClick = (event) => {
    event.preventDefault();
    if(this.props.configuredMDMType){
      this.ariaLiveMessage = 'App submission in progress.';
      this.props.pushToMDM(this.props.psk);
    } else {
      this.ariaLiveMessage = 'Push to MDM is not available. Configure an MDM to push apps to the system.';
    }
  }

  render() {
    let enabled = this.props.configuredMDMType !== '';
    let btnLabel = 'Push to MDM';
    let btnClass = 'fn-primary';
    let iconClass = '';

    if(enabled) {
      switch(this.getMDMStatusForAppCatalog(this.props.psk)) {
        case 'IN_PROGRESS':
        case 'PENDING':
          btnClass = 'fn-primary deaden';
          iconClass = 'icon-reload';
          btnLabel = 'Submitting&hellip;';
          break;
        case 'INSTALLED':
          btnClass = 'fn-secondary';
          btnLabel = 'Re-Push to MDM';
          this.ariaLiveMessage = '';
          break;
        case 'INSTALLED_UPDATABLE':
          //TODO enhancement: customize this case
          console.log('Update available for app_psk=' + this.props.psk); //xxx
          btnLabel = 'Push to MDM'; //'Update';
          this.ariaLiveMessage = '';
          break;
        case 'NOT_INSTALLED':
        case 'FAILED':
        default:
          btnLabel = 'Push to MDM';
          this.ariaLiveMessage = '';
          break;
      }
    }

    return (
      <button id={'pushBtn' + this.props.psk} onClick={this.handleButtonClick} className={`push-button ${btnClass} ${enabled ? '' : 'disabled'}`}>
        {this.ariaLiveMessage && <span className="sr-only" role="status" aria-live="polite">{this.ariaLiveMessage}</span>}
        {iconClass && <i className={iconClass} aria-hidden="true"></i>}
        <span aria-hidden="true" dangerouslySetInnerHTML={{__html: btnLabel}}></span>
      </button>
    );
  }
}
