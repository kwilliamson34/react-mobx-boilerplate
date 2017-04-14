import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import ManageAppsView from './manage-apps';

export default class AdminDashboardView extends React.Component {
    render() {
        return (
          <div>
            <section className="placeholder-long">
                <div className="container">
                    <h2>Admin Dashboard</h2>
                    <p>content here</p>
                </div>
            </section>
          </div>
        )
    }
}
