import React from 'react';
import {observer, inject, PropTypes} from 'mobx-react';
import config from 'config';
import NewTabLink from '../components/link/new-tab-link';

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
                    <img src="/images/logo-FirstNet-local-control.svg" alt="" aria-hidden="true" />
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
                Your session has expired due to inactivity. Please log in again.<br />If you're having trouble logging in, please contact your site administrator or call <a
                  href={'tel:' + config.attCustomerSupportPhone}>
									<span className="sr-only">Call </span>
									{config.attCustomerSupportPhone}
									<span className="sr-only"> to speak with AT&amp;T Customer Service</span>
                </a>.
              </p>
              <div className="text-center">
                <a href={config.haloLogin} className="fn-primary">Go to Login</a>
              </div>
            </div>
					</div>
				</section>
				<footer id="pse-footer">
					<div className="footer-main">
						<div className="container">
							<div className="row">
								<div className="col-xs-12 logoRow">
										<img src="/images/logo-FirstNet-local-control.svg" alt="" aria-hidden="true" />
								</div>
							</div>
							<div className="row is-flex">
								<div className="col-xs-12 col-md-3">
									<nav id="" aria-describedby="firstnet-sites">
										<h2 id="firstnet-sites">Firstnet Sites</h2>
										<ul>
											<li role="presentation">
												<NewTabLink to="http://firstnet.com/">
													FirstNet.com
												</NewTabLink>
											</li>
											<li role="presentation">
												<NewTabLink to="https://fndevpgm-uat-app.eng.mobilephone.net/firstnet">
													Developer Portal
												</NewTabLink>
											</li>
											<li role="presentation">
												<NewTabLink to="https://test-appcontrol.firstnet.att.com/">
													App Control
												</NewTabLink>
											</li>
											<li role="presentation">
												<NewTabLink to="https://test-apps.firstnet.att.com/">
													App Store
												</NewTabLink>
											</li>
										</ul>
									</nav>
								</div>
								<div className="col-xs-12 col-md-3">
									<nav className="social-nav" aria-describedby="social-links">
										<h2 id="social-links">Follow Us</h2>
										<ul className="social-links-list">
											<li role="presentation">
												<NewTabLink to="https://www.facebook.com/firstnetgov/" className="fn-social-icon fb">
													<i aria-hidden="true" className="icon-facebook" />
													<span className="title">Facebook</span>
												</NewTabLink>
											</li>
											<li role="presentation">
												<NewTabLink to="https://www.linkedin.com/company/first-responder-network-authority-firstnet-"
													className="fn-social-icon linkedin">
													<i aria-hidden="true" className="icon-linkedin" />
													<span className="title">LinkedIn</span>
												</NewTabLink>
											</li>
											<li role="presentation">
												<NewTabLink to="https://twitter.com/FirstNetGov" className="fn-social-icon twitter">
													<i aria-hidden="true" className="icon-twitter" />
													<span className="title">Twitter</span>
												</NewTabLink>
											</li>
											<li role="presentation">
												<NewTabLink to="https://firstnetgov.tumblr.com/"
													className="fn-social-icon tumblr">
													<i aria-hidden="true" className="icon-tumblr" />
													<span className="title">Tumblr</span>
												</NewTabLink>
											</li>
											<li role="presentation">
												<NewTabLink
													to="https://www.youtube.com/user/FirstNetGov"
													className="fn-social-icon youtube">
													<i aria-hidden="true" className="icon-youtube" />
													<span className="title">YouTube</span>
												</NewTabLink>
											</li>
										</ul>
									</nav>
								</div>
								<div className="col-xs-12 col-md-6">
									<nav aria-describedby="helpLinks">
										<h2 id="helpLinks" className="help-hdr">Help</h2>
										<ul className="help-link-block">
											<li role="presentation">
                        FirstNet Customer Service:
                        <br className="visible-xs-inline-block visible-md-inline-block" />
                        <a href={'tel:' + config.attCustomerSupportPhone}>
                          <i className="icon-phone-number footer-support-phone" aria-hidden="true" />
                          <span className="sr-only">Call </span>
                          {config.attCustomerSupportPhone}
                          <span className="sr-only"> to speak with AT&amp;T Customer Service</span>
                        </a>
                      </li>
										</ul>
									</nav>
								</div>
							</div>
						</div>
					</div>
					<div className="footer-sub">
						<div className="container">
							<div className="row">
								<div className="col-xs-12">
									<nav>
										<ul className="sub-links">
											<li role="presentation">
												<NewTabLink to="https://www.firstnet.gov/privacy-policy">
													Privacy Policy
												</NewTabLink>
											</li>
											<li role="presentation">
												<NewTabLink to={this.externalLinkStore.termsOfUse}>
													Terms of Use
												</NewTabLink>
											</li>
											<br className="visible-xs-inline-block" />
											<li role="presentation">
												<NewTabLink to="https://www.firstnet.gov/accessibility">
													Accessibility
												</NewTabLink>
											</li>
											<li role="presentation">
												<NewTabLink to="https://www.firstnet.gov/">
													FirstNet.gov
												</NewTabLink>
											</li>
										</ul>
									</nav>
								</div>
							</div>
						</div>
					</div>
				</footer>
			</article>
		);
	}
}
