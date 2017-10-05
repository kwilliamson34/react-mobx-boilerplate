import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import Checkbox from '../forms/checkbox';
import MapSearch from './map-search';

@observer
export default class GeolinkControls extends React.Component {
  static propTypes = {
    geolinkStore: PropTypes.object.isRequired,
    disabled: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.geoStore = this.props.geolinkStore;
    this.geoStore.formFieldRefList = [];
  }

  componentWillMount() {
    this.geoStore.resetLayerToggles();
  }

  toggleNetwork = input => {
    if (input.type === 'checkbox') {
      this.geoStore.toggleNetwork();
    }
  };

  toggleTraffic = input => {
    if (input.type === 'checkbox') {
      this.geoStore.toggleTraffic();
    }
  };

  toggleWeather = input => {
    if (input.type === 'checkbox') {
      this.geoStore.toggleWeather();
    }
  };

  toggleAlerts = input => {
    if (input.type === 'checkbox') {
      this.geoStore.toggleAlerts();
    }
  };

  render() {
    return (
      <section className={`geolink-controls has-transition ${this.geoStore.pageMode === 'MAP_CONTROLS' ? 'transition-in' : 'transition-out'}`}>
        <div className="container">
          <div className="row is-flex">
            <div className="col-xs-12 col-sm-8 col-md-4 map-search">
              <h2 className="as-h5">Search</h2>
                <MapSearch
                  geolinkStore={this.geoStore}
                  ref={ref => this.geoStore.formFieldRefList.push(ref)}
                  dataObject={this.geoStore.values}
                  id="locationAddress"
                  labelText="Location"/>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 map-layers">
              <h2 className="as-h5">Layers</h2>
              <form className="form-group">
                <fieldset className="coverage-layers">
                  <legend className="sr-only">Coverage layers</legend>
                  <div className="col-xs-6 col-sm-12 no-gutters">
                    <Checkbox label="Network" handleOnChange={this.toggleNetwork} checked={this.geoStore.showNetworkLayer} disabled={this.props.disabled}/>
                    <Checkbox label="Weather" handleOnChange={this.toggleWeather} checked={this.geoStore.showWeatherLayer} disabled={this.props.disabled}/>
                  </div>
                  <div className="col-xs-6 col-sm-12 no-gutters">
                    <Checkbox label="Traffic" handleOnChange={this.toggleTraffic} checked={this.geoStore.showTrafficLayer} disabled={this.props.disabled}/>
                    <Checkbox label="Alerts" handleOnChange={this.toggleAlerts} checked={this.geoStore.showAlertLayer} disabled={this.props.disabled || !this.geoStore.authIsComplete}/>
                  </div>
                </fieldset>
              </form>
            </div>
            <div className="col-md-4 hidden-xs hidden-sm map-network-legend">
              {this.renderNetworkLegend()}
              {this.renderNetworkSubscriptionLink()}
              {this.renderContactInfo()}
            </div>
          </div>

          <div className="row">
            <div className="legend-divider col-xs-12">
              <hr />
              <div className="visible-xs-inline">
                {this.renderNetworkSubscriptionLink()}
                {this.renderContactInfo()}
                <hr />
              </div>
            </div>
          </div>
          <div className="row is-flex">
            <div className="col-xs-12 visible-xs-inline visible-sm-inline">
              {this.renderNetworkLegend()}
            </div>
            <div className="col-xs-12 col-md-6">
              {this.renderWeatherLegend()}
            </div>
            <div className="col-xs-12 col-md-6">
              {this.renderTrafficLegend()}
            </div>
          </div>
        </div>
      </section>
    );
  }

  renderNetworkSubscriptionLink = () => {
    return (
      <div className="network-subscription-link">
        <Link to="/subscribe-to-alerts">
          Subscribe to Network Alerts
        </Link>
      </div>
    )
  }

  renderContactInfo = () => {
    return (
      <div className="network-contact-info">
        <p><span aria-hidden="true">Report Network Issue:</span>
          <br className="visible-md-inline"/>
          <a href={'tel:' + this.geoStore.networkIssueNumber}>
            <span>
              <i className="icon-phone-number footer-support-phone" aria-hidden='true'></i>
              <span className="sr-only">Report Network Issue: Phone&nbsp;</span>
              {this.geoStore.networkIssueNumber}
            </span>
          </a>
        </p>
      </div>
    )
  }

  renderNetworkLegend = () => {
    return (
      <div>
        <span className="visible-sm">
          {this.renderNetworkSubscriptionLink()}
          {this.renderContactInfo()}
          <hr className="visible-sm col-xs-12"/>
        </span>
        <h2 className="as-h5">
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
        <h2 className="as-h5">Weather<span className="sr-only">&nbsp;color key</span></h2>
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
        <h2 className="as-h5">Traffic<span className="sr-only">&nbsp;color key</span></h2>
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
