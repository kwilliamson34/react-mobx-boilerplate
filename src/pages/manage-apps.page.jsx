import React from 'react';

import TitlePane from '../components/title-pane/title-pane';

export default class ManageAppsPage extends React.Component {
    render() {
        return (
          <main className="content-main">
            <TitlePane pageTitle="Manage Apps" />
            <section className="placeholder-long">
                <div className="container">
                    <h2>Manage Apps</h2>
                    <p>Filters Here</p>
                    <div>List of app summaries for us to all take a look at:</div>
                </div>
            </section>
          </main>
        )
    }
}
