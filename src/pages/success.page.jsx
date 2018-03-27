import React from 'react';
import {Link} from 'react-router-dom';
import config from 'config';

import {history} from '../core/services/history.service';
import PageTitle from '../components/page-title/page-title';

export default class SuccessPage extends React.Component {

  componentDidMount() {
    //if there is no state (eg, the user has navigated directly to /success), redirect to home.
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
        <a className="customer-support-phone" href={'tel:' + config.attDialNumber}>
          <span className="sr-only">FirstNet Customer Service Phone&nbsp;</span>
          {config.attPhoneNumber}
        </a>.
      </span>
    )
  }

  render() {
    const {pageTitle, message, contactUs, returnToUrl, returnToButtonText} = history.location.state;

    return (
      <section className="success-page">
        <div className="container">
          <div className="col-xs-12 col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10">
            <PageTitle>{pageTitle}</PageTitle>
            <p>
              {message}
              {contactUs && this.renderContactUs()}
            </p>
            <Link to={returnToUrl} className="fn-primary">{returnToButtonText}</Link>
          </div>
        </div>
      </section>
    )
  }
}
