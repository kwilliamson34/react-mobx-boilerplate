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
    mdmIsConfigured: PropTypes.bool
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
          <button id={'Push-' + this.props.psk} aria-disabled={!this.props.mdmIsConfigured} className='fn-primary'>
            {!this.props.mdmIsConfigured && <span className="sr-only">Configure MDM to push apps to the system.</span>}
            <span>Push to MDM</span>
          </button>
        </div>}
      </div>
    );
  }
}
