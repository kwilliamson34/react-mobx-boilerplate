import React from 'react';
import Checkbox from '../toggle/checkbox';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

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
				<div className="container-fluid">
					<form className="form-group search-input">
						<div className="row is-flex">
							<div className="col-xs-12 col-sm-4">
								<h2 className="as-h5">Search</h2>
								<fieldset>
									<label htmlFor="geo-search" className="control-label">
										Location
									</label>
									<span className="input-group">
										<input
											id="geo-search"
											type="text"
											className="form-control"
											onChange={this.handleSearchInput}
											onKeyPress={this.handleSearchKeyPress}
										/>
										<span className="input-group-btn">
											<button
												type="button"
												className="btn btn-default"
												onClick={this.handleSearchSubmit}>
												<span className="sr-only">Search for locations</span>
												<i
													aria-hidden="true"
													className="icon-search"
													alt="search icon"
												/>
											</button>
										</span>
									</span>
								</fieldset>
							</div>
							<div className="col-xs-12 col-sm-4">
								<h2 className="as-h5">Layers</h2>
								<fieldset>
									<legend className="sr-only">Coverage layers</legend>
									<Checkbox
										id="network-toggle"
										value="Network"
										label="Network"
										onChange={this.toggleNetwork}
										checked={this.geoStore.showNetworkLayer}
									/>
									<Checkbox
										id="traffic-toggle"
										value="Traffic"
										label="Traffic"
										onChange={this.toggleTraffic}
										checked={this.geoStore.showTrafficLayer}
									/>
									<Checkbox
										id="weather-toggle"
										value="Weather"
										label="Weather"
										onChange={this.toggleWeather}
										checked={this.geoStore.showWeatherLayer}
									/>
									<Checkbox
										id="alerts-toggle"
										value="Alerts"
										label="Alerts"
										onChange={this.toggleAlerts}
										checked={this.geoStore.showAlertLayer}
									/>
								</fieldset>
							</div>
							<div className="col-xs-12 col-sm-4">
								<h2 className="as-h5">Report coverage issue</h2>
								<div className="emergency-numbers">
									<p className="emergency">
										Emergency:<br />
										<a href="tel:1-800-XXX-XXXX">1-800-GET-HELP</a>
									</p>
									<p className="non-emergency">
										Non-emergency:<br />
										<a href="tel:1-800-XXX-XXXX">1-800-XXX-XXXX</a>
									</p>
								</div>
							</div>
						</div>
					</form>
					<div className="row">
						<div className="col-xs-12">
							<hr />
						</div>
					</div>
					<div className="row is-flex">
						<div className="col-xs-12 col-sm-4">
							<h2 className="as-h5">FirstNet Coverage</h2>
							<div className="key-labels">
								<span>4G LTE</span>
								<span>4G</span>
								<span>3G</span>
								<span>2G</span>
							</div>
							<div className="coverage-legend">
								<img src="/images/spectrum-gradient.svg" alt="" />
							</div>
						</div>
						<div className="col-xs-12 col-sm-4">
							<h2 className="as-h5">Weather</h2>
							<div className="key-labels">
								<span>Light Rain</span>
								<span>Heavy Rain</span>
								<span>Snow</span>
								<span>Ice</span>
							</div>
							<div className="weather-legend">
								<img src="/images/precip-gradient.svg" alt="" />
							</div>
						</div>
						<div className="col-xs-12 col-sm-4">
							<h2 className="as-h5">Traffic</h2>
							<div className="key-labels traffic">
								<span>Fast</span>
								<span>Slow</span>
							</div>
							<div className="traffic-legend">
								<div />
								<div />
								<div />
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
