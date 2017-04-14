import React from 'react';
import {Link} from 'react-router-dom';

import TitlePane from '../components/title-pane';

export default class AppDetailsView extends React.Component {
    render() {
        return (
          <main className="content-main">
            <TitlePane />
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
