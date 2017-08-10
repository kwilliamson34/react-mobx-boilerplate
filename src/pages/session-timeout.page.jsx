import React from 'react';
import {observer, inject, PropTypes} from 'mobx-react';
import config from 'config';
import Footer from '../components/footer/footer.jsx';

@inject('store')
@observer
export default class SessionTimeoutPage extends React.Component {

  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props)
    this.externalLinkStore = this.props.store.externalLinkStore;
  }

  render() {
    return (
      <article id="session-timeout">
        <header className="fnnav pse" role="banner">
          <div className="fnnav__mainbar">
            <div className="container">
              <div className="fnnav__header">
                <div className="fnnav__brand">
                  <div className="logo-container">
                    <img src="/images/logo-FirstNet-local-control.svg" alt="" aria-hidden="true"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <section className="session-timeout">
          <div className="container">
            <div className="col-xs-12 col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10 ">
              <h1 className="as-h2">Your session has timed out.</h1>
              <p>
                Your session has expired. Please log in again.<br />If you're having trouble logging in, please contact your site administrator or call&nbsp;
                <a href={'tel:' + config.attCustomerSupportPhone}>
                  <span className="sr-only">Call&nbsp;</span>
                  {config.attCustomerSupportPhone}
                  <span className="sr-only">&nbsp;to speak with FirstNet Customer Service</span>
                </a>.
              </p>
              <div className="text-center">
                <a href={config.haloLogin} className="fn-primary">Go to Login</a>
              </div>
            </div>
          </div>
        </section>
        <Footer showInternalLinks={false} />
      </article>
    );
  }
}
