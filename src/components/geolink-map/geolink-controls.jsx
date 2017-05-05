import React from 'react';
import Toggle from '../toggle/toggle';

// import {geolinkService} from '../../core/services/geolink.service.js';

export default class GeolinkControls extends React.Component {

  handleSearchInput() {

  }

  handleSearchSubmit() {

  }

  handleOverlayChange() {

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
              <Toggle value='GTOCOutages' label='GTOC Outages' onClick={this.handleOverlayChange} defaultOn={true}/>
              <Toggle value='LTEWithPriority' label='LTE with priority/preemption' onClick={this.handleOverlayChange} defaultOn={true}/>
              <Toggle value='LTEWithoutPriority' label='LTE without priority/preemption' onClick={this.handleOverlayChange} defaultOn={true}/>
              <Toggle value='3G4G' label='3G/4G' onClick={this.handleOverlayChange} defaultOn={true}/>
              <Toggle value='2G' label='2G' onClick={this.handleOverlayChange} defaultOn={true}/>
            </fieldset>

          </form>
        </div>
      </div>
    )
  }
}
