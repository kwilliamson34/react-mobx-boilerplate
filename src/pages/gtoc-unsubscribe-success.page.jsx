import React from 'react';
import {Link} from 'react-router-dom';
import config from 'config'

import PageTitle from '../components/page-title/page-title';

export default class UnsubscribeToGTOCSuccess extends React.Component {

  render() {
    return (
      <section className="success-page">
        <div className="container">
          <div className="col-xs-12 col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10">
            <PageTitle>We&apos;ve received your request.</PageTitle>
            <p>
              Cancelling your subscription can take up to 24 hours, after which you will stop receiving alert notifications. If you have any questions, please contact<br className="visible-lg-block"/> FirstNet Customer Service at&nbsp;
              <a href={'tel:' + config.attCustomerSupportPhone}>
								<span className="sr-only">FirstNet Customer Service Phone&nbsp;</span>
								{config.attCustomerSupportPhone}
							</a>.
            </p>
            <Link to="/network" className="fn-primary">Network</Link>
          </div>
        </div>
      </section>
    )
  }
}
