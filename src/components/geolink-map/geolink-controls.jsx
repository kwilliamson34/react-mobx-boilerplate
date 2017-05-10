import React from 'react';
import GeolinkLayerToggle from './geolink-layer-toggle';

// import {geolinkService} from '../../core/services/geolink.service.js';

export default class GeolinkControls extends React.Component {

  static propTypes = {
    addLayer: React.PropTypes.func.isRequired,
    removeLayer: React.PropTypes.func.isRequired,
    searchMap: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleOverlayChange = this.handleOverlayChange.bind(this);
  }

  handleSearchInput() {

  }

  handleSearchSubmit() {

  }

  handleOverlayChange(event) {
    if (event.target.type === 'checkbox') {
      //update tracking in state, and manage layers
      if(event.target.checked) {
        this.props.addLayer(event.target.value);
      } else {
        this.props.removeLayer(event.target.value);
      }
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="geolink-controls">
          <h2 className="as-h4">Filter</h2>
          <form>

            <label htmlFor="location-search">Location</label>
            <input id="location-search" type="text" onChange={this.handleSearchInput.bind(this)} />
            <button type="submit" onClick={this.handleSearchSubmit.bind(this)}>
              <span className='sr-only'>Search for locations</span>
              <i aria-hidden="true" className="icon-search" alt="search icon"></i>
            </button>

            <hr />

            <fieldset>
              <legend className="sr-only">Coverage layers</legend>
              <GeolinkLayerToggle value='GTOCOutages' label='GTOC Outages' onClick={this.handleOverlayChange} defaultOn={true}/>
              <GeolinkLayerToggle value='LTEWithPriority' label='LTE with priority/preemption' onClick={this.handleOverlayChange} defaultOn={true}/>
              <GeolinkLayerToggle value='LTEWithoutPriority' label='LTE without priority/preemption' onClick={this.handleOverlayChange} defaultOn={true}/>
              <GeolinkLayerToggle value='3G4G' label='3G/4G' onClick={this.handleOverlayChange} defaultOn={true}/>
              <GeolinkLayerToggle value='2G' label='2G' onClick={this.handleOverlayChange} defaultOn={true}/>
            </fieldset>

          </form>
        </div>
      </div>
    )
  }
}
