import React from 'react';
import Checkbox from '../toggle/checkbox';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
export default class GeolinkControls extends React.Component {
  static propTypes = {
    geolinkStore: PropTypes.object.isRequired
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
            <div className="col-xs-12 col-sm-offset-1 col-sm-6 col-md-offset-0 col-md-4 map-search">
							<h2 className="as-h5">Search</h2>
              <form className="search-form form-group" onSubmit={this.handleSubmit}>
                <div className="search-input input-group">
                  <label htmlFor="search-field" className="control-label">Location</label>
                  <div className="search-bar">
                    <input id="search-field" type="search" className="form-control" onChange={this.handleSearchInput} onKeyPress={this.handleSearchKeyPress}/>
                    <button className="btn search-btn" type="button">
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
                  <Checkbox id="network-toggle" value="Network" label="Network" onChange={this.toggleNetwork} checked={this.geoStore.showNetworkLayer}/>
                  <Checkbox id="traffic-toggle" value="Traffic" label="Traffic" onChange={this.toggleTraffic} checked={this.geoStore.showTrafficLayer}/>
                  <Checkbox id="weather-toggle" value="Weather" label="Weather" onChange={this.toggleWeather} checked={this.geoStore.showWeatherLayer}/>
                  <Checkbox id="alerts-toggle" value="Alerts" label="Alerts" onChange={this.toggleAlerts} checked={this.geoStore.showAlertLayer}/>
                </fieldset>
              </form>
            </div>
            <div className="col-xs-12 col-sm-offset-1 col-sm-10 col-md-offset-0 col-md-4 report-coverage-issue">
              <h2 className="as-h5">Report coverage issue</h2>
              <div className="emergency-numbers">
                <div className="emergency">
                  Emergency:<br/>
                  <a className="deaden" href="tel:1-800-XXX-XXXX">1-800-***-****</a>
                </div>
                <div className="non-emergency">
                  Non-emergency:<br/>
                  <a className="deaden" href="tel:1-800-XXX-XXXX">1-800-***-****</a>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 hidden-sm col-md-12">
              <hr/>
            </div>
          </div>
          <div className="row is-flex">
            <div className="col-xs-12 col-sm-offset-1 col-sm-10 col-md-offset-0 col-md-4">
              <h2 className="as-h5">Network</h2>
              <div className="key-labels">
                <span>4G LTE</span>
                <span>4G</span>
                <span>3G</span>
                <span>2G</span>
              </div>
              <div className="coverage-legend">
                <img src="/images/spectrum-gradient.svg" alt=""/>
              </div>
            </div>
            <div className="col-xs-12 col-sm-offset-1 col-sm-10 col-md-offset-0 col-md-4">
              <h2 className="as-h5">Weather</h2>
              <div className="key-labels">
                <span>Light Rain</span>
                <span>Heavy Rain</span>
                <span>Snow</span>
                <span>Ice</span>
              </div>
              <div className="weather-legend">
                <img src="/images/precip-gradient.svg" alt=""/>
              </div>
            </div>
            <div className="col-xs-12 col-sm-offset-1 col-sm-10 col-md-offset-0 col-md-4">
              <h2 className="as-h5">Traffic</h2>
              <div className="traffic-legend-wrapper ">
                <div className="traffic-bars ">
                  <div className="key-labels traffic">
                    <span>Fast</span>
                    <span>Slow</span>
                  </div>
                  <div className="traffic-legend">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
                <div className="hazards-legend">
                  <span>Construction<br/><i className="icon-warning construction" aria-hidden="true"/></span>
                  <span>Vehicle Incident<br/><i className="icon-warning incident" aria-hidden="true"/></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
