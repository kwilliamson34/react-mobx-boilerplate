import React from 'react';
import { observer, inject, PropTypes } from 'mobx-react';
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
                    <img src="/images/logo-FirstNet-local-control.svg" alt="" />
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
                  {config.attCustomerSupportPhone}
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
										<img src="/images/logo-FirstNet-local-control.svg" alt=""/>
								</div>
							</div>
							<div className="row is-flex">
								<div className="col-xs-12 col-md-3">
									<nav id="" aria-describedby="firstnet-sites">
										<h2 id="firstnet-sites">Firstnet Sites</h2>
										<ul>
											<li role="presentation">
												<a
													href="http://firstnet.com/"
													target="_blank"
													rel="noopener noreferrer">
													FirstNet.com
												</a>
											</li>
											<li role="presentation">
												<a
													href="https://fndevpgm-uat-app.eng.mobilephone.net/firstnet"
													target="_blank"
													rel="noopener noreferrer">
													Developer Portal
												</a>
											</li>
											<li role="presentation">
												<a
													href="https://test-appcontrol.firstnet.att.com/"
													target="_blank"
													rel="noopener noreferrer">
													App Control
												</a>
											</li>
											<li role="presentation">
												<a
													href="https://test-apps.firstnet.att.com/"
													target="_blank"
													rel="noopener noreferrer">
													App Store
												</a>
											</li>
										</ul>
									</nav>
								</div>
								<div className="col-xs-12 col-md-3">
									<nav className="social-nav" aria-describedby="social-links">
										<h2 id="social-links">Follow Us</h2>
										<ul className="social-links-list">
											<li role="presentation">
												<a
													href="https://www.facebook.com/firstnetgov/"
													className="fn-social-icon fb"
													target="_blank"
													rel="noopener noreferrer">
													<i aria-hidden="true" className="icon-facebook" />
													<span className="title">Facebook</span>
												</a>
											</li>
											<li role="presentation">
												<a
													href="https://www.linkedin.com/company/first-responder-network-authority-firstnet-"
													className="fn-social-icon linkedin"
													target="_blank"
													rel="noopener noreferrer">
													<i aria-hidden="true" className="icon-linkedin" />
													<span className="title">LinkedIn</span>
												</a>
											</li>
											<li role="presentation">
												<a
													href="https://twitter.com/FirstNetGov"
													className="fn-social-icon twitter"
													target="_blank"
													rel="noopener noreferrer">
													<i aria-hidden="true" className="icon-twitter" />
													<span className="title">Twitter</span>
												</a>
											</li>
											<li role="presentation">
												<a
													href="https://firstnetgov.tumblr.com/"
													className="fn-social-icon tumblr"
													target="_blank"
													rel="noopener noreferrer">
													<i aria-hidden="true" className="icon-tumblr" />
													<span className="title">Tumblr</span>
												</a>
											</li>
											<li role="presentation">
												<a
													href="https://www.youtube.com/user/FirstNetGov"
													className="fn-social-icon youtube"
													target="_blank"
													rel="noopener noreferrer">
													<i aria-hidden="true" className="icon-youtube" />
													<span className="title">YouTube</span>
												</a>
											</li>
										</ul>
									</nav>
								</div>
								<div className="col-xs-12 col-md-6">
									<nav aria-describedby="helpLinks">
										<h2 id="helpLinks" className="help-hdr">Help</h2>
										<ul className="help-link-block">
											<li role="presentation">
												FirstNet Customer Service:<br className="visible-xs-inline-block visible-md-inline-block" />&nbsp;<a
													href={'tel:' + config.attCustomerSupportPhone}>
													<i className="icon-phone-number footer-support-phone" />
													{config.attCustomerSupportPhone}
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
												<a
													href="https://www.firstnet.gov/"
													target="_blank"
													rel="noopener noreferrer">
													FirstNet.gov
												</a>
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
