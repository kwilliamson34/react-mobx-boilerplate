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
  }

  handleAvailableClick(event) {
    const isAvailable = event.target.checked;

    //turn dependent toggle off if necessary
    if(!isAvailable && this.props.app.isRecommended) {
      this.recommendedToggle.doClick();
    }

    if(isAvailable !== this.props.app.isAvailable) {
      this.props.store.cardListStore.changeAppAvailability(this.props.app.id, isAvailable);
    }
  }

  handleRecommendedClick(event) {
    const isRecommended = event.target.checked;
    if(isRecommended !== this.props.app.isRecommended) {
      this.props.store.cardListStore.changeAppRecommended(this.props.app.id, isRecommended);
    }
  }

  render() {
    return (
      <div>
        <div className="app-management">
          <Toggle
            label="Available"
            id={'Available-' + this.props.app.id}
            defaultOn={this.props.app.isAvailable}
            onClick={this.handleAvailableClick}/>
          <Toggle
            label="Recommended"
            ref={ref => this.recommendedToggle = ref}
            id={'Recommended-' + this.props.app.id}
            defaultOn={this.props.app.isRecommended}
            disabled={this.props.app.recommendToggleIsDisabled}
            onClick={this.handleRecommendedClick}/>
          <Link to="/mdm">
            <Button className="fn-primary" tabIndex="-1">Push to MDM</Button>
          </Link>
        </div>
      </div>
    );
  }
}
