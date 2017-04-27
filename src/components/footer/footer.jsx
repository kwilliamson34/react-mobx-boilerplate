import React from 'react';
import { Link } from 'react-router-dom';

export default class Footer extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<footer id="pse-footer" className="footer-bar">
				<div className="footer-height footer-top">
					<div className="row footer-row">
						<div className="col-xs-12 col-md-10 col-md-offset-1">
							<div className="clear-image-box footer-logo">
								<Link to="/" className="clear-image-box">
									<img alt="FirstNet Local Control Home" src="./images/logo-FirstNet-local-control.svg" className="footer-logo-size" />
								</Link>
							</div>
						</div>
					</div>
					<div className="row footer-row is-flex">
						<div className="col-md-4 col-md-offset-1 col-xs-12 col-sm-12">
							<span className="hidden-md hidden-lg hidden-xl"><hr className="footer-separator"/></span>
							<h2 className="footer-menu-header">FIRSTNET PORTALS</h2>
							<nav id="footer-portals-menu" aria-label="Firstnet Portals Menu">
								<ul className="footer-menu-ul">
									<li role="presentation"><a href="http://www.firstnet.com/appstore">FIRSTNET APP STORE</a></li>
									<li role="presentation"><a href="http://www.firstnet.gov">FIRSTNET.GOV</a></li>
									<li role="presentation"><a href="http://www.firstnet.com">FIRSTNET.COM</a></li>
								</ul>
							</nav>
						</div>
						<div className="col-md-3 col-sm-12 col-xs-12">
							<span className="hidden-md hidden-lg hidden-xl"><hr className="footer-separator"/></span>
							<h2 className="footer-menu-header">FOLLOW US</h2>
							<nav id="footer-social-menu" aria-label="Social Menu">
								<ul className="footer-menu-ul">
									<li className="footer-menu-social" role="presentation">
										<a href="https://www.facebook.com/firstnetgov/" aria-label="facebook" target="_blank" rel="noopener noreferrer">
										<span className="fa-stack fa-1x footer-icon-menu-spacing" aria-hidden="true">
											<span className="fa fa-circle fa-stack-2x footer-icon-background" aria-hidden="true" />
											<span className="fa fa-facebook fa-stack-1x footer-icon-foreground" aria-hidden="true" />
										</span>
										<span className="hidden-xs hidden-sm" aria-hidden="true">FACEBOOK</span></a>
									</li>
									<li className="footer-menu-social" role="presentation">
										<a href="https://twitter.com/FirstNetGov" aria-label="twitter" target="_blank" rel="noopener noreferrer">
										<span className="fa-stack fa-1x footer-icon-menu-spacing" aria-hidden="true">
											<span className="fa fa-circle fa-stack-2x footer-icon-background" aria-hidden="true" />
											<span className="fa fa-twitter fa-stack-1x footer-icon-foreground" aria-hidden="true" />
										</span>
										<span className="hidden-xs hidden-sm" aria-hidden="true">TWITTER</span></a>
									</li>
									<li className="footer-menu-social" role="presentation">
										<a href="https://firstnetgov.tumblr.com/" aria-label="tumblr" target="_blank" rel="noopener noreferrer">										<span className="fa-stack fa-1x footer-icon-menu-spacing" aria-hidden="true">
											<span className="fa fa-circle fa-stack-2x footer-icon-background" aria-hidden="true" />
											<span className="fa fa-tumblr fa-stack-1x footer-icon-foreground" aria-hidden="true" />
										</span>
										<span className="hidden-xs hidden-sm" aria-hidden="true">TUMBLR</span></a>
									</li>
									<li className="footer-menu-social" role="presentation">
										<a href="https://www.youtube.com/user/FirstNetGov" aria-label="youtube" target="_blank" rel="noopener noreferrer">
										<span className="fa-stack fa-1x footer-icon-menu-spacing" aria-hidden="true">
											<span className="fa fa-circle fa-stack-2x footer-icon-background" aria-hidden="true" />
											<span className="fa fa-youtube fa-stack-1x footer-icon-foreground" aria-hidden="true" />
										</span>
										<span className="hidden-xs hidden-sm" aria-hidden="true">YOUTUBE</span></a>
									</li>
								</ul>
							</nav>
						</div>
						<div className="col-md-4 col-xs-12 col-sm-12 footer-styling-mobile">
							<h2 className="footer-menu-header"><span className="fa fa-question-circle footer-icon-menu-spacing" aria-hidden="true" /> GET HELP</h2>
							<nav id="footer-help-menu" aria-label="Help Menu">
								<ul className="footer-menu-ul">
									<li className="footer-help-menu-spacing" role="presentation">
										<Link to="/faq">FAQ</Link>
									</li>
									<li className="footer-help-menu-spacing" role="presentation">
										<Link to="/feedback">PROVIDE FEEDBACK</Link>
									</li>
									<li className="footer-help-menu-spacing" role="presentation">
										<Link to="/contact">CONTACT US</Link>
									</li>
								</ul>
							</nav>
						</div>
					</div>
				</div>
				<div className="row footer-bottom">
					<div className="col-xs-12 col-sm-8 col-md-10 footer-text-links">
						<nav id="sublinks" aria-label="Sublinks">
							<ul className="footer-small-links">
								<li role="presentation"><a href="https://www.commerce.gov/" target="_blank" rel="noopener noreferrer">Commerce.gov</a></li>
								<li role="presentation"><Link to="/privacy">Privacy Policy</Link></li>
								<li role="presentation"><Link to="/policies">Web Policies</Link></li>
								<li role="presentation"><Link to="/accessibility">Accessibility</Link></li>
								<li role="presentation"><a href="https://www.usa.gov/" target="_blank" rel="noopener noreferrer">USA.gov</a></li>
							</ul>
						</nav>
					</div>
					<div className="col-xs-12 col-sm-4 col-md-2 footer-text-images">
						<a href="https://www.commerce.gov/" target="_blank" rel="noopener noreferrer" className="clear-image-box">
							<img src="./images/dept_of_commerce_1.png" className="footer-commerce-logo" alt="Logo - US Department of Commerce"/>
						</a>
						<a href="https://www.ntia.doc.gov/" target="_blank" rel="noopener noreferrer" className="clear-image-box">
							<img src="./images/dept_of_commerce_2.png" className="footer-commerce-logo" alt="Logo - National Telecommunications And Information Administration"/>
						</a>
					</div>
				</div>
			</footer>
		);
	}

}
