import React from 'react';
import {Link} from 'react-router-dom';

export default class SubscribeToGTOCSuccess extends React.Component {
  render() {
    return (
      <section className="success-page">
        <div className="container">
          <div className="col-xs-12 col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10">
            <h1>Thank you for your subscription!</h1>
            <p>Yabba Daddy Doobie</p>
            <Link to="/" className="fn-primary">Return to Home Page</Link>
          </div>
        </div>
      </section>
    )
  }
}
