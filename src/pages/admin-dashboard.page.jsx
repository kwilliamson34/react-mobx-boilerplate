import React from 'react';

import TitlePane from '../components/title-pane/title-pane';
import AppAvailability from '../components/app-availability/app-availability';
import PlansAndDevices from '../components/plans-and-devices/plans-and-devices';


export default class AdminDashboardPage extends React.Component {
    render() {
        return (
          <main id="content-main">
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
            <PlansAndDevices />
          </main>
        )
    }
}
