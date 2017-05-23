import React from 'react';
import Checkbox from '../toggle/checkbox';
import PropTypes from 'prop-types';

export default class GeolinkControls extends React.Component {

  static propTypes = {
    geolinkStore: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
    this.toggleNetwork = this.toggleNetwork.bind(this);
    this.toggleTraffic = this.toggleTraffic.bind(this);
    this.toggleWeather = this.toggleWeather.bind(this);
    this.toggleAlerts = this.toggleAlerts.bind(this);
  }

  handleSearchInput(event) {
    this.props.geolinkStore.updateSearchTerm(event.target.value);
  }

  handleSearchSubmit() {
    this.props.geolinkStore.searchMap();
  }

  handleSearchKeyPress(event) {
    if (event.key == 'Enter') {
      event.preventDefault();
      this.handleSearchSubmit();
    }
  }

  toggleNetwork(event) {
    if (event.target.type === 'checkbox') {
      if(event.target.checked) {
        this.props.geolinkStore.addAllNetworkLayers();
      } else {
        this.props.geolinkStore.removeAllNetworkLayers();
      }
    }
  }

  toggleTraffic(event) {
    if (event.target.type === 'checkbox') {
      this.props.geolinkStore.toggleTraffic();
    }
  }

  toggleWeather(event) {
    if (event.target.type === 'checkbox') {
      if(event.target.checked) {
        this.props.geolinkStore.addWeather();
      } else {
        this.props.geolinkStore.removeWeather();
      }
    }
  }

  toggleAlerts(event){
    if (event.target.type === 'checkbox') {
      this.props.geolinkStore.toggleAlerts(event.target.checked);
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
              <Checkbox id='network-toggle' value='Network' label='Network' onChange={this.toggleNetwork} defaultOn={true}/>
              <Checkbox id='traffic-toggle' value='Traffic' label='Traffic' onChange={this.toggleTraffic} defaultOn={false}/>
              <Checkbox id='weather-toggle' value='Weather' label='Weather' onChange={this.toggleWeather} defaultOn={false}/>
              <Checkbox id='alerts-toggle' value='Alerts' label='Alerts' onChange={this.toggleAlerts} defaultOn={false}/>
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
