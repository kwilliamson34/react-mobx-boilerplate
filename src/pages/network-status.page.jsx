import React from 'react';
import PropTypes from 'prop-types';
import { inject,	observer } from 'mobx-react';
import config from 'config';
import GeolinkMap from '../components/geolink-map/geolink-map';

@inject('store')
@observer
export default class NetworkStatusPage extends React.Component {

	static propTypes = {
		store: PropTypes.object.isRequired
	}

	componentDidMount() {
		//wait for geolink to fully load
		setTimeout(() => {
			this.props.store.geolinkStore.isGeolinkReady = true;
		}, 5000);
	}

	render() {
		return (
			<article id="network-page" className="content-wrapper">
				<h1 className="sr-only">Network Status</h1>
				<iframe
					id="geolink_static_assets"
					src={config.geolinkScripts + '/libs/jquery/jquery.min.js'}
					style={{width: 0, height: 0, padding: 0, margin: 0, border: '0 none',position: 'absolute',top:'0',left:0}}>
				</iframe>
				{this.props.store.geolinkStore.isGeolinkReady
					? <GeolinkMap geolinkStore={this.props.store.geolinkStore}/>
					: <div className="map-placeholder">
							<p className="as-h2" aria-live="polite">
								<i className="as-h2 icon-reload" aria-hidden="true"></i>
								Loading map&hellip;
							</p>
						</div>
				}
			</article>
		)
	}
}
