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
    geolinkStore: PropTypes.object.isRequired,
    disabled: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.store = this.props.geolinkStore;
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
      return el && (el.refs.input.id === 'locationName' || el.refs.input.id === 'locationAddress');
    }).refs.input.focus();
  }

  onFavoriteEnter = (event, favorite) => {
    if(event.charCode === this.ENTER_KEY_CODE) {
      this.store.selectFavorite(favorite);
      this.store.formFieldRefList.find((el) => {
        return el && (el.refs.input.id === 'locationName' || el.refs.input.id === 'locationAddress');
      }).refs.input.focus();
    }
  }

  onManageFavoritesClick = () => {
    history.push('/manage-favorites');
    this.store.clearAlertBars();
  }

  onManageFavoritesEnter = (event) => {
    if(event.charCode === this.ENTER_KEY_CODE) {
      history.push('/manage-favorites');
      this.store.clearAlertBars();
    }
  }

  onDropIntoList = (event) => {
    if(event.keyCode === this.DOWN_KEY_CODE && this.store.dropdownIsVisible) {
      event.preventDefault();
      this.focusedFavorite = 0;
      this.refs[`favItem${this.focusedFavorite}`].focus();
    }
  }

  onKeyDown = (event) => {
    if(event.keyCode === this.DOWN_KEY_CODE || event.keyCode === this.UP_KEY_CODE) {
      event.preventDefault();
    }
    if(event.keyCode === this.DOWN_KEY_CODE) {
      this.focusedFavorite = this.store.predictedFavorites.length ? (this.focusedFavorite + 1) % (this.store.predictedFavorites.length + 1) : 0;
      this.refs[`favItem${this.focusedFavorite}`].focus();
    } else if(event.keyCode === this.UP_KEY_CODE) {
      if(this.focusedFavorite === 0) {
        this.store.formFieldRefList.find((el) => {
          return el.refs.input.id === 'locationName' || el.refs.input.id === 'locationAddress';
        }).refs.input.focus();
      } else {
        this.focusedFavorite = this.store.predictedFavorites.length ? (this.focusedFavorite + this.store.predictedFavorites.length) % (this.store.predictedFavorites.length + 1) : 0;
        this.refs[`favItem${this.focusedFavorite}`].focus();
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
      <section className="geolink-controls light-grey-bg">
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
                    <Checkbox label="Network"
                      tooltipText="Represents our fully operational service"
                      handleOnChange={this.toggleNetwork}
                      checked={this.store.showNetworkLayer}
                      disabled={this.props.disabled} />
                    <Checkbox label="Weather"
                      handleOnChange={this.toggleWeather}
                      checked={this.store.showWeatherLayer}
                      disabled={this.props.disabled} />
                  </div>
                  <div className="col-xs-6 no-gutters">
                    <Checkbox label="Traffic"
                      handleOnChange={this.toggleTraffic}
                      checked={this.store.showTrafficLayer}
                      disabled={this.props.disabled} />
                    <Checkbox label="Alerts"
                      tooltipText="Highlights abnormal network malfunction"
                      handleOnChange={this.toggleAlerts}
                      checked={this.store.showAlertLayer}
                      disabled={this.props.disabled || !this.store.authIsComplete} />
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
          <button className="as-link" onClick={this.onManageFavoritesClick}>Manage Favorites</button>
        </span>
        <h2 className="as-h5">Search</h2>
        <TextInput
          ref={ref => this.store.formFieldRefList.push(ref)}
          dataObject={this.store.values}
          id={this.store.shouldDisplayLocationName ? 'locationName' : 'locationAddress'}
          type="search"
          labelText="Address. Use the arrow keys as you type to scroll through your saved favorites."
          labelIsSrOnly={true}
          className="search-form"
          showClearButton={true}
          handleSubmit={this.store.searchMap.bind(this.store)}
          iconClass={this.store.shouldDisplayLocationName ? 'icon-star' : ''}
          onDropIntoList={this.onDropIntoList}
          disableAutoComplete={true}/>
        {this.renderPredictiveDropdown()}
        <button
          className={`as-link add-favorite-button ${this.store.values.locationAddress && !this.store.shouldDisplayLocationName ? '' : 'disabled'}`}
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
