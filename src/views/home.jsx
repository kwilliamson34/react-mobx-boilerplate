import React from 'react';
import {Link} from 'react-router-dom';

export default class Home extends React.Component {

    render() {
        return (
            <div className="view-home">
                <Link to="/admin-dashboard" role="button" className="btn-dashboard">Administrator Dashboard</Link>
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
        )
    }
}
