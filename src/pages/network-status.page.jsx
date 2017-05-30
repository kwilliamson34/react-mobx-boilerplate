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
        {this.props.store.geolinkStore.isGeolinkReady &&
					<GeolinkMap geolinkStore={this.props.store.geolinkStore}/>}
        {/*The following iframe is required to kick of the loading
          of geolink scripts. */}
        <iframe
          id="geolink_static_assets"
          src={config.geolinkScripts + '/libs/jquery/jquery.min.js'}
          style={{width: 0, height: 0, border: 'none'}}>
        </iframe>
      </article>
		)
	}
}
