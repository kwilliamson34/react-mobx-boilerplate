import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {observable, computed} from 'mobx';

@observer
export class PushToMDM extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    psk: PropTypes.string.isRequired,
    configuredMDMType: PropTypes.string,
    pushToMDM: PropTypes.func.isRequired,
    appCatalogMDMStatuses: PropTypes.object
  }

  static defaultProps = {
    configuredMDMType: '',
    appCatalogMDMStatuses: {}
  }

  @computed get currentStatus() {
    return this.props.appCatalogMDMStatuses[this.props.psk];
  }
  @computed get isConfigured() {
    return this.props.configuredMDMType !== '';
  }
  @computed get isDisabled() {
    return !this.isConfigured || this.currentStatus === 'DISABLED';
  }
  @observable ariaLiveMessage = '';

  handleClick = () => {
    if(!this.isConfigured){
      this.ariaLiveMessage = 'Push to MDM is not available. Configure an MDM to push apps to the system.';
    } else if (this.currentStatus === 'DISABLED') {
      this.ariaLiveMessage = 'Push to MDM is not available for this app.';
    } else {
      this.ariaLiveMessage = 'App submission in progress.';
      this.props.pushToMDM(this.props.psk).then(() => {
        /* Must push a non-empty string for live region to recognize a change.
        This string is not actually announced; it's pre-empted by the alert bar. */
        this.ariaLiveMessage = 'Done.';
      });
    }
  }

  handleBlur = () => {
    this.ariaLiveMessage = '';
  }

  render() {
    let btnLabel = 'Push to MDM';
    let btnClass = 'fn-primary';
    let iconClass = '';

    if(this.isConfigured) {
      switch(this.currentStatus) {
        case 'IN_PROGRESS':
        case 'PENDING':
          btnClass = 'fn-primary deaden';
          iconClass = 'icon-reload';
          btnLabel = 'Pushing&hellip;';
          break;
        case 'INSTALLED':
          btnClass = 'fn-secondary';
          btnLabel = 'Re-Push to MDM';
          break;
        case 'INSTALLED_UPDATABLE':
          //TODO enhancement: customize this case
          btnLabel = 'Push to MDM'; //'Update';
          break;
        case 'NOT_INSTALLED':
        case 'FAILED':
        default:
          btnLabel = 'Push to MDM';
          break;
      }
    }

    return (
      <div>
        <span className="sr-only" role="alert" aria-live="assertive">
          {this.ariaLiveMessage}
        </span>
        <button
          type="button"
          id={'pushBtn' + this.props.psk}
          onClick={this.handleClick}
          onBlur={this.handleBlur}
          aria-disabled={this.isDisabled}
          className={`push-button ${btnClass}`}>

          {iconClass && <i className={iconClass} aria-hidden="true"></i>}
          <span dangerouslySetInnerHTML={{__html: btnLabel}}></span>
        </button>
      </div>
    );
  }
}
