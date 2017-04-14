import React from 'react';
import {Link} from 'react-router-dom';

import TitlePane from '../components/title-pane';

export default class HomeView extends React.Component {

    render() {
        return (
          <main className="content-main">
            <TitlePane  pageTitle="PSE Homepage" />
            <div className="view-home">

                <section className="placeholder alert-dropdown">
                    Alert Dropdown
                </section>
                <section className="placeholder geolink">
                    <h2>Geolink Map Section</h2>
                </section>
                <section className="placeholder news-feed">
                    <h2>News feed</h2>
                </section>
                <section className="placeholder mp-links">
                    <h2>Marketing Portal Links</h2>
                </section>
            </div>
          </main>
        )
    }

}
