import React from 'react';

import TitlePane from '../components/title-pane/title-pane';
import PlansAndDevices from '../components/plans-and-devices/plans-and-devices';

import {Link} from 'react-router-dom';


export default class AdminDashboardPage extends React.Component {
  render() {
    return (
      <article id="admin-dashboard-page">
        <TitlePane pageTitle="Admin Dashboard" />
        <section className="placeholder-long">
          <div className="container">
            <h2>Admin Dashboard</h2>
            <Link to="/manage-apps">Manage Apps</Link>
          </div>
        </section>
        <PlansAndDevices />
      </article>
    )
  }
}
