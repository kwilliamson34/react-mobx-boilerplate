import React from 'react';

import TitlePane from '../components/title-pane';
import PlansAndDevices from '../components/plans-and-devices';

export default class HomeView extends React.Component {

    render() {
        return (
            <main className="content-main">
                <TitlePane pageTitle="PSE Homepage"/>
                <section className="placeholder alert-dropdown">
                    Alert Dropdown
                </section>
                <section className="placeholder geolink">
                    <h2>Geolink Map Section</h2>
                </section>
                <section className="placeholder news-feed">
                    <h2>News feed</h2>
                </section>
                <PlansAndDevices />
            </main>
        )
    }

}
