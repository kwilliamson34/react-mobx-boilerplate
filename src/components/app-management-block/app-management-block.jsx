import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import Checkbox from '../toggle/checkbox.jsx';

@observer
export default class AppManagementBlock extends React.Component {

  static propTypes = {
    card: PropTypes.object.isRequired,
    psk: PropTypes.string.isRequired,
    getMatchingApp: PropTypes.func.isRequired,
    changeAppAvailability: PropTypes.func.isRequired,
    changeAppRecommended: PropTypes.func.isRequired,
    mdmIsConfigured: PropTypes.bool.isRequired,
    pushToMDM: PropTypes.func.isRequired,
    appMDMStatus: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.handleAvailableClick = this.handleAvailableClick.bind(this);
    this.handleRecommendedClick = this.handleRecommendedClick.bind(this);
    this.handlePushToMDM = this.handlePushToMDM.bind(this);
  }

  handleAvailableClick(event) {
    if (event.target.type === 'checkbox') {
      //get the latest matching app object
      this.matchingApp = this.props.getMatchingApp(this.props.psk);

      const isAvailable = event.target.checked;

      //turn dependent toggle off if necessary
      if (!isAvailable && this.matchingApp.isRecommended) {
        this.recommendedToggle.turnOff();
      }

      if (isAvailable !== this.matchingApp.isAvailable) {
        this.props.changeAppAvailability(this.props.psk, isAvailable);
      }
    }
  }

  handleRecommendedClick(event) {
    if (event.target.type === 'checkbox') {
      //get the latest matching app object
      this.matchingApp = this.props.getMatchingApp(this.props.psk);

      const isRecommended = event.target.checked;

      if (isRecommended !== this.matchingApp.isRecommended) {
        this.props.changeAppRecommended(this.props.psk, isRecommended);
      }
    }
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

  renderPushToMDM =  () => {

    let status = this.props.mdmIsConfigured ? this.getPushToMDM(this.props.psk) : 'disabled';

    let srMSG = '';
    let btnLabel = null;

    switch(status) {
      case 'unpushed':
        btnLabel = (<span>Push to MDM</span>);
        break;
      case 'submitting':
        btnLabel = (<span><i className="icon-reload" aria-label="Still Submitting Form"></i>&nbsp;&nbsp;Submitting&hellip;</span>);
        break;
      case 'failed':
        srMSG = 'This app failed to pushed to the MDM. Click agian to re-push';
        btnLabel = (<span>Re-Push to MDM</span>);
        break;
      case 'pushed':
        srMSG = 'This app has been pushed to the MDM. Click agian to update';
        btnLabel = (<span>Update</span>);
        break;
      default:
        srMSG = 'PUSH TO MDM button unavailable. Configure MDM to push apps to the system.';
        btnLabel = (<span aria-hidden="true">Push to MDM</span>);
    }

    return (
      <button id={'Push-' + this.props.psk} onClick={this.handlePushToMDM} aria-disabled={!this.props.mdmIsConfigured} className='fn-primary'>
        {!this.props.mdmIsConfigured && <span className="sr-only">{srMSG}</span>}
        {btnLabel}
      </button>
    )
  }

  render() {
    //get the latest matching app object
    this.matchingApp = this.props.getMatchingApp(this.props.psk);

    return (
      <div>
        {this.matchingApp && <div className="app-management">
          <Checkbox label="Available"
						ref={ref => this.availableToggle = ref}
						id={'Available-' + this.props.psk}
						checked={this.matchingApp.isAvailable}
						onChange={this.handleAvailableClick}/>
          <Checkbox label="Recommended"
						ref={ref => this.recommendedToggle = ref}
						id={'Recommended-' + this.props.psk}
						checked={this.matchingApp.isRecommended}
						disabled={!this.matchingApp.isAvailable}
						onChange={this.handleRecommendedClick}/>
            {this.renderPushToMDM()}
        </div>}
      </div>
    );
  }
}
