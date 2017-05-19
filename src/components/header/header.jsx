import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import UtilityNav from './utility-nav';
import PSESelector from '../pse-selector/pse-selector';

import WeatherWidget from '../weather-widget/weather-widget';

import {observer,inject} from 'mobx-react';

@inject('store')
@observer
export default class PSEHeader extends React.Component {
	constructor(props) {
		super(props);
		this.headerStore = this.props.store.headerStore;
	}

	toggleMainMenu = () => {
		this.headerStore.toggleMainMenu();
	}

	render() {
		var mainbarClass = (this.headerStore.mainMenuIsOpen) ? 'fnnav__mainbar open' : 'fnnav__mainbar';
		return (
			<header className="fnnav pse" role="banner">
				<UtilityNav/>
				<div className={mainbarClass}>
						<div className="container">
								<div className="row">
										<div className="fnnav__header">
											<div className="fnnav__brand">
													<Link to="/">
															<img src="/images/logo-FirstNet-local-control.svg" alt="FirstNet Logo" />
															<span className="sr-only">Go Home</span>
													</Link>
											</div>
												<button type='button'
													className="navbar-toggle"
													onClick={this.toggleMainMenu}
													aria-haspopup="true"
													aria-expanded={this.headerStore.mainMenuIsOpen}>
														<span className='sr-only'>Toggle navigation</span>
														<span className='icon-bar'></span>
														<span className='icon-bar'></span>
														<span className='icon-bar'></span>
												</button>
												<WeatherWidget />
										</div>
										<nav id="main-menu" aria-label="Main Menu" aria-hidden={!this.headerStore.mainMenuIsOpen}>
												<ul className="fnnav__main">
														<li className="mainnav-item blue" role="presentation">
																<button className="btnSubmenu"
																	data-toggle="collapse"
																	data-target="#pse-profile-nav"
																	aria-haspopup="true"
																	aria-expanded="false">
																		<span className="sr-only">Expand Section Navigation</span>
																</button>
																<a id="pse-profile" href="#profile">
																		<i className="icon-profile" aria-hidden="true" ></i>Lois Lane</a>
																<ul id="pse-profile-nav" className="collapse" aria-labelledby="pse-profile">
																		<li role="presentation">
																				<Link to="#manage-account">Manage My Account</Link>
																		</li>
																		<li role="presentation">
																				<Link to="#change-password">Change Password</Link>
																		</li>
																		<li role="presentation">
																				<Link to="#config-location">Configure Location</Link>
																		</li>
																		<li role="presentation">
																				<Link to="#config-news">Configure News</Link>
																		</li>
																		<li role="presentation">
																				<Link to="#config-mdm">Configure MDM</Link>
																		</li>
																		<li role="presentation">
																				<Link to="https://fcontent.stage.att.com/dynamic/iamLRR/LrrController?IAM_OP=logout">
																					<i className="icon-logout" aria-hidden="true"></i>Log Out
																				</Link>
																		</li>
																</ul>
														</li>
														<li className="mainnav-item" role="presentation">
																<button className="btnSubmenu"
																	data-toggle="collapse"
																	data-target="#pse-admin-nav"
																	aria-haspopup="true"
																	aria-expanded="false">
																		<span className="sr-only">Expand Section Navigation</span>
																</button>
																<Link id="linkBtn-admin" role="button" to="/admin">Administration Dashboard</Link>
																<ul id="pse-admin-nav" className="collapse" aria-labelledby="linkBtn-admin">
																		<li role="presentation">
																				<Link to="/manage-apps">Manage Apps</Link>
																		</li>
																</ul>
														</li>
														<li className="mainnav-item" role="presentation">
																<button className="btnSubmenu"
																	data-toggle="collapse"
																	data-target="#pse-helpcenter-nav"
																	aria-haspopup="true"
																	aria-expanded="false">
																		<span className="sr-only">Expand Section Navigation</span>
																</button>
																<Link id="linkBtn-help-center" to="/help-center">Help Center</Link>
																<ul id="pse-helpcenter-nav" className="collapse" aria-labelledby="linkBtn-help-center">
																		<li role="presentation">
																				<Link to="#faq">FAQ</Link>
																		</li>
																		<li role="presentation">
																				<Link to="#provide-feedback">Provide Feedback</Link>
																		</li>
																		<li role="presentation">
																				<Link to="#contact-us">Contact Us</Link>
																		</li>
																</ul>
														</li>
														<li className="mainnav-item pse-selector" role="presentation">
																<PSESelector/>
														</li>
												</ul>
										</nav>
								</div>
						</div>
				</div>
				<div className="pageMask hidden-md hidden-lg" onClick={this.toggleMainMenu} />
			</header>
		)
	}
}

PSEHeader.propTypes = {
	store: PropTypes.object
};
