import React from 'react';
import Checkbox from '../toggle/checkbox';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
export default class GeolinkControls extends React.Component {
  static propTypes = {
    geolinkStore: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.geoStore = this.props.geolinkStore;
  }

  componentWillMount() {
    this.geoStore.resetLayerToggles();
  }

  handleSearchInput = (event) => {
    this.geoStore.updateSearchTerm(event.target.value);
  }

  handleSearchSubmit = () => {
    this.geoStore.searchMap();
  }

  handleSearchKeyPress = (event) => {
    if (event.key == 'Enter') {
      event.preventDefault();
      this.handleSearchSubmit();
    }
  }

  toggleNetwork = (event) => {
    if (event.target.type === 'checkbox') {
      this.geoStore.toggleNetwork();
    }
  }

  toggleTraffic = (event) => {
    if (event.target.type === 'checkbox') {
      this.geoStore.toggleTraffic();
    }
  }

  toggleWeather = (event) => {
    if (event.target.type === 'checkbox') {
      this.geoStore.toggleWeather();
    }
  }

  toggleAlerts = (event) => {
    if (event.target.type === 'checkbox') {
      this.geoStore.toggleAlerts();
    }
  }

  render() {
    return (
      <section className="geolink-controls">
        <div className="col-xs-12 col-sm-4">
          <form className="form-group search-input">
            <label htmlFor="geo-search" className="control-label">Location</label>
            <span className="input-group">
              <input id="geo-search" type="text" className="form-control" onChange={this.handleSearchInput} onKeyPress={this.handleSearchKeyPress}/>
              <span className="input-group-btn">
                <button type="button" className="btn btn-default" onClick={this.handleSearchSubmit}>
                  <span className='sr-only'>Search for locations</span>
                  <i aria-hidden="true" className="icon-search" alt="search icon"></i>
                </button>
              </span>
            </span>
          </form>
        </div>
        <div className="col-xs-12 col-sm-4">
          <form className="form-group">
            <fieldset>
              <legend className="sr-only">Coverage layers</legend>
              <Checkbox id='network-toggle' value='Network' label='Network' onChange={this.toggleNetwork} checked={this.geoStore.showNetworkLayer}/>
              <Checkbox id='traffic-toggle' value='Traffic' label='Traffic' onChange={this.toggleTraffic} checked={this.geoStore.showTrafficLayer}/>
              <Checkbox id='weather-toggle' value='Weather' label='Weather' onChange={this.toggleWeather} checked={this.geoStore.showWeatherLayer}/>
              <Checkbox id='alerts-toggle' value='Alerts' label='Alerts' onChange={this.toggleAlerts} checked={this.geoStore.showAlertLayer}/>
            </fieldset>
          </form>
        </div>
        <div className="col-xs-12 col-sm-4">
          <article>
            <p>Report coverage issue</p>
            <p className="as-link red">Emergency 1-800-GET-HELP</p>
            <p className="as-link">Non-emergency</p>
            <hr/>
            <p className="as-link">Subscribe to Network Alerts</p>
          </article>
        </div>
      </section>
    )
  }
}
