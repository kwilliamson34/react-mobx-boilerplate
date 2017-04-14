import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';

import TitlePane from '../components/title-pane';

export default class AdminDashboardView extends React.Component {
    render() {
        return (
          <main className="content-main">
            <TitlePane pageTitle="Admin Dashboard" />
            <section className="placeholder-long">
                <div className="container">
                    <h2>Admin Dashboard</h2>
                    <p>content here</p>
                </div>
            </section>
          </main>
        )
    }
}
