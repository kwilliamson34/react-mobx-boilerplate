import React from 'react';
import {Link} from 'react-router-dom';

export default class FeedbackSuccessPage extends React.Component {
  render() {
    return (
      <section className="success-page">
        <div className="container">
          <div className="col-xs-12 col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10">
            <h1>Thanks for your feedback!</h1>
            <p>We appreciate you taking the time to provide your thoughts about this site. Your comments will help us to improve our tools going forward.</p>
            <Link to="/" className="fn-primary">Return to Home Page</Link>
          </div>
        </div>
      </section>
    )
  }
}
