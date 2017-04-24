import React from 'react';

import TitlePane from '../components/title-pane';

export default class AppDetailsView extends React.Component {
    render() {
        return (
          <main className="content-main">
            <TitlePane pageTitle="App Details"/>
            <section className="placeholder-long">
                <div className="container">
                    <h2>App Details</h2>
                    <p>test</p>
                </div>
            </section>
          </main>
        )
    }
}
