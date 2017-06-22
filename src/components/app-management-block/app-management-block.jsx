import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import Checkbox from '../toggle/checkbox.jsx';

@observer
export default class AppManagementBlock extends React.Component {

  static propTypes = {
    psk: PropTypes.string.isRequired,
    getMatchingApp: PropTypes.func.isRequired,
    changeAppAvailability: PropTypes.func.isRequired,
    changeAppRecommended: PropTypes.func.isRequired,
    mdmIsConfigured: PropTypes.bool.isRequired,
    pushToMDM: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.handleAvailableClick = this.handleAvailableClick.bind(this);
    this.handleRecommendedClick = this.handleRecommendedClick.bind(this);
    this.handlePushToMDM = this.handlePushToMDM.bind(this);
    this.state = {
      pushingToMDM:false
    }
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

  handlePushToMDM(event) {
    event.preventDefault();
    if(this.props.mdmIsConfigured){
      this.props.pushToMDM(this.props.psk);
      this.setState({
        pushingToMDM: true
      });
    }
  }

  render() {
    //get the latest matching app object
    this.matchingApp = this.props.getMatchingApp(this.props.psk);

    console.log(this.state.pushingToMDM)

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
          <button id={'Push-' + this.props.psk} onClick={this.handlePushToMDM} aria-disabled={!this.props.mdmIsConfigured} className='fn-primary'>
            {this.state.pushingToMDM
              ? <span>
                  <i className="icon-reload" aria-label="Still Submitting Form"></i>
                  &nbsp;&nbsp;Submitting&hellip;
                </span>
              : <span>Push to MDM</span>
            }
          </button>
        </div>}
      </div>
    );
  }
}
