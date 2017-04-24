import React from 'react';

import TitlePane from '../components/title-pane';

export default class HelpCenterPage extends React.Component {
    render() {
        return (
          <main className="content-main">
            <TitlePane pageTitle="Help Center" />
            <section className="placeholder-long">
                <div className="container">
                    <h2>Help Center</h2>
                </div>
            </section>
          </main>
        )
    }
}
