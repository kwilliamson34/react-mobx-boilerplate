import React from 'react';
import Checkbox from '../toggle/checkbox';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
export default class GeolinkControls extends React.Component {
  static propTypes = {
    geolinkStore: PropTypes.object.isRequired,
    disabled: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.geoStore = this.props.geolinkStore;
  }

  componentWillMount() {
    this.geoStore.resetLayerToggles();
  }

  handleSearchInput = event => {
    this.geoStore.updateSearchTerm(event.target.value);
  };

  handleSearchSubmit = () => {
    this.geoStore.searchMap();

    //close native keyboard on mobile, to show search result
    this.refs.searchInput.blur();
  };

  handleSearchKeyPress = event => {
    if (event.key == 'Enter') {
      event.preventDefault();
      this.handleSearchSubmit();
    }
  };

  toggleNetwork = event => {
    if (event.target.type === 'checkbox') {
      this.geoStore.toggleNetwork();
    }
  };

  toggleTraffic = event => {
    if (event.target.type === 'checkbox') {
      this.geoStore.toggleTraffic();
    }
  };

  toggleWeather = event => {
    if (event.target.type === 'checkbox') {
      this.geoStore.toggleWeather();
    }
  };

  toggleAlerts = event => {
    if (event.target.type === 'checkbox') {
      this.geoStore.toggleAlerts();
    }
  };

  render() {
    return (
      <section className="geolink-controls">
        <div className="container">
          <div className="row is-flex">
            <div className="col-xs-12 col-sm-8 col-md-4 map-search">
							<h2 className="as-h5">Search</h2>
              <form className="search-form form-group" onSubmit={this.handleSubmit}>
                <div className="search-input input-group">
                  <label htmlFor="search-field" className="control-label">Location</label>
                  <div className="search-bar">
                    <input id="search-field" type="search" ref="searchInput" disabled={this.props.disabled} className="form-control" onChange={this.handleSearchInput} onKeyPress={this.handleSearchKeyPress}/>
                    <button className="btn search-btn" type="button" onClick={this.handleSearchSubmit} disabled={this.props.disabled}>
                      <span className="sr-only">Search for locations</span>
                      <span aria-hidden="true" className="icon-search"/>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 map-layers">
              <h2 className="as-h5">Layers</h2>
              <form className="form-group">
                <fieldset className="coverage-layers">
                  <legend className="sr-only">Coverage layers</legend>
                  <div className="col-xs-6 col-sm-12 no-gutters">
                    <Checkbox id="network-toggle" value="Network" label="Network" onChange={this.toggleNetwork} checked={this.geoStore.showNetworkLayer} disabled={this.props.disabled}/>
                    <Checkbox id="weather-toggle" value="Weather" label="Weather" onChange={this.toggleWeather} checked={this.geoStore.showWeatherLayer} disabled={this.props.disabled}/>
                  </div>
                  <div className="col-xs-6 col-sm-12 no-gutters">
                    <Checkbox id="traffic-toggle" value="Traffic" label="Traffic" onChange={this.toggleTraffic} checked={this.geoStore.showTrafficLayer} disabled={this.props.disabled}/>
                    <Checkbox id="alerts-toggle" value="Alerts" label="Alerts" onChange={this.toggleAlerts} checked={this.geoStore.showAlertLayer} disabled={this.props.disabled || !this.geoStore.authIsComplete}/>
                  </div>
                </fieldset>
              </form>
            </div>
            <div className="col-md-4 hidden-xs hidden-sm map-network-legend">
              {this.renderNetworkLegend()}
              {this.renderContactInfo()}
            </div>
          </div>

          <div className="row">
            <div className="legend-divider col-xs-12">
              <hr />
              <div className="visible-xs-inline">
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

  renderContactInfo = () => {
    return (
      <div className="network-contact-info">
        <p><span aria-hidden="true">Report Network Issue:</span>
          <br className="visible-md-inline"/>
          <a href={'tel:' + this.geoStore.networkIssueNumber}>
            <i className="icon-phone-number footer-support-phone" aria-hidden='true'></i>
            <span className="sr-only">Report Network Issue: Phone&nbsp;</span>
            {this.geoStore.networkIssueNumber}
          </a>
        </p>
      </div>
    )
  }

  renderNetworkLegend = () => {
    return (
      <div>
        <span className="visible-sm-inline">{this.renderContactInfo()}</span>
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
