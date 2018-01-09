import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import {history} from '../../core/services/history.service';
import Checkbox from '../forms/checkbox';
import TextInput from '../forms/text-input';
import Alerts from '../alerts/alerts';

@observer
export default class GeolinkControls extends React.Component {
  static propTypes = {
    networkStore: PropTypes.object.isRequired,
    disabled: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.store = this.props.networkStore;
    this.ENTER_KEY_CODE = 13;
    this.UP_KEY_CODE = 38;
    this.DOWN_KEY_CODE = 40;
    this.focusedFavorite = null;
  }

  componentWillMount() {
    this.store.clearFormFieldRefList();
    this.store.resetLayerToggles();
    this.store.loadFavorites();
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

  onFavoriteClick = (favorite) => {
    this.store.selectFavorite(favorite);
    this.store.formFieldRefList.find((el) => {
      return el && (el.input.id === 'locationName' || el.input.id === 'locationAddress');
    }).input.focus();
  }

  onSearchClearClick = () => {
    this.store.clearSearch();
  }

  onFavoriteEnter = (event, favorite) => {
    if(event.charCode === this.ENTER_KEY_CODE) {
      this.store.selectFavorite(favorite);
      this.store.formFieldRefList.find((el) => {
        return el && (el.input.id === 'locationName' || el.input.id === 'locationAddress');
      }).input.focus();
    }
  }

  clearAlertBars = () => {
    this.store.clearAlertBars();
  }

  onManageFavoritesClick = () => {
    history.push('/manage-favorites');
    this.clearAlertBars();
  }

  onManageFavoritesEnter = (event) => {
    if(event.charCode === this.ENTER_KEY_CODE) {
      history.push('/manage-favorites');
      this.clearAlertBars();
    }
  }

  onDropIntoList = (event) => {
    if(event.keyCode === this.DOWN_KEY_CODE && this.store.dropdownIsVisible) {
      event.preventDefault();
      this.focusedFavorite = 0;
      this[`favItem${this.focusedFavorite}`].focus();
    }
  }

  onKeyDown = (event) => {
    if(event.keyCode === this.DOWN_KEY_CODE || event.keyCode === this.UP_KEY_CODE) {
      event.preventDefault();
    }
    if(event.keyCode === this.DOWN_KEY_CODE) {
      this.focusedFavorite = this.store.predictedFavorites.length ? (this.focusedFavorite + 1) % (this.store.predictedFavorites.length + 1) : 0;
      this[`favItem${this.focusedFavorite}`].focus();
    } else if(event.keyCode === this.UP_KEY_CODE) {
      if(this.focusedFavorite === 0) {
        this.store.formFieldRefList.find((el) => {
          return el.input.id === 'locationName' || el.input.id === 'locationAddress';
        }).input.focus();
      } else {
        this.focusedFavorite = this.store.predictedFavorites.length ? (this.focusedFavorite + this.store.predictedFavorites.length) % (this.store.predictedFavorites.length + 1) : 0;
        this[`favItem${this.focusedFavorite}`].focus();
      }
    }
  }

  renderPredictiveDropdown = () => {
    if(this.store.dropdownIsVisible) return (
      <div className="predictive-dropdown">
        <ul>
          {this.store.predictedFavorites.map((favorite, index) => {
            return (
              <li role="button" tabIndex="0" ref={`favItem${index}`} onFocus={() => this.focusedFavorite = index} onClick={() => this.onFavoriteClick(favorite)} onKeyPress={(e) => this.onFavoriteEnter(e, favorite)} onKeyDown={this.onKeyDown} key={index}>
                <i className="icon-star" aria-hidden></i>
                <span className="sr-only">Search for favorite named</span>
                <span>{favorite.favoriteName}</span>
                <span className="sr-only">at address</span>
                <small>{favorite.locationFavoriteAddress}</small>
              </li>
            )
          })}
          <li role="button" tabIndex="0" ref={`favItem${this.store.predictedFavorites.length}`} onFocus={() => this.focusedFavorite = this.store.predictedFavorites.length} onClick={this.onManageFavoritesClick} onKeyPress={this.onManageFavoritesEnter} onKeyDown={this.onKeyDown}>
            Manage all favorites
          </li>
        </ul>
      </div>
    );
    return '';
  }

  render() {
    const displaySuccess = this.store.successToDisplay && this.store.successToDisplay.length > 0;
    return (
      <section className="geolink-controls">
        {displaySuccess &&
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <Alerts
                  showSuccess={displaySuccess}
                  successText={this.store.successToDisplay}
                  clearSuccess={() => {this.store.updateSuccess('')}} />
              </div>
            </div>
          </div>
        }

        <div className="container">
          <div className="row is-flex">
            <div className="col-xs-12 col-md-6 map-search">
              {this.renderSearchArea()}
            </div>
            <hr className="col-xs-12 visible-xs visible-sm"/>
            <div className="col-xs-12 col-md-6 map-layers">
              {this.renderLayersArea()}
            </div>
          </div>

          <div className="row is-flex">
            <div className="col-xs-12 no-gutters">
              <hr />
            </div>
            <div className="col-xs-12 col-sm-6">
              {this.renderContactInfo()}
            </div>
            <div className="col-xs-12 col-sm-6 right-align-text">
              {this.renderNetworkSubscriptionLink()}
            </div>
            <div className="col-xs-12 no-gutters">
              <hr />
            </div>
          </div>

          <div className="row is-flex">
            <div className="legend-block col-xs-12 col-md-6">
              {this.renderNetworkLegend()}
            </div>
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
        <h2 className="as-h5">Search</h2>
        <TextInput
          ref={ref => this.store.formFieldRefList.push(ref)}
          dataObject={this.store.values}
          id={this.store.shouldDisplayLocationName ? 'locationName' : 'locationAddress'}
          type="search"
          labelText="Address. Use the arrow keys as you type to scroll through your saved favorites."
          labelTextIsSrOnly={true}
          labelErrorIsSrOnly={true}
          className="search-form"
          showClearButton={true}
          handleSubmit={this.store.searchMap.bind(this.store)}
          handleClearClick={this.onSearchClearClick}
          iconClass={this.store.shouldDisplayLocationName ? 'icon-star' : ''}
          onDropIntoList={this.onDropIntoList}
          disableAutoComplete={true}/>
        {this.renderPredictiveDropdown()}
        <div className="col-xs-6 no-gutters">
          <button
            className={`as-link add-favorite-button ${this.store.values.locationAddress && !this.store.shouldDisplayLocationName ? '' : 'disabled'}`}
            ref={(i) => {this.addFavoriteBtn = i }}
            onClick={this.store.showAddLocationForm.bind(this.store)}>
            Add Favorite
          </button>
        </div>
        <div className="col-xs-6 no-gutters text-right">
          <Link to="/manage-favorites" onClick={this.clearAlertBars}>Manage Favorites</Link>
        </div>
      </div>
    )
  }

  renderLayersArea = () => {
    return (
      <div>
        <h2>Layers</h2>
        <form className="form-group">
          <fieldset className="coverage-layers">
            <legend className="sr-only">Coverage layers</legend>
            <div className="col-xs-12 col-sm-6 no-gutters">
              <Checkbox label="Established Network"
                tooltipText="Represents our fully operational service"
                handleOnChange={this.toggleNetwork}
                checked={this.store.showNetworkLayer}
                disabled={this.props.disabled} />
              <Checkbox label="Weather"
                handleOnChange={this.toggleWeather}
                checked={this.store.showWeatherLayer}
                disabled={this.props.disabled} />
            </div>
            <div className="col-xs-12 col-sm-6 no-gutters">
              <Checkbox label="Traffic"
                handleOnChange={this.toggleTraffic}
                checked={this.store.showTrafficLayer}
                disabled={this.props.disabled} />
              <Checkbox label="Network Alerts"
                tooltipText="Highlights abnormal network malfunction"
                handleOnChange={this.toggleAlerts}
                checked={this.store.showAlertLayer}
                disabled={this.props.disabled || !this.store.authIsComplete} />
            </div>
          </fieldset>
        </form>
      </div>
    )
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
      <p className="network-contact-info">
        <span aria-hidden="true">Report Network Issue:</span>
        <a href={'tel:' + this.store.networkIssueNumber}>
          <span>
            <i className="icon-phone-number" aria-hidden='true'></i>
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
            <span className="as-label"></span>
            <span className="as-label"><i className="icon-warning construction" aria-hidden="true"/><br className="visible-xs" />Construction</span>
            <span className="as-label"><i className="icon-warning incident" aria-hidden="true"/><br className="visible-xs" />Vehicle Incident</span>
          </div>
        </div>
      </div>
    )
  }
}
