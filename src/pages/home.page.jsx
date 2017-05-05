import React from 'react';

import TitlePane from '../components/title-pane/title-pane';
import PlansAndDevices from '../components/plans-and-devices/plans-and-devices';
import GeolinkMap from '../components/geolink-map/geolink-map';

export default class HomePage extends React.Component {

  render() {
    return (
      <article id="home-page">
        <TitlePane pageTitle="PSE Home Page"/>
        <section className="placeholder alert-dropdown">
          Alert Dropdown Component
        </section>
        <GeolinkMap/>
        <section className="placeholder news-feed">
          <h2>News feed</h2>
        </section>
        <PlansAndDevices />
      </article>
    )
  }
}
