import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import NewTabLink from '../link/new-tab-link';
import { observer, inject, PropTypes } from 'mobx-react';
import 'bootstrap';

@inject('store')
@withRouter
@observer
export default class PSEHeader extends React.Component {
	static propTypes = {
		store: PropTypes.observableObject.isRequired,
		location: PropTypes.objectOrObservableObject
	};

	constructor(props) {
		super(props);
		this.headerStore = this.props.store.headerStore;
		this.userStore = this.props.store.userStore;
		this.linkStore = this.props.store.externalLinkStore;
	}

	toggleMainMenu = () => {
		this.headerStore.toggleMainMenu();
	};

	toggleAdminSubMenu = () => {
		this.headerStore.toggleAdminSubMenu();
	};

	toggleProfileSubMenu = () => {
		this.headerStore.toggleProfileSubMenu();
	};

	toggleHelpSubMenu = () => {
		this.headerStore.toggleHelpSubMenu();
	};

	onLogout = event => {
		event.preventDefault();
		this.userStore.logoutUser();
	};

	render() {
		var mainbarClass = (this.headerStore.mainMenuIsOpen) ? 'fnnav__mainbar open' : 'fnnav__mainbar';
		return (
			<header className="fnnav pse" role="banner">
				<div className={mainbarClass}>
					<div className="container">
						<div className="fnnav__header">
							<div className="fnnav__brand">
								<Link to="/">
									<img
										src="/images/logo-FirstNet-local-control.svg"
										alt="FirstNet Logo"
									/>
									<span className="sr-only">Go Home</span>
								</Link>
							</div>
							<button
								type="button"
								className="navbar-toggle"
								onClick={this.toggleMainMenu}
								aria-haspopup="true"
								aria-expanded={this.headerStore.mainMenuIsOpen}>
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar" />
								<span className="icon-bar" />
								<span className="icon-bar" />
							</button>
						</div>
						<nav
							id="main-menu"
							aria-label="Main Menu"
							aria-hidden={!this.headerStore.mainMenuIsOpen}>
							<ul className="fnnav__main">
								<li className="mainnav-item yellow" role="presentation">
									<button
										className="btnSubmenu"
										onClick={this.toggleProfileSubMenu}
										aria-haspopup="true"
										aria-expanded={this.headerStore.profileSubMenuIsOpen}>
										<span className="sr-only">Expand Section Navigation</span>
									</button>
									<a id="pse-profile" href="#" className="deaden">
										<div className="multi-line-item">
											<div className="profile-display">
												<i className="icon-profile" aria-hidden="true" />
												{this.userStore.user.firstName +
													' ' +
													this.userStore.user.lastName}
												{this.userStore.user.pseName &&
													<div>{this.userStore.user.pseName}</div>
												}
											</div>
										</div>
									</a>
									<ul
										id="pse-profile-nav"
										className={
											this.headerStore.profileSubMenuIsOpen
												? 'collapse in'
												: 'collapse'
										}
										aria-labelledby="pse-profile">
										<li role="presentation">
											<NewTabLink to={this.linkStore.manageMyProfileLink}>Manage My Profile</NewTabLink>
										</li>
									</ul>
								</li>
								{this.userStore.isAdmin &&
									<li
										id="btn-admin"
										className={
											this.headerStore.adminSubMenuIsOpen
												? 'mainnav-item desktop-textlink expanded'
												: 'mainnav-item desktop-textlink'
										}
										role="presentation">
										<button
											className="btnSubmenu"
											onClick={this.toggleAdminSubMenu}
											aria-haspopup="true"
											aria-expanded={this.headerStore.adminSubMenuIsOpen}>
											<span className="sr-only">
												Expand Administration Navigation
											</span>
										</button>
											<NavLink
												id="linkBtn-admin"
												to="/admin"
												activeClassName="active">
												Administration
											</NavLink>
										<div id="admin-submenu" className="header-submenu">
											<ul
												id="pse-admin-nav"
												className={
													this.headerStore.adminSubMenuIsOpen
														? 'collapse in'
														: 'collapse'
												}
												aria-labelledby="linkBtn-admin">
												<strong className="visible-md-block visible-lg-block">
													Manage
												</strong>
												<li role="presentation">
													<NewTabLink to={this.linkStore.manageUsersLink}>
														<i
															className="icon-external-site"
															aria-hidden="true"
														/>Manage Users
													</NewTabLink>
												</li>
												<li role="presentation">
													<NavLink to="/admin/manage-apps">Manage Apps</NavLink>
												</li>
												<li role="presentation">
													<NewTabLink to={this.linkStore.manageServicesLink}>
														<i
															className="icon-external-site"
															aria-hidden="true"
														/>Manage Services &amp; Billing
													</NewTabLink>
												</li>
												<li role="presentation">
													<NewTabLink to={this.linkStore.viewWirelessReportsLink}>
														<i
															className="icon-external-site"
															aria-hidden="true"
														/>View wireless reports
													</NewTabLink>
												</li>
											</ul>
											<ul
												id="pse-aside-nav"
												className={
													this.headerStore.adminSubMenuIsOpen
														? 'collapse in'
														: 'collapse'
												}
												aria-labelledby="linkBtn-admin">
												<strong className="visible-md-block visible-lg-block">
													Purchasing &amp; Provisioning
												</strong>
												<li>
													<NewTabLink to={this.linkStore.shopStandardDevicesLink}>
														<i
															className="icon-external-site"
															aria-hidden="true"
														/>Rate Plans &amp; Standard Devices
													</NewTabLink>
												</li>
												<li>
													<NavLink to="/admin/devices">Specialized Devices</NavLink>
												</li>
												<li>
													<NavLink to="/admin/solutions">
														Public Safety Solutions
													</NavLink>
												</li>
											</ul>
										</div>
									</li>
								}
								<li
									id="hdr-network-status"
									className="mainnav-item desktop-textlink"
									role="presentation">
									<NavLink
										id="linkBtn-networkStatus"
										to="/network-status"
										activeClassName="active">
										Network Status
									</NavLink>
								</li>
								<li className="mainnav-item grey">
									<button
										className="btnSubmenu"
										onClick={this.toggleHelpSubMenu}
										aria-haspopup="true"
										aria-expanded={this.headerStore.helpSubMenuIsOpen}>
										<span className="sr-only">
											Expand Administration Navigation
										</span>
									</button>
									<a id="pse-profile" href="/manage-profile">
										<i className="icon-help" aria-hidden="true" /> Help
									</a>
									<ul
										id="pse-help-menu"
										className={
											this.headerStore.helpSubMenuIsOpen
												? 'collapse in'
												: 'collapse'
										}
										aria-labelledby="linkBtn-admin">
										<li>
											<NavLink activeClassName="active" to="/faq">FAQ</NavLink>
										</li>
										<li>
											<NavLink activeClassName="active" to="/feedback">
												Give Us FeedBack
											</NavLink>
										</li>
										<li>
											<a href={'tel:' + this.headerStore.ATTSupportPhone}>
												<div className="multi-line-item">
													AT&amp;T Customer Service: <phone><i className="icon-phone-number" aria-hidden="true"></i>{this.headerStore.ATTSupportPhone}</phone>
												</div>
											</a>
										</li>
									</ul>
								</li>

								<li className="mainnav-item grey logout" role="presentation">
									<a href="#" onClick={this.onLogout}>
										<i className="icon-logout" aria-hidden="true" />Log Out
									</a>
								</li>

								{/* Desktop Only Buttons */}
								<li className="desktop-iconItem dropdown">
									<button
										id="profile-header-dropdown"
										type="button"
										data-toggle="dropdown">
										<i
											className="icon-profile"
											aria-label="Go to User Dashboard"
										/>
									</button>
									<ul
										id="pse-profile-nav"
										role="menu"
										className="dropdown-menu dropdown-menu-right"
										aria-labelledby="profile-header-dropdown">
										<li role="presentation">
											<NewTabLink to={this.linkStore.manageMyProfileLink}>
												<i className="icon-settings" aria-hidden="true"></i>Manage My Profile
											</NewTabLink>
										</li>
										<li role="presentation">
											<a href="#" onClick={this.onLogout}>
												<i className="icon-logout" aria-hidden="true" />Log Out
											</a>
										</li>
									</ul>
								</li>
								<li className="desktop-iconItem dropdown">
									<button
										id="help-header-dropdown"
										type="button"
										className={(this.props.location.pathname === '/faq' || this.props.location.pathname === '/feedback')? 'dropdown-toggle active':'dropdown-toggle'}
										data-toggle="dropdown">
										<i className="icon-help" aria-label="Go to Help Center" />
									</button>
									<ul
										id="pse-help-nav"
										role="menu"
										className="dropdown-menu dropdown-menu-right"
										aria-labelledby="help-header-dropdown">
										<li role="presentation">
											<NavLink to="/faq" activeClassName="active">FAQ</NavLink>
										</li>
										<li role="presentation">
											<NavLink to="/feedback" activeClassName="active">
												Give Us Feedback
											</NavLink>
										</li>
										<li role="presentation">
											<a href={'tel:' + this.headerStore.ATTSupportPhone} className="tel-cell">
												AT&amp;T Customer Service: <br /><span><i className="icon-phone-number" aria-hidden="true"></i>{this.headerStore.ATTSupportPhone}</span>
											</a>
										</li>
									</ul>
								</li>
							</ul>
						</nav>
					</div>
				</div>
				<div
					className="pageMask hidden-xs hidden-md hidden-lg"
					onClick={this.toggleMainMenu}
				/>
			</header>
		);
	}
}
