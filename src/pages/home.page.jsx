import React from 'react';
import PropTypes from 'prop-types';
import {
	inject,
	observer
} from 'mobx-react';

import TitlePane from '../components/title-pane/title-pane';
import GeolinkMap from '../components/geolink-map/geolink-map';

@inject('store')
@observer
export default class HomePage extends React.Component {
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
			<article id="home-page">
        <TitlePane pageTitle="PSE Home Page"/>
        <section className="placeholder alert-dropdown">
          Alert Dropdown Component
        </section>
        {this.props.store.geolinkStore.isGeolinkReady && <GeolinkMap geolinkStore={this.props.store.geolinkStore}/>}
        <section className="placeholder news-feed">
          <h2>News feed</h2>
        </section>
        {/*The following iframe is required to kick of the loading
          of geolink scripts. */}
        <iframe
          id="geolink_static_assets"
          src="https://geo.stage.att.com/appboard/libs/jquery/jquery.min.js"
          style={{width: 0, height: 0, border: 'none'}}>
        </iframe>
      </article>
		)
	}
}
