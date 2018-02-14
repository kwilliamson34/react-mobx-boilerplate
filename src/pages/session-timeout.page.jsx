import React from 'react';
import config from 'config';
import Footer from '../components/footer/footer.jsx';
import PageTitle from '../components/page-title/page-title';

export default class SessionTimeoutPage extends React.Component {
  render() {
    return (
      <article id="session-timeout">
        <header className="fnnav pse" role="banner">
          <div className="fnnav__mainbar">
            <div className="container">
              <div className="fnnav__header">
                <div className="fnnav__brand">
                  <div className="logo-container">
                    <img src="/images/logo-FirstNet-local-control.svg" alt="FirstNet Local Control logo" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <section className="session-timeout">
          <div className="container">
            <div className="col-xs-12 col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10 ">
              <PageTitle
                plainTextTitle="Your session has timed out."
                className="as-h2">
                Your session has timed out. <br className="hidden-xs" /><span>Please log in again.</span>
              </PageTitle>
              <div className="text-center">
                <a href={config.haloLogin} className="fn-primary">Go to Login</a>
              </div>
            </div>
          </div>
        </section>
        <Footer showPrivateLinks={false} />
      </article>
    );
  }
}
