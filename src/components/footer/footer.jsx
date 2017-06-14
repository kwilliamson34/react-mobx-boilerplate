import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {observer,inject} from 'mobx-react';

@inject('store')
@observer
export default class Footer extends React.Component {

	static propTypes = {
		store: PropTypes.object
	}

	constructor(props) {
		super(props);
		this.headerStore = this.props.store.headerStore;
		this.handleSitemapClick = this.handleSitemapClick.bind(this);
	}

	handleSitemapClick(e){
		e.preventDefault();
		this.headerStore.toggleFooterSitemap();
	}

	render() {
		return (

			<footer>
			<div className="footer-main">
				<div className="container">
					<div className="row">
						<div className="col-xs-12 logoRow">
							<Link to="/">
								<img src="/images/logo-FirstNet-local-control.svg" alt="FirstNet Local Control Home" />
							</Link>
						</div>
					</div>
					<div className="row is-flex">
						<div className="col-xs-12 col-md-3">
							<nav aria-describedby="sitemap">
								<a id="sitemap" href=""
									onClick={this.handleSitemapClick}
									className="sitemap-hdr"
									role="button"
									aria-haspopup="true"
									aria-expanded={this.headerStore.footerSitemapExpanded}>Sitemap</a>
								<ul className="sitemap-links">
									<li role="presentation">
										<Link to="/admin">PSE Administration</Link>
									</li>
									<li role="presentation">
										<Link to="/admin/manage-apps">Manage Apps</Link>
									</li>
									<li role="presentation">
										<Link to="/devices">Specialized Device Catalog</Link>
									</li>
									<li role="presentation">
										<Link to="/solutions">Solutions Catalog</Link>
									</li>
									<li role="presentation">
										<Link to="/network-status">Network Status</Link>
									</li>
								</ul>
							</nav>
						</div>
						<div className="col-xs-12 col-md-3">
							<nav id=""  aria-describedby="firstnet-sites">
								<h2 id="firstnet-sites">Firstnet Sites</h2>
								<ul>
									<li role="presentation">
										<a href="http://firstnet.com/" target="_blank" rel="noopener noreferrer">
										FirstNet.com</a>
									</li>
									<li role="presentation">
										<a href="http://firstnet.com/" target="_blank" rel="noopener noreferrer">
									Developer Portal</a></li>
									<li role="presentation">
										<a href="http://firstnet.com/" target="_blank" rel="noopener noreferrer">
									App Control</a></li>
									<li role="presentation">
										<a href="http://firstnet.com/" target="_blank" rel="noopener noreferrer">
									App Store</a></li>
								</ul>
							</nav>
						</div>
						<div className="col-xs-12 col-md-3">
							<nav className="social-nav"  aria-describedby="social-links">
								<h2 id="social-links">Follow Us</h2>
								<ul className="social-links-list">
									<li role="presentation">
										<a href="https://www.facebook.com/firstnetgov/" className="fn-social-icon fb" target="_blank" rel="noopener noreferrer">
										<i aria-hidden="true" className="icon-facebook"></i>
                    <span className="title">Facebook</span>
									</a>
                  </li>
									<li role="presentation">
										<a href="https://www.linkedin.com/company/first-responder-network-authority-firstnet-" className="fn-social-icon linkedin" target="_blank" rel="noopener noreferrer">
										<i aria-hidden="true" className="icon-linkedin"></i>
										<span className="title">LinkedIn</span>
									</a>
									</li>
									<li role="presentation"><a href="https://twitter.com/FirstNetGov" className="fn-social-icon twitter" target="_blank" rel="noopener noreferrer">
                    <i aria-hidden="true" className="icon-twitter"></i>
                    <span className="title">Twitter</span>
                  </a></li>
									<li role="presentation">
										<a href="https://firstnetgov.tumblr.com/" className="fn-social-icon tumblr" target="_blank" rel="noopener noreferrer">
										<i aria-hidden="true" className="icon-tumblr"></i>
										<span className="title">Tumblr</span>
									</a>
									</li>
									<li role="presentation"><a href="https://www.youtube.com/user/FirstNetGov" className="fn-social-icon youtube" target="_blank" rel="noopener noreferrer">
                    <i aria-hidden="true" className="icon-youtube"></i>
                    <span className="title">YouTube</span>
                  </a></li>
								</ul>
							</nav>
						</div>
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
										AT&amp;T Customer Service:<br className="visible-xs-inline-block visible-md-inline-block" />&nbsp;<a href="tel:800-600-8000">800-600-8000</a>
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
								<li role="presentation"><Link to="/privacy">Privacy Policy</Link></li>
								<li role="presentation"><Link to="/terms">Terms &amp; Conditions</Link></li>
								<br className="visible-xs-inline-block" />
								<li role="presentation"><Link to="/accessibility">Accessibility</Link></li>
								<li role="presentation"><a href="https://www.firstnet.gov/" target="_blank" rel="noopener noreferrer">FirstNet.gov</a></li>
							</ul>
						</nav>
					</div>
				</div>
				</div>
			</div>
		</footer>
		);
	}

}
