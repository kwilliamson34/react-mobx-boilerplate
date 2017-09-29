import React from 'react';
import {Link} from 'react-router-dom';
import PageTitle from '../components/page-title/page-title';

export default class FeedbackSuccessPage extends React.Component {
  render() {
    return (
      <section className="success-page">
        <div className="container">
          <div className="col-xs-12 col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10">
            <PageTitle>Thanks for your feedback!</PageTitle>
            <p>We appreciate you taking the time to provide your thoughts about this site. Your comments will help us to improve our tools going forward.</p>
            <Link to="/" className="fn-primary">Return to Home Page</Link>
          </div>
        </div>
      </section>
    )
  }
}
