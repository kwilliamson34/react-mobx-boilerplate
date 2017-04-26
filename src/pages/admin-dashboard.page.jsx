import React from 'react';

import TitlePane from '../components/title-pane/title-pane';

export default class AdminDashboardPage extends React.Component {
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
