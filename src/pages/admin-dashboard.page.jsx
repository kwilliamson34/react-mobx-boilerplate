import React from 'react';

import TitlePane from '../components/title-pane';
import AppAvailability from '../components/app-availability/app-availability';

export default class AdminDashboardView extends React.Component {
    render() {
        return (
          <main className="content-main">
            <TitlePane pageTitle="Admin Dashboard" />
            <section className="placeholder-long">
                <div className="container">
                    <h2>Admin Dashboard</h2>
                    <p>content here</p>
                    <div className="col-sm-12 col-md-6">
                        <h3>Manage App</h3>
                        <AppAvailability />
                    </div>
                </div>
            </section>
          </main>
        )
    }
}