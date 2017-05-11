import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';

import TitlePane from '../components/title-pane/title-pane';
import PlansAndDevices from '../components/plans-and-devices/plans-and-devices';
import GeolinkMap from '../components/geolink-map/geolink-map';

@inject('store')
@observer
export default class HomePage extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  render() {
    return (
      <article id="home-page">
        <TitlePane pageTitle="PSE Home Page"/>
        <section className="placeholder alert-dropdown">
          Alert Dropdown Component
        </section>
        <GeolinkMap geolinkStore={this.props.store.geolinkStore}/>
        <section className="placeholder news-feed">
          <h2>News feed</h2>
        </section>
        <PlansAndDevices />
      </article>
    )
  }
}
