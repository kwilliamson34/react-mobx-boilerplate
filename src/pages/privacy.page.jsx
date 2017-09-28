import React from 'react';
import PageTitle from '../components/page-title/page-title';

export default class PrivacyPage extends React.Component {
  render() {
    return (
      <article id="help-center-page">
        <section className="content-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-xs-12"><PageTitle>Privacy Policy</PageTitle></div>
          </div>
          <div className="row">
            <div className="col-xs-12"><p>Content Here</p></div>
          </div>
        </div>
        </section>
      </article>
    )
  }
}
