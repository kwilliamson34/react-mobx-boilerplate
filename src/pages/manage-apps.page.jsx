import React from 'react';

import TitlePane from '../components/title-pane';

export default class ManageAppsView extends React.Component {
    render() {
        return (
          <main className="content-main">
            <TitlePane pageTitle="Manage Apps" />
            <section className="placeholder-long">
                <div className="container">
                    <h2>Manage Apps</h2>
                    <p>Filters Here</p>
                    <div>List of apps</div>
                </div>
            </section>
          </main>
        )
    }
}
