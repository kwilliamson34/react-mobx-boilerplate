import React from 'react';
import {Link} from 'react-router-dom';

export default class SuccessPage extends React.Component {
  render() {
    return (
      <section className="success-page">
        <div className="container">
          <div className="col-xs-12 col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10">
            <h1>Sucess!</h1>
            <p>
              Your action was successful.
            </p>
            <Link to='' className="brand-primary">Go Home</Link>
          </div>
        </div>
      </section>
    )
  }
}
