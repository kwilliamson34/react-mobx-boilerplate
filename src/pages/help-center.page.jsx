import React from 'react';

import TitlePane from '../components/title-pane/title-pane';

export default class HelpCenterPage extends React.Component {
    render() {
        return (
          <article id="help-center-page">
            <TitlePane pageTitle="Help Center" />
            <section className="placeholder-long">
                <div className="container">
                    <h2>Help Center</h2>
                </div>
            </section>
          </article>
        )
    }
}
