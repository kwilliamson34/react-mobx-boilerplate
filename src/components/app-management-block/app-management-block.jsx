import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import Checkbox from '../toggle/checkbox.jsx';
import {PushToMDM} from '../push-to-mdm/push-to-mdm';

@observer
export default class AppManagementBlock extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    psk: PropTypes.string.isRequired,
    getMatchingApp: PropTypes.func.isRequired,
    changeAppAvailability: PropTypes.func.isRequired,
    changeAppRecommended: PropTypes.func.isRequired,
    mdmIsConfigured: PropTypes.string,
    pushToMDM: PropTypes.func.isRequired,
    appMDMStatus: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.handleAvailableClick = this.handleAvailableClick.bind(this);
    this.handleRecommendedClick = this.handleRecommendedClick.bind(this);
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
          <PushToMDM
              name={this.props.name}
              psk={this.props.psk}
              mdmIsConfigured={this.props.mdmIsConfigured}
              pushToMDM={this.props.pushToMDM}
              appMDMStatus={this.props.appMDMStatus}/>
        </div>}
      </div>
    );
  }
}
