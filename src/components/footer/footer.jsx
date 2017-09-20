import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {observer,inject} from 'mobx-react';
import config from 'config';

import NewTabLink from '../link/new-tab-link';

@inject('store')
@observer
export default class Footer extends React.Component {

	static propTypes = {
		store: PropTypes.object,
		showPrivateLinks: PropTypes.bool
	}

	static defaultProps = {
    showPrivateLinks: true
  }

	constructor(props) {
		super(props);
		this.headerStore = this.props.store.headerStore;
		this.externalLinkStore = this.props.store.externalLinkStore;
		this.user = this.props.store.userStore;
		this.handleSitemapClick = this.handleSitemapClick.bind(this);
		this.joyrideStore = this.props.store.joyrideStore;
	}

	handleSitemapClick(e){
		e.preventDefault();
		this.headerStore.toggleFooterSitemap();
	}

	onToggleWalkthrough = () => {
		this.joyrideStore.toggleTour();
	}

	renderSitemapColumn() {
		let sitemapCollapseBreakpoint = 992;
		let allowFocusOnSitemapHeader = this.headerStore.viewportWidth < sitemapCollapseBreakpoint;
		if(this.props.showPrivateLinks){
			return(
				<div className="col-xs-12 col-md-3">
					<nav aria-describedby="sitemap">
						<a id="sitemap" href=""
							onClick={this.handleSitemapClick}
							tabIndex={allowFocusOnSitemapHeader ? 0 : -1}
							className="sitemap-hdr"
							role="button"
							aria-haspopup="true"
							aria-expanded={this.headerStore.footerSitemapExpanded}>Sitemap</a>
						<ul className="sitemap-links">
							{this.user.isAdmin &&
							<div>
								<li role="presentation">
									<Link to="/admin">PSE Administration</Link>
								</li>
								<li role="presentation">
									<Link to="/admin/manage-apps">Manage Apps</Link>
								</li>
								<li role="presentation">
									<Link to="/admin/devices">Specialized Devices</Link>
								</li>
								<li role="presentation">
									<Link to="/admin/solutions">Public Safety Solutions </Link>
								</li>
							</div>
							}
							<li role="presentation">
								<Link to="/network-status">Network Status</Link>
							</li>
						</ul>
					</nav>
				</div>
			);
		}
	}

	renderFirstNetColumn() {
		return (
			<div className={`col-xs-12 ${this.props.showPrivateLinks ? 'col-md-3' : 'col-md-4'}`}>
				<nav aria-describedby="firstnet-sites">
					<h2 id="firstnet-sites">Firstnet Sites</h2>
					<ul >
						<li role="presentation">
							<NewTabLink to={config.firstnetCom}>FirstNet.com</NewTabLink>
						</li>
						<li role="presentation">
							<NewTabLink to={config.devPortal}>Developer Portal</NewTabLink>
						</li>
						<li role="presentation">
							<NewTabLink to={config.appControl}>App Control</NewTabLink>
						</li>
						<li role="presentation">
							<NewTabLink to={config.appStore}>App Store</NewTabLink>
						</li>
					</ul>
				</nav>
			</div>
		);
	}

	renderSocialLinkColumn() {
		return (
			<div className={`col-xs-12 ${this.props.showPrivateLinks ? 'col-md-3' : 'col-md-4'}`}>
				<nav className="social-nav" aria-describedby="social-links">
					<h2 id="social-links">Follow Us</h2>
					<ul className="social-links-list">
						<li role="presentation">
							<NewTabLink to={this.externalLinkStore.firstnetFacebook} className="fn-social-icon fb">
								<i aria-hidden="true" className="icon-facebook"></i>
								<span className="title">Facebook</span>
							</NewTabLink>
						</li>
						<li role="presentation">
							<NewTabLink to={this.externalLinkStore.firstnetLinkedIn} className="fn-social-icon linkedin">
								<i aria-hidden="true" className="icon-linkedin"></i>
								<span className="title">LinkedIn</span>
							</NewTabLink>
						</li>
						<li role="presentation">
							<NewTabLink to={this.externalLinkStore.firstnetTwitter} className="fn-social-icon twitter">
								<i aria-hidden="true" className="icon-twitter"></i>
								<span className="title">Twitter</span>
							</NewTabLink>
						</li>
						<li role="presentation">
							<NewTabLink to={this.externalLinkStore.firstnetTumblr} className="fn-social-icon tumblr">
								<i aria-hidden="true" className="icon-tumblr"></i>
								<span className="title">Tumblr</span>
							</NewTabLink>
						</li>
						<li role="presentation">
							<NewTabLink to={this.externalLinkStore.firstnetYoutube} className="fn-social-icon youtube">
								<i aria-hidden="true" className="icon-youtube"></i>
								<span className="title">YouTube</span>
							</NewTabLink>
						</li>
					</ul>
				</nav>
			</div>
		);
	}

	renderHelpColumn() {
		return (
			<div className={`col-xs-12 ${this.props.showPrivateLinks ? 'col-md-3' : 'col-md-4'}`}>
				<nav aria-describedby="helpLinks">
					<h2 id="helpLinks" className="help-hdr">Help</h2>
					<ul className="help-link-block">
						{this.props.showPrivateLinks &&
							<li role="presentation">
								<Link to="/faq">FAQ</Link>
							</li>
						}
						{this.props.showPrivateLinks &&
							<li>
								<a href="#" role="button" className="walkthru-toggle" onClick={this.onToggleWalkthrough}>{`${this.joyrideStore.showTour? 'Disable' : 'Enable'}`} Site Walkthrough
								</a>
							</li>
						}
						{this.props.showPrivateLinks &&
							<li role="presentation">
								<NewTabLink to={this.externalLinkStore.firstnetTraining}>
									Training
								</NewTabLink>
							</li>
						}
						{this.props.showPrivateLinks &&
							<li role="presentation">
								<Link to="/feedback">Give Us Feedback</Link>
							</li>
						}
						{this.props.showInternalLinks &&
							<li role="presentation">
								<a href="#" role="button" className="walkthru-toggle" onClick={this.onToggleTour}>
									{`${this.joyrideStore.showTour? 'Disable' : 'Enable'}`} Site Walkthrough
								</a>
							</li>
						}
						<li role="presentation">
							<span aria-hidden>FirstNet Customer Svc:</span><br className={`visible-xs-inline-block visible-md-inline-block ${this.props.showPrivateLinks ? '' : 'visible-lg-inline-block'}`} />
							<a href={'tel:' + config.attCustomerSupportPhone}>
								<i className="icon-phone-number footer-support-phone" aria-hidden='true'></i>
								<span className="sr-only">FirstNet Customer Service Phone&nbsp;</span>
								{config.attCustomerSupportPhone}
							</a>
						</li>
					</ul>
				</nav>
			</div>
		);
	}

	renderBottomNav() {
		return (
			<nav>
				<ul className="sub-links">
					<li role="presentation">
						<NewTabLink to={this.externalLinkStore.privacyPolicyLink}>Privacy Policy</NewTabLink>
					</li>
					<li role="presentation">
						<NewTabLink to={this.externalLinkStore.termsOfUse}>
							Terms of Use
						</NewTabLink>
					</li>
					<li className="xs-line-break"></li>
					<li role="presentation">
						<NewTabLink to={this.externalLinkStore.accessibilityLink}>
							Accessibility
						</NewTabLink>
					</li>
					<li role="presentation">
						<NewTabLink to={config.firstnetGov}>
							FirstNet.gov
						</NewTabLink>
					</li>
				</ul>
			</nav>
		);
	}

	render() {
		return (
			<footer id="pse-footer">
				<div className="footer-main">
					<div className="container">
						<div className="row">
							<div className="col-xs-12 logoRow">
								{this.props.showPrivateLinks
									? <Link to="/" className="logo-home-link-footer">
											<img src="/images/logo-FirstNet-local-control.svg" alt="FirstNet Local Control Home" />
										</Link>
									: <img src="/images/logo-FirstNet-local-control.svg" alt="" aria-hidden="true"/>
								}
							</div>
						</div>
						<div className="row is-flex">
							{this.renderSitemapColumn()}
							{this.renderFirstNetColumn()}
							{this.renderSocialLinkColumn()}
							{this.renderHelpColumn()}
						</div>
					</div>
				</div>
				<div className="footer-sub">
					<div className="container">
						<div className="row">
							<div className="col-xs-12">
								{this.renderBottomNav()}
							</div>
						</div>
					</div>
				</div>
			</footer>
		);
	}
}
