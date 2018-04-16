import React from 'react';
import {Link} from 'react-router-dom';

export default class ErrorPage extends React.Component {
  render() {
    return (
      <section className="error-page">
        <div className="container">
          <div className="col-xs-12 col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10">
            <h1>Oops!</h1>
            <p>
              There was an unexpected problem completing your request. Please try again later.
            </p>
            <Link to='' className="brand-primary">Go Home</Link>
          </div>
        </div>
      </section>
    )
  }
}
