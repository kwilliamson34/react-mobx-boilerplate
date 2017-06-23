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
		store: PropTypes.observableObject.isRequired
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
		//var mainbarClass = (this.headerStore.mainMenuIsOpen) ? 'fnnav__mainbar open' : 'fnnav__mainbar';
		var mainbarClass = 'fnnav__mainbar open';
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
										data-toggle="collapse"
										data-target="#pse-profile-nav"
										aria-haspopup="true"
										aria-expanded="false">
										<span className="sr-only">Expand Section Navigation</span>
									</button>
									<a id="pse-profile" href="/manage-profile">
										<div className="multi-line-item">
											<div className="profile-display">
												<i className="icon-profile" aria-hidden="true" />
												{this.userStore.user.firstName +
													' ' +
													this.userStore.user.lastName}
												<div>Seattle Fire Department Engine 110</div>
											</div>
										</div>
									</a>
									<ul
										id="pse-profile-nav"
										className="collapse"
										aria-labelledby="pse-profile">
										<li role="presentation">
											<Link to="/manage-profile">Manage My Profile</Link>
										</li>
									</ul>
								</li>
								<li
									id="btn-admin"
									className={
										this.headerStore.adminSubMenuIsOpen
											? 'mainnav-item desktop-textlink expanded'
											: 'mainnav-item desktop-textlink'
									}
									role="presentation">
									<NavLink
										id="linkBtn-admin"
										to="/admin"
										activeClassName="active">
										Administration
									</NavLink>
									<button
										className="btnSubmenu"
										onClick={this.toggleAdminSubMenu}
										aria-haspopup="true"
										aria-controls="admin-submenu"
										aria-expanded={this.headerStore.adminSubMenuIsOpen}>
										<span className="sr-only">
											Expand Administration Navigation
										</span>
									</button>
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
												Shop
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
												<NavLink to="/devices">Specialized Devices</NavLink>
											</li>
											<li>
												<NavLink to="/solutions">
													Public Safety Solutions
												</NavLink>
											</li>
										</ul>
									</div>
								</li>
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
										data-toggle="collapse"
										data-target="#pse-help-menu"
										aria-haspopup="true"
										aria-expanded="false">
										<span className="sr-only">
											Expand Administration Navigation
										</span>
									</button>
									<a id="pse-profile" href="/manage-profile">
										<i className="icon-help" aria-hidden="true" /> Help
									</a>
									<ul
										id="pse-help-menu"
										className="collapse"
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
											<a href="tel:800-600-8000">
												<div className="multi-line-item">
													AT&T CUSTOMER SERVICE: <phone>800-600-8000</phone>
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
										className="dropdown-toggle"
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
											<NavLink to="/manage-profile" activeClassName="active">
												Manage My Profile
											</NavLink>
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
										className="dropdown-toggle"
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
											<a href="tel:800-600-8000" className="tel-cell">
												AT&T CUSTOMER SERVICE: <br /><span>800-600-8000</span>
											</a>
										</li>
									</ul>
								</li>
							</ul>
						</nav>
					</div>
				</div>
				<div
					className="pageMask hidden-md hidden-lg"
					onClick={this.toggleMainMenu}
				/>
			</header>
		);
	}
}
