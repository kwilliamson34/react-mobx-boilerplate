import React from 'react';
import PropTypes from 'prop-types';

import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

import Toggle from '../toggle/toggle.jsx';

@inject('store')
@observer
export default class AppManagementBlock extends React.Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
    app: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.handleAvailableClick = this.handleAvailableClick.bind(this);
    this.handleRecommendedClick = this.handleRecommendedClick.bind(this);
    this.cardListStore = this.props.store.cardListStore;
    this.state = {
      isRecommended: this.props.app.isRecommended,
      isAvailable: this.props.app.isAvailable
    }
  }

  handleAvailableClick(event) {
    //update the available state
    this.cardListStore.changeAppAvailability(this.props.app.id, event.target.checked);
    this.setState({isAvailable: event.target.checked});

    //manage the recommended state if necessary
    if(!event.target.checked) {
      if(this.state.isRecommended) {
        this.cardListStore.changeAppRecommended(this.props.app.id, false);
        this.setState({isRecommended: false});
      }
      this.recommendedToggle.toggleOffAndDisable();
    } else {
      this.recommendedToggle.enable();
    }
  }

  handleRecommendedClick(event) {
    //update recommended state, only if the app is not blocked
    if(this.state.isAvailable) {
      this.cardListStore.changeAppRecommended(this.props.app.id, event.target.checked);
      this.setState({isRecommended: event.target.checked});
    } else {
      event.preventDefault();
    }
  }

  render() {
    return (
      <div>
        <div className="app-management">
          <Toggle
            label="Available"
            id={'Avail' + this.props.app.id}
            defaultOn={this.props.app.isAvailable}
            onClick={this.handleAvailableClick}/>
          <Toggle
            label="Recommended"
            ref={ref => this.recommendedToggle = ref}
            id={'Recom' + this.props.app.id}
            defaultOn={this.props.app.isRecommended}
            onClick={this.handleRecommendedClick}/>
          <Link to="/mdm">
            <Button className="fn-primary" tabIndex="-1">Push to MDM</Button>
          </Link>
        </div>
      </div>
    );
  }
}
