import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {observer,inject} from 'mobx-react';

import NewTabLink from '../link/new-tab-link';

@inject('store')
@observer
export default class Footer extends React.Component {

	static propTypes = {
		store: PropTypes.object,
		showInternalLinks: PropTypes.bool
	}

	static defaultProps = {
    showInternalLinks: true
  }

	constructor(props) {
		super(props);
		this.headerStore = this.props.store.headerStore;
		this.externalLinkStore = this.props.store.externalLinkStore;
		this.user = this.props.store.userStore;
		this.handleSitemapClick = this.handleSitemapClick.bind(this);
	}

	handleSitemapClick(e){
		e.preventDefault();
		this.headerStore.toggleFooterSitemap();
	}

	renderBrandingArea() {
		return(
			<Link to="/" className="logo-home-link-footer">
				<img src="/images/logo-FirstNet-local-control.svg" alt="FirstNet Local Control Home" />
			</Link>
		)
	}


	renderSitemapColumn() {
		let sitemapCollapseBreakpoint = 992;
		let allowFocusOnSitemapHeader = this.headerStore.viewportWidth < sitemapCollapseBreakpoint;
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
								<Link to="/admin/devices">Specialized Device Catalog</Link>
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

	renderFirstNetColumn() {
		return (
			<div className="col-xs-12 col-md-3">
				<nav id=""  aria-describedby="firstnet-sites">
					<h2 id="firstnet-sites">Firstnet Sites</h2>
					<ul>
						<li role="presentation">
							<NewTabLink to="http://firstnet.com/" >
							FirstNet.com</NewTabLink>
						</li>
						<li role="presentation">
							<NewTabLink to="https://fndevpgm-uat-app.eng.mobilephone.net/firstnet" >Developer Portal</NewTabLink>
						</li>
						<li role="presentation">
							<NewTabLink to="https://test-appcontrol.firstnet.att.com/" >
						App Control</NewTabLink></li>
						<li role="presentation">
							<NewTabLink to="https://test-apps.firstnet.att.com/" >
						App Store</NewTabLink></li>
					</ul>
				</nav>
			</div>
		);
	}

	renderSocialLinkColumn() {
		return (
			<div className="col-xs-12 col-md-3">
				<nav className="social-nav"  aria-describedby="social-links">
					<h2 id="social-links">Follow Us</h2>
					<ul className="social-links-list">
						<li role="presentation">
							<NewTabLink to="https://www.facebook.com/firstnetgov/" className="fn-social-icon fb" >
							<i aria-hidden="true" className="icon-facebook"></i>
							<span className="title">Facebook</span>
						</NewTabLink>
						</li>
						<li role="presentation">
							<NewTabLink to="https://www.linkedin.com/company/first-responder-network-authority-firstnet-" className="fn-social-icon linkedin" >
							<i aria-hidden="true" className="icon-linkedin"></i>
							<span className="title">LinkedIn</span>
						</NewTabLink>
						</li>
						<li role="presentation"><NewTabLink to="https://twitter.com/FirstNetGov" className="fn-social-icon twitter" >
							<i aria-hidden="true" className="icon-twitter"></i>
							<span className="title">Twitter</span>
						</NewTabLink></li>
						<li role="presentation">
							<NewTabLink to="https://firstnetgov.tumblr.com/" className="fn-social-icon tumblr" >
							<i aria-hidden="true" className="icon-tumblr"></i>
							<span className="title">Tumblr</span>
						</NewTabLink>
						</li>
						<li role="presentation"><NewTabLink to="https://www.youtube.com/user/FirstNetGov" className="fn-social-icon youtube" >
							<i aria-hidden="true" className="icon-youtube"></i>
							<span className="title">YouTube</span>
						</NewTabLink></li>
					</ul>
				</nav>
			</div>
		);
	}

	renderHelpColumn() {
		return (
			<div className="col-xs-12 col-md-3">
				<nav aria-describedby="helpLinks">
					<h2 id="helpLinks" className="help-hdr">Help</h2>
					<ul className="help-link-block">
						<li role="presentation">
							<Link to="/faq">FAQ</Link>
						</li>
						<li role="presentation">
							<Link to="/feedback">Give Us Feedback</Link>
						</li>
						<li role="presentation">
							AT&amp;T Customer Service:<br className="visible-xs-inline-block visible-md-inline-block" />&nbsp;
							<a href={'tel:' + this.headerStore.ATTSupportPhone}>
								<i className="icon-phone-number footer-support-phone" aria-hidden='true'></i>
								<span className="sr-only">Call&nbsp;</span>
								{this.headerStore.ATTSupportPhone}
								<span className="sr-only">&nbsp;to speak with AT&amp;T Customer Service</span>
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
						<NewTabLink to="https://www.firstnet.gov/privacy-policy">Privacy Policy</NewTabLink>
					</li>
					<li role="presentation">
						<NewTabLink to={this.externalLinkStore.termsOfUse}>
							Terms of Use</NewTabLink>
					</li>
					<br className="visible-xs-inline-block" />
					<li role="presentation">
						<NewTabLink to="https://www.firstnet.gov/accessibility">
						Accessibility
						</NewTabLink>
					</li>
					<li role="presentation"><NewTabLink to="https://www.firstnet.gov/">FirstNet.gov</NewTabLink></li>
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
								{this.renderBrandingArea()}
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
							{this.renderBottomNav}
						</div>
					</div>
					</div>
				</div>
			</footer>
		);
	}

}
