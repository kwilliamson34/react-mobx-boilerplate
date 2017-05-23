import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

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
																				<Link to="#log-out">
																					<i className="icon-logout" aria-hidden="true"></i>Log Out
																				</Link>
																		</li>
																</ul>
														</li>
														<li className="mainnav-item desktop-textlink" role="presentation">
																<button className="btnSubmenu"
																	data-toggle="collapse"
																	data-target="#pse-admin-nav"
																	aria-haspopup="true"
																	aria-expanded="false">
																		<span className="sr-only">Expand Section Navigation</span>
																</button>
																<NavLink id="linkBtn-admin" to="/admin" activeClassName="active">Administration</NavLink>
																<ul id="pse-admin-nav" className="collapse" aria-labelledby="linkBtn-admin">
																	<li role="presentation">
																		<NavLink to="/admin/manage-users">Manage Users</NavLink>
																	</li>
																	<li role="presentation">
																		<NavLink to="/admin/manage-billing">Manage Billing</NavLink>
																	</li>
																	<li role="presentation">
																		<NavLink to="/admin/manage-services">Manage Services</NavLink>
																	</li>
																	<li role="presentation">
																		<NavLink to="/admin/manage-apps">Manage Apps</NavLink>
																	</li>
																	<li role="presentation">
																		<NavLink to="/admin/manage-push-talk">Manage push-to-talk</NavLink>
																	</li>
																	<li role="presentation">
																		<NavLink to="/admin/view-wireless-reports">View wireless reports</NavLink>
																	</li>
																</ul>
														</li>
														<li className="mainnav-item desktop-textlink" role="presentation">
																<NavLink id="linkBtn-networkStatus" to="/network-status" activeClassName="active">Network Status</NavLink>
														</li>
														<li className="mainnav-item" role="presentation">
																<button className="btnSubmenu"
																	data-toggle="collapse"
																	data-target="#pse-helpcenter-nav"
																	aria-haspopup="true"
																	aria-expanded="false">
																		<span className="sr-only">Expand Section Navigation</span>
																</button>
																<NavLink id="linkBtn-help-center" activeClassName="active" to="/help-center">Help Center</NavLink>
																<ul id="pse-helpcenter-nav" className="collapse" aria-labelledby="linkBtn-help-center">
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
														{/* <li className="mainnav-item pse-selector" role="presentation">
																<PSESelector/>
														</li> */}
														<li className="desktop-iconItem">
															<NavLink to="/user" activeClassName="active">
																<i className="icon-profile" aria-label="Go to User Dashboard"></i>
															</NavLink>
														</li>
														<li className="desktop-iconItem">
															<NavLink to="/help-center" activeClassName="active"><i className="icon-help" aria-label="Go to Help Center"></i></NavLink></li>
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
