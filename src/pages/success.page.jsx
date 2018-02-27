import React from 'react';
import {Link} from 'react-router-dom';
import config from 'config';

import {history} from '../core/services/history.service';
import PageTitle from '../components/page-title/page-title';

export default class SuccessPage extends React.Component {

  componentDidMount() {
    if (!history.location.state) {
      history.push('/');
    }
  }

  componentWillUnmount() {
    history.location.state = {};
  }

  renderContactUs = () => {
    return (
      <span>
        &nbsp;If you have any questions, please contact<br className="visible-lg-block"/> FirstNet Customer Service at&nbsp;
        <a className="customer-support-phone" href={'tel:' + config.attCustomerSupportPhone}>
          <span className="sr-only">FirstNet Customer Service Phone&nbsp;</span>
          {config.attCustomerSupportPhone}
        </a>.
      </span>
    )
  }

  render() {
    return (
      <section className="success-page">
        <div className="container">
          {history.location.state &&
            <div className="col-xs-12 col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10">
              <PageTitle>{history.location.state.pageTitle}</PageTitle>
              <p>
                {history.location.state.message}
                {history.location.state.contactUs && this.renderContactUs()}
              </p>
              <Link to={history.location.state.returnToUrl} className="fn-primary">{history.location.state.returnToButtonText}</Link>
            </div>
          }
        </div>
      </section>
    )
  }
}
