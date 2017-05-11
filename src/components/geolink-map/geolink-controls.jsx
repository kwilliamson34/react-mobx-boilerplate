import React from 'react';
import GeolinkLayerToggle from './geolink-layer-toggle';
import PropTypes from 'prop-types';
import {FormGroup, FormControl, InputGroup, ControlLabel, Button} from 'react-bootstrap';

export default class GeolinkControls extends React.Component {

  static propTypes = {
    geolinkStore: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
    this.toggleNetworkStatus = this.toggleNetworkStatus.bind(this);
    this.toggleTraffic = this.toggleTraffic.bind(this);
    this.toggleWeather = this.toggleWeather.bind(this);
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

  toggleNetworkStatus(event) {
    if (event.target.type === 'checkbox') {
      if(event.target.checked) {
        this.props.geolinkStore.addAllCoverageLayers();
      } else {
        this.props.geolinkStore.removeAllCoverageLayers();
      }
    }
  }

  toggleTraffic() {
    this.props.geolinkStore.toggleTraffic();
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

  render() {
    return (
      <section className="geolink-controls">
        <div className="col-xs-12 col-md-4">
          <FormGroup controlId="location" className="search-input">
            <ControlLabel>Location</ControlLabel>
            <InputGroup>
              <FormControl type="text" onChange={this.handleSearchInput} onKeyPress={this.handleSearchKeyPress}/>
              <InputGroup.Button>
                <Button type="submit" onClick={this.handleSearchSubmit}>
                  <span className='sr-only'>Search for locations</span>
                  <i aria-hidden="true" className="icon-search" alt="search icon"></i>
                </Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </div>
        <div className="col-xs-12 col-md-4">
          <form>
            <fieldset className="form-group">
              <legend className="sr-only">Coverage layers</legend>
              <GeolinkLayerToggle value='NetworkStatus' label='Network status' onClick={this.toggleNetworkStatus} defaultOn={true}/>
              <GeolinkLayerToggle value='Traffic' label='Traffic' onClick={this.toggleTraffic} defaultOn={true}/>
              <GeolinkLayerToggle value='Weather' label='Weather' onClick={this.toggleWeather} defaultOn={true}/>
            </fieldset>
          </form>
        </div>
        <div className="col-xs-12 col-md-4">
        </div>
      </section>
    )
  }
}
