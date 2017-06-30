import React from 'react';
import PropTypes from 'prop-types';

import {observer} from 'mobx-react';

@observer
export class PushToMDM extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    psk: PropTypes.string.isRequired,
    mdmIsConfigured: PropTypes.string,
    pushToMDM: PropTypes.func.isRequired,
    appMDMStatus: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.handlePushToMDM = this.handlePushToMDM.bind(this);
  }

  getPushToMDM = (psk) => {
    let status = this.props.appMDMStatus[psk];
    return status;
  }

  handlePushToMDM(event) {
    event.preventDefault();
    if(this.props.mdmIsConfigured){
      this.props.pushToMDM(this.props.psk);
    }
  }

  render() {
    let status = this.props.mdmIsConfigured ? this.getPushToMDM(this.props.psk) : 'disabled';

    let name = this.props.name;
    let srMSG = '';
    let btnLabel = null;

    switch(status) {
      case 'unpushed':
        srMSG = 'Push '+name+' to MDM';
        btnLabel = (<span aria-hidden="true">Push to MDM</span>);
        break;
      case 'submitting':
        btnLabel = (<span><i className="icon-reload" aria-label="Still Submitting Form"></i>&nbsp;&nbsp;Submitting&hellip;</span>);
        break;
      case 'failed':
        srMSG = 'This app failed to pushed to the MDM. Click agian to re-push';
        btnLabel = (<span aria-hidden="true">Push to MDM</span>);
        break;
      case 'pushed':
        srMSG = 'This app has already been pushed to the MDM. Click to re-push';
        btnLabel = (<span>Re-Push to MDM</span>);
        break;
      case 'repushed':
        srMSG = 'This app has already been pushed to the MDM. Click to re-push';
        btnLabel = (<span>Re-Push to MDM</span>);
        break;
      case 'old':
        srMSG = 'This app has been pushed to the MDM. Click agian to update';
        btnLabel = (<span>Update</span>);
        break;
      default:
        srMSG = 'PUSH TO MDM button is unavailable. Configure MDM to push apps to the system.';
        btnLabel = (<span aria-hidden="true">Push to MDM</span>);
    }

    return (
      <button id={'pushBtn' + this.props.psk} onClick={this.handlePushToMDM} aria-disabled={!this.props.mdmIsConfigured} className='fn-primary'>
        {!this.props.mdmIsConfigured && <span className="sr-only">{srMSG}</span>}
        {btnLabel}
      </button>
    );
  }
}
