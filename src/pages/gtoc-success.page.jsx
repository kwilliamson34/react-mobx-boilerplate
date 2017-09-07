import React from 'react';
import {Link} from 'react-router-dom';
import config from 'config'

export default class SubscribeToGTOCSuccess extends React.Component {
  render() {
    return (
      <section className="success-page">
        <div className="container">
          <div className="col-xs-12 col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10">
            <h1>We've received your request.</h1>
            <p>
              Processing your subscription can take up to 14 days, after which you will start receiving alert notifications. If you have any questions, please contact<br className="visible-lg-block"/> FirstNet Customer Service at&nbsp;
              <a href={'tel:' + config.attCustomerSupportPhone}>
								<span className="sr-only">FirstNet Customer Service Phone&nbsp;</span>
								{config.attCustomerSupportPhone}
							</a>.
            </p>
            <Link to="/network-status" className="fn-primary">Network Status</Link>
          </div>
        </div>
      </section>
    )
  }
}
