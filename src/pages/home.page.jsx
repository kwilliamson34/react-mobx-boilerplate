import React from 'react';

import TitlePane from '../components/title-pane/title-pane';

export default class HomePage extends React.Component {

  render() {
    return (
      <article id="home-page">
        <TitlePane pageTitle="PSE Home Page"/>
        <section className="placeholder alert-dropdown">
          Alert Dropdown Component
        </section>
        <section className="placeholder geolink">
          <h2>Geolink Map Section</h2>
        </section>
        <section className="placeholder news-feed">
          <h2>News feed</h2>
        </section>
      </article>
    )
  }
}
