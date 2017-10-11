import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import Checkbox from '../forms/checkbox';
import TextInput from '../forms/text-input';

@observer
export default class GeolinkControls extends React.Component {
  static propTypes = {
    geolinkStore: PropTypes.object.isRequired,
    disabled: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.store = this.props.geolinkStore;
  }

  componentWillMount() {
    this.store.formFieldRefList = [];
    this.store.resetLayerToggles();
  }

  toggleNetwork = input => {
    if (input.type === 'checkbox') {
      this.store.toggleNetwork();
    }
  };

  toggleTraffic = input => {
    if (input.type === 'checkbox') {
      this.store.toggleTraffic();
    }
  };

  toggleWeather = input => {
    if (input.type === 'checkbox') {
      this.store.toggleWeather();
    }
  };

  toggleAlerts = input => {
    if (input.type === 'checkbox') {
      this.store.toggleAlerts();
    }
  };

  clearSuccess = () => {
    this.store.showSuccess = false;
  }

  renderSuccess = () => {
    return (
      <div className="alert alert-success">
        <button type="button" className="close_btn icon-close" onClick={this.clearSuccess}>
          <span className="sr-only">Close alert</span>
        </button>
        <p role="alert" aria-live="assertive">
          <strong>Success!&nbsp;</strong>{this.store.successText}
        </p>
      </div>
    )
  }

  render() {
    return (
      <section className={`geolink-controls ${this.store.pageTitle === 'Network Status' ? 'show' : 'hide'}`}>
        {this.store.showSuccess &&
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                {this.renderSuccess()}
              </div>
            </div>
          </div>
        }
        <div className="container">
          <div className="row is-flex">
            <div className="col-xs-12 col-sm-7 col-md-4 map-search">
              {this.renderSearchArea()}
            </div>
            <hr className="col-xs-12 visible-xs"/>
            <div className="col-xs-12 col-sm-5 col-md-4 map-layers">
              <h2>Layers</h2>
              <form className="form-group">
                <fieldset className="coverage-layers">
                  <legend className="sr-only">Coverage layers</legend>
                  <div className="col-xs-6 no-gutters">
                    <Checkbox label="Network" handleOnChange={this.toggleNetwork} checked={this.store.showNetworkLayer} disabled={this.props.disabled}/>
                    <Checkbox label="Weather" handleOnChange={this.toggleWeather} checked={this.store.showWeatherLayer} disabled={this.props.disabled}/>
                  </div>
                  <div className="col-xs-6 no-gutters">
                    <Checkbox label="Traffic" handleOnChange={this.toggleTraffic} checked={this.store.showTrafficLayer} disabled={this.props.disabled}/>
                    <Checkbox label="Alerts" handleOnChange={this.toggleAlerts} checked={this.store.showAlertLayer} disabled={this.props.disabled || !this.store.authIsComplete}/>
                  </div>
                </fieldset>
              </form>
            </div>
            {this.renderDesktopOnlyNetworkBlock()}
          </div>

          {this.renderMobileOnlyContactBlock()}

          <div className="row is-flex">
            <div className="legend-block col-xs-12 visible-xs-inline visible-sm-inline">
              {this.renderNetworkLegend()}
            </div>
            <hr className="col-xs-12 hidden-xs hidden-sm" />
            <div className="legend-block col-xs-12 col-md-6">
              {this.renderWeatherLegend()}
            </div>
            <div className="legend-block col-xs-12 col-md-6">
              {this.renderTrafficLegend()}
            </div>
          </div>
        </div>
      </section>
    );
  }

  renderSearchArea = () => {
    return (
      <div>
        <span className="top-right-link">
          <Link to="/manage-favorites">Manage Favorites</Link>
        </span>
        <h2 className="as-h5">Search</h2>
        <TextInput
          ref={ref => this.store.formFieldRefList.push(ref)}
          checkFormForErrors={this.store.checkFormForErrors.bind(this.store)}
          dataObject={this.store.values}
          id="locationAddress"
          type="search"
          labelText="Address"
          labelIsSrOnly={true}
          disabled={this.store.disableSearch}
          className="search-form"
          showClearButton={true}
          handleSubmit={this.store.searchMap.bind(this.store)}
          submitIcon="icon-search"/>
        <button
          className={`as-link add-favorite-button ${this.store.values.locationAddress ? '' : 'disabled'}`}
          ref="addFavoriteBtn"
          onClick={this.store.showAddLocationForm.bind(this.store)}>
          Add Favorite
        </button>
      </div>
    )
  }

  renderDesktopOnlyNetworkBlock = () => {
    return (
      <div className="col-md-4 hidden-xs hidden-sm map-network-legend">
        {this.renderNetworkLegend()}
        {this.renderContactInfo()}
      </div>
    )
  }

  renderMobileOnlyContactBlock = () => {
    return (
      <div className="row is-flex visible-xs visible-sm">
        <div className="col-xs-12 no-gutters">
          <hr />
        </div>
        <div className="col-xs-12 col-sm-6">
          {this.renderNetworkSubscriptionLink()}
        </div>
        <div className="col-xs-12 col-sm-6">
          {this.renderContactInfo()}
        </div>
        <div className="col-xs-12 no-gutters">
          <hr />
        </div>
      </div>
    )
  }

  renderNetworkSubscriptionLink = () => {
    return (
      <div className="network-subscription-link">
        <Link to="/subscribe-to-alerts">
          Subscribe to <span className="visible-xs-inline visible-sm-inline">Network </span>Alerts
        </Link>
      </div>
    )
  }

  renderContactInfo = () => {
    return (
      <p className="network-contact-info">
        <span aria-hidden="true">Report Network Issue:</span>
        <br className="visible-md-inline"/>
        <a href={'tel:' + this.store.networkIssueNumber}>
          <span>
            <i className="icon-phone-number footer-support-phone" aria-hidden='true'></i>
            <span className="sr-only">Report Network Issue: Phone&nbsp;</span>
            {this.store.networkIssueNumber}
          </span>
        </a>
      </p>
    )
  }

  renderNetworkLegend = () => {
    return (
      <div>
        <span className="hidden-xs hidden-sm">
          {this.renderNetworkSubscriptionLink()}
        </span>
        <h2>
          Network<span className="sr-only">&nbsp;color key</span>
        </h2>
        <div className="key-labels">
          <span className="as-label">4G LTE</span>
          <span className="as-label">4G</span>
          <span className="as-label">3G</span>
          <span className="as-label">2G</span>
        </div>
        <div className="legend-gradient">
          <img src="/images/network-legend.png" alt=""/>
        </div>
      </div>
    )
  }

  renderWeatherLegend = () => {
    return (
      <div>
        <h2>Weather<span className="sr-only">&nbsp;color key</span></h2>
        <div className="key-labels">
          <span className="as-label">Light Rain</span>
          <span className="as-label">Heavy Rain</span>
          <span className="as-label">Snow</span>
          <span className="as-label">Ice</span>
        </div>
        <div className="legend-gradient">
          <img src="/images/weather-legend.png" alt=""/>
        </div>
      </div>
    )
  }

  renderTrafficLegend = () => {
    return (
      <div>
        <h2>Traffic<span className="sr-only">&nbsp;color key</span></h2>
        <div className="traffic-legend-wrapper ">
          <div className="traffic-bars">
            <div className="key-labels traffic">
              <span className="as-label">Fast</span>
              <span className="as-label">Normal</span>
              <span className="as-label">Slow</span>
            </div>
            <div className="traffic-legend">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="hazards-legend">
            <span className="as-label">Construction<br/><i className="icon-warning construction" aria-hidden="true"/></span>
            <span className="as-label">Vehicle Incident<br/><i className="icon-warning incident" aria-hidden="true"/></span>
          </div>
        </div>
      </div>
    )
  }
}
