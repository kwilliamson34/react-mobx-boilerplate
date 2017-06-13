import React from 'react';
import PropTypes from 'prop-types';
import {Link, NavLink, withRouter} from 'react-router-dom';
import config from 'config';
import {observer, inject} from 'mobx-react';
import 'bootstrap';

@inject('store')
@withRouter
@observer
export default class PSEHeader extends React.Component {
	constructor(props) {
		super(props);
		this.headerStore = this.props.store.headerStore;
		this.userStore = this.props.store.userStore;
		window.addEventListener('resize',this.headerStore.updateWindowDimensions);
	}

	componentWillMount() {
		this.headerStore.updateWindowDimensions();
	}

	toggleMainMenu = () => {
		this.headerStore.toggleMainMenu();
	}

	onLogout = (event) => {
		event.preventDefault();
		this.userStore.logoutUser();
	}

	render() {
		var mainbarClass = (this.headerStore.mainMenuIsOpen) ? 'fnnav__mainbar open' : 'fnnav__mainbar';
		return (
			<header className="fnnav pse" role="banner">
				<div className={mainbarClass}>
						<div className="container">
								<div className="row">
									<div className="col-xs-12">
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
																				<a href="#" onClick={this.onLogout}>
																					<i className="icon-logout" aria-hidden="true"></i>Log Out
																				</a>
																		</li>
																</ul>
														</li>
														<li id="btn-admin"
															className="mainnav-item desktop-textlink"
															role="presentation">
																<button className="btnSubmenu"
																	data-toggle="collapse"
																	data-target="#pse-admin-nav"
																	aria-haspopup="true"
																	aria-expanded="false">
																		<span className="sr-only">Expand Section Navigation</span>
																</button>
																<NavLink id="linkBtn-admin" to="/admin" activeClassName="active">Administration</NavLink>
																<div className="header-submenu is-flex">
																<ul id="pse-admin-nav"
																	className="collapse"
																	aria-labelledby="linkBtn-admin">
																	<strong className="visible-md-block visible-lg-block">Manage</strong>
																	<li role="presentation">
																		<NavLink to="/admin/manage-users"><i className="icon-external-site" aria-hidden="true" />Manage Users</NavLink>
																	</li>
																	<li role="presentation">
																		<NavLink to="/admin/manage-apps">Manage Apps</NavLink>
																	</li>
																	<li role="presentation">
																		<NavLink to="/admin/manage-billing">
																		<i className="icon-external-site" aria-hidden="true" />Manage Services &amp; Billing</NavLink>
																	</li>
																	<li role="presentation">
																		<NavLink to="/admin/manage-push-talk">
																		<i className="icon-external-site" aria-hidden="true" />Manage push-to-talk</NavLink>
																	</li>
																	<li role="presentation">
																		<NavLink to="/admin/view-wireless-reports">
																		<i className="icon-external-site" aria-hidden="true" />View wireless reports</NavLink>
																	</li>
																</ul>
																	<ul id="pse-aside-nav"
																		className="collapse"
																		aria-labelledby="linkBtn-admin">
																		<strong className="visible-md-block visible-lg-block">Shop</strong>
																	<li>
																		<NavLink to="/shop-devices-rates">
																		<i className="icon-external-site" aria-hidden="true" />Rate Plans &amp; Standard Devices</NavLink>
																	</li>
																	<li>
																		<NavLink to="/devices">Specialized Devices</NavLink>
																	</li>
																	<li>
																		<NavLink to="/solutions">Public Safety Solutions</NavLink>
																	</li>
																</ul>
															</div>
														</li>
														<li className="mainnav-item desktop-textlink" role="presentation">
																<NavLink id="linkBtn-networkStatus" to="/network-status" activeClassName="active">Network Status</NavLink>
														</li>
														{/* following only appears in mobile */}
														<li className="mainnav-item" role="presentation">
																<button
																	data-toggle="collapse"
																	data-target="#pse-helpcenter-nav"
																	aria-haspopup="true"
																	aria-expanded="false">
																		<span className="sr-only">Expand Section Navigation</span>
																</button>
																<NavLink id="linkBtn-help-center" activeClassName="active" to="/help-center">Help Center</NavLink>
																<ul id="pse-helpcenter-nav" role="menu" className="collapse" aria-labelledby="linkBtn-help-center">
																	<li role="presentation">
																		<NavLink to="#faq" activeClassName="active">FAQ</NavLink>
																	</li>
																	<li role="presentation">
																		<NavLink to="#provide-feedback" activeClassName="active">Provide Feedback</NavLink>
																		</li>
																		<li role="presentation">
																			<NavLink to="#contact-us" activeClassName="active">Contact Us</NavLink>
																		</li>
																</ul>
														</li>
														{/* Desktop Only Buttons */}
														<li className="desktop-iconItem dropdown">
															<button
																id="profile-header-dropdown"
																type="button"
																className="dropdown-toggle"
																data-toggle="dropdown">
																<i className="icon-profile" aria-label="Go to User Dashboard"></i>
															</button>

															<ul id="pse-profile-nav"
																role="menu"
																className="dropdown-menu dropdown-menu-right" aria-labelledby="profile-header-dropdown">
																<li role="presentation">
																	<NavLink to="#faq" activeClassName="active">Manage My Profile</NavLink>
																</li>
																<li role="presentation">
																	<a href="#" onClick={this.onLogout}>
																		<i className="icon-logout" aria-hidden="true"></i>Log Out
																	</a>
																</li>
															</ul>
														</li>
														<li className="desktop-iconItem dropdown">
															<div></div>
															<button
																id="help-header-dropdown"
																type="button"
																className="dropdown-toggle"
																data-toggle="dropdown">
																<i className="icon-help" aria-label="Go to Help Center"></i>
															</button>

															<ul id="pse-help-nav"
																role="menu"
																className="dropdown-menu dropdown-menu-right"
																aria-labelledby="help-header-dropdown">
																	<li role="presentation">
																			<NavLink to="#faq" activeClassName="active">FAQ</NavLink>
																	</li>
																	<li role="presentation">
																			<NavLink to="#faq" activeClassName="active">Give Us Feedback</NavLink>
																	</li>
																	<li role="presentation">
																		<a href="tel:800-600-8000" className="tel-cell">AT&T CUSTOMER SERVICE: <br /><span>800-600-8000</span></a>
																	</li>
															</ul>
														</li>
												</ul>
										</nav>
									</div>
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
