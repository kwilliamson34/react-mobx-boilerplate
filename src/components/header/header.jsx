import React from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom';
import {NewTabLink} from 'fn-common-ui';
import {adminCards, asideCards} from '../../content/admin-cards.js';
import {observer, inject, PropTypes} from 'mobx-react';
import config from 'config';
import $ from 'jquery';
import _ from 'lodash';

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
		this.joyrideStore = this.props.store.joyrideStore;
		this.externalLinkStore = this.props.store.externalLinkStore;
	}

	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			this.handleRouteChange();
		}
	}

	componentDidMount() {
		$('#btn-admin').hover(() => {
			if (window.innerWidth > 992) {
				this.openDesktopAdminSubmenu();
			}
		}, () => {
			if (window.innerWidth > 992) {
				this.headerStore.adminSubMenuIsOpen = false;
			}
		});

		$('#linkBtn-admin').focus(() => {
			this.openDesktopAdminSubmenu();
		})

		$('.dropdown-toggle').focus(() => {
			$('.dropdown.open').removeClass('open');
		});

		$('.dropdown-menu li:last-child a').keydown((e) => {
			// if user uses keyboard navigation, need to make sure we arent closing menu when user Shift+Tabs(goes to previous item)
			if (e.which == 9 && e.shiftKey) {
				// do nothing
			} else if (e.which == 9) {
				$('.dropdown.open').removeClass('open');
			}
		});

		$('#linkBtn-network, .logo-home-link').focus(() => {
			//Per FPSE-966, focus listener was deadening the network link on mobile/tablet, so limiting this function call to affect desktop only
			if (window.innerWidth > 992) {
				this.headerStore.adminSubMenuIsOpen = false;
			}
		});

		$('body').click((e) => {
			let targetIds = ['admin-submenu', 'pse-admin-nav', 'pse-aside-nav', 'linkBtn-admin'];
			if (this.headerStore.adminSubMenuIsOpen &&
				!this.headerStore.mainMenuIsOpen &&
				!_.includes(targetIds, e.target.id)) {
				this.toggleAdminSubMenu();
			}
		});


		window.addEventListener('resize', this.updateWindowDimensions);
		window.addEventListener('showModal', this.closeMainMenu);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
		window.removeEventListener('showModal', this.closeMainMenu);
	}

	handleRouteChange() {
		this.closeMainMenu();
		if (this.headerStore.viewportWidth >= 768) {
			this.headerStore.closeAdminSubMenu();
		}
	}

	openDesktopAdminSubmenu() {
		if (!this.headerStore.adminSubMenuIsOpen) {
			this.headerStore.adminSubMenuIsOpen = true;
			$('.dropdown.open').removeClass('open');
			$('#linkBtn-admin').focus();
		}
	}

	updateWindowDimensions = _.debounce(() => {
		this.closeMainMenu();
	}, 200, {
			leading: true,
			trailing: false
		});

	toggleMainMenu = () => {
		this.headerStore.toggleMainMenu();
		this.toggleContentScrolling();
	};

	closeMainMenu = () => {
		this.headerStore.closeMainMenu();
		this.headerStore.updateViewportDimensions();
		this.toggleContentScrolling();
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

	handleExternalTabOpen = () => {
		this.headerStore.externalTabOpen();
		this.toggleContentScrolling();
	}

	onLogout = event => {
		event.preventDefault();
		this.userStore.logoutUser();
	};

	toggleContentScrolling() {
		if (this.headerStore.mainMenuIsOpen) {
			$('body:not(.fnnav__main)').css('overflow', 'hidden');
			$('body:not(.fnnav__main)').css('position', 'fixed');
			$('body').css('width', '100%');
		} else {
			$('body').css('overflow', 'auto');
			$('body').css('position', 'relative');
			$('body').css('width', 'auto');
		}
	}

	handleToggleWalkthrough = () => {
		this.joyrideStore.toggleTour();
	}

	renderProfileBlock = () => {
    return (<div>
      <i className="icon-profile" aria-hidden="true"/>
      <span className="pull-right-of-icon">
        {`${this.userStore.user.firstName} ${this.userStore.user.lastName}`}<br/>
        {this.userStore.user.pseName || ''}
      </span>
    </div>)
  }

	renderBrandArea = () => {
		return (
			<div className="fnnav__header">
				<button
					type="button"
					className="navbar-toggle walkthrough-hamburger-menu"
					onClick={this.toggleMainMenu}
					aria-haspopup="true"
					aria-expanded={this.headerStore.mainMenuIsOpen}>
					<span className="sr-only">Toggle navigation</span>
					<span className="icon-bar" />
					<span className="icon-bar" />
					<span className="icon-bar" />
				</button>
				<div className="fnnav__brand">
					<Link className="logo-home-link" to="/">
						<img src="/images/logo-FirstNet-local-control.svg" alt="FirstNet Local Control logo" />
						<span className="sr-only">Go Home</span>
					</Link>
				</div>
			</div>
		)
	}

	renderMobileOnlyUserMenu = () => {
		return (
			<li className="mainnav-item multi-line-item blue" role="presentation">
				<button
					className="btnSubmenu"
					onClick={this.toggleProfileSubMenu}
					aria-haspopup="true"
					aria-expanded={this.headerStore.profileSubMenuIsOpen}>
					<span className="sr-only">
						Expand Profile Menu
					</span>
				</button>
				<a id="pse-profile" href="#profile" className="deaden mobile-profile-block">
					{this.renderProfileBlock()}
				</a>
				<ul
					className={`collapse ${this.headerStore.profileSubMenuIsOpen ? 'in' : ''}`}
					aria-labelledby="pse-profile">
					<li role="presentation">
						<NewTabLink to={config.manageMyProfileLink} onClick={this.handleExternalTabOpen}>
							Manage My Profile
						</NewTabLink>
					</li>
				</ul>
			</li>
		)
	}

	renderPermissionedLinkList = (cards) => {
		const isPermitted = this.userStore.destinationIsPermitted;
		return cards.map((card, i) => {
			if (isPermitted[card.isPermitted]) {
				return (
					<li key={i}>
						{this.renderPermissionedLink(card, i)}
					</li>
				)}
			}
		)
	}

	renderPermissionedLink = (card) => {
		//render if we are allowed
		const isPermitted = this.userStore.destinationIsPermitted;
		if (isPermitted[card.isPermitted]) {
			// check if we are using a local or extenrnal link, and act accordingly
			const internalLink = card.linkTo[0] === '/'
			const LinkType = internalLink ? NavLink : NewTabLink;
			// set conditional props based on internal or external link.
			const props = {};
			if (internalLink) {
				props.to = card.linkTo;
			} else {
				props.to = config[card.linkTo];
				props.onClick = this.handleExternalTabOpen;
				props.showIcon = true
			}
			const linkTextRaw = card.navLinkName ? card.navLinkName : card.header;
			// Capitalize first letter of the link text, but preserve original capitalization in acronyms
			const linkText = linkTextRaw.replace(/\b[a-z]/g, function (letter) {
				return letter.toUpperCase();
			});
			return (
				<LinkType {...props}>
					<span dangerouslySetInnerHTML={{__html: linkText}}></span>
				</LinkType>
			)
		}
	}

	renderAdminMenuItem = () => {
		const isPermitted = this.userStore.destinationIsPermitted;
		const hideAside = !(isPermitted.shopStandardDevices || isPermitted.shopSpecializedDevices || isPermitted.shopPublicSafetySolutions);
		return (
			<li id="btn-admin" className={`mainnav-item desktop-textlink ${this.headerStore.adminSubMenuIsOpen ? 'expanded' : ''}`}>
				<button
					className="btnSubmenu"
					aria-haspopup="true"
					onClick={this.toggleAdminSubMenu}
					aria-expanded={this.headerStore.adminSubMenuIsOpen}>
					<span className="sr-only">
						Expand Administration Menu
					</span>
				</button>
				<NavLink
					id="linkBtn-admin"
					to="/admin"
					activeClassName="active"
					aria-haspopup="true"
					aria-expanded={this.headerStore.adminSubMenuIsOpen}>
					Administration
				</NavLink>
				<div id="admin-submenu" className="header-submenu">
					<ul
						id="pse-admin-nav"
						className={`collapse ${this.headerStore.adminSubMenuIsOpen ? 'in' : ''}`}
						aria-labelledby="linkBtn-admin">
						{!hideAside && <strong className="visible-md-block visible-lg-block" aria-hidden="true">
							Management
						</strong>}
						{this.renderPermissionedLinkList(adminCards)}
					</ul>
					{!hideAside && <ul
						id="pse-aside-nav"
						className={`collapse ${this.headerStore.adminSubMenuIsOpen ? 'in' : ''}`}
						aria-labelledby="linkBtn-admin">
						<strong className="visible-md-block visible-lg-block" aria-hidden="true">
							Purchasing &amp; Provisioning
						</strong>
						{this.renderPermissionedLinkList(asideCards)}
					</ul>}
				</div>
			</li>
		)
	}

	renderHelpMenuItems = () => {
		return (
			<div>
				<li>
					<NavLink activeClassName="active" to="/faq">
						FAQ
					</NavLink>
				</li>
				<li>
					<NewTabLink to={this.externalLinkStore.firstnetTraining} onClick={this.handleExternalTabOpen} showIcon={true}>
						Training
					</NewTabLink>
				</li>
				<li>
					<a href="#" role="button" className="walkthru-toggle" onClick={this.handleToggleWalkthrough}>
						{`${this.joyrideStore.tourIsDisabled ? 'Enable' : 'Disable'}`} Site Walkthrough
					</a>
				</li>
				<li>
					<NavLink activeClassName="active" to="/feedback">
						Give Us Feedback
					</NavLink>
				</li>
				<li className="multi-line-item">
					<a href={'tel:' + config.attCustomerSupportPhone}>
						<div>
							<span aria-hidden="true">FirstNet Customer Svc:&nbsp;</span><br />
							<i className="icon-phone-number" aria-hidden="true"></i>
							<span className="sr-only">FirstNet Customer Service Phone&nbsp;</span>
							{config.attCustomerSupportPhone}
						</div>
					</a>
				</li>
			</div>
		)
	}

	render() {
		return (
			<header className="fnnav pse" role="banner">
				<div className={`fnnav__mainbar ${this.headerStore.mainMenuIsOpen ? 'open' : ''}`}>
					<div className="container">
						{this.renderBrandArea()}
						<nav id="main-menu" aria-label="Main Menu">
							<ul className="fnnav__main walkthrough-nav-header">
								{this.renderMobileOnlyUserMenu()}
								{this.userStore.destinationIsPermitted.administration && this.renderAdminMenuItem()}
								{this.userStore.destinationIsPermitted.network &&
									<li id="hdr-network" className="mainnav-item desktop-textlink" role="presentation">
										<NavLink id="linkBtn-network" to="/network" activeClassName="active">
											Network
										</NavLink>
									</li>
								}
								{this.userStore.destinationIsPermitted.incidentUplift &&
									<li id="hdr-incident-uplift" className="mainnav-item desktop-textlink incidentMenuItem" role="presentation">
										<NewTabLink to={config.incidentUpliftLink} showIcon>
											Uplift
										</NewTabLink>
									</li>
								}

								{/* Mobile only menu items */}
								<li className="mainnav-item grey">
									<button
										className="btnSubmenu"
										onClick={this.toggleHelpSubMenu}
										aria-haspopup="true"
										aria-expanded={this.headerStore.helpSubMenuIsOpen}>
										<span className="sr-only">
											Expand Help Menu
										</span>
									</button>
									<a id="pse-help-mobile" href="/manage-profile" className="deaden">
										<i className="icon-help" aria-hidden="true" />
										Help
									</a>
									<ul
										id="pse-help-menu"
										className={`collapse ${this.headerStore.helpSubMenuIsOpen ? 'in' : ''}`}
										aria-labelledby="pse-help-mobile">
										{this.renderHelpMenuItems()}
									</ul>
								</li>
								<li className="mainnav-item grey logout" role="presentation">
									<a href="#" onClick={this.onLogout}>
										<i className="icon-logout" aria-hidden="true" />
										Log Out
									</a>
								</li>

								{/* Desktop only icon items */}
								<li className={`desktop-iconItem dropdown ${(this.userStore.destinationIsPermitted.administration && this.userStore.destinationIsPermitted.incidentUplift)? '' : 'first-iconItem'}`}>
									<button
										id="profile-header-dropdown"
										type="button"
										className="dropdown-toggle"
										aria-expanded="false"
										data-toggle="dropdown">
										<i className="icon-profile" aria-hidden="true" />
										<span className="sr-only">Toggle Profile Dropdown</span>
									</button>
									<ul
										id="pse-profile-nav"
										className="dropdown-menu dropdown-menu-right"
										aria-labelledby="profile-header-dropdown">
										<li role="presentation" className="desktop-profile-display multi-line-item">
											<a id="pse-profile-desktop" href="#profile" className="deaden" tabIndex="-1">
												{this.renderProfileBlock()}
											</a>
										</li>
										<li role="presentation">
											<NewTabLink to={config.manageMyProfileLink}>
												Manage My Profile
											</NewTabLink>
										</li>
										<li role="presentation">
											<a href="#" onClick={this.onLogout}>
												<i className="icon-logout" aria-hidden="true" />
												<span className="pull-right-of-icon">Log Out</span>
											</a>
										</li>
									</ul>
								</li>
								<li className="desktop-iconItem dropdown">
									<button
										id="help-header-dropdown"
										type="button"
										className={(this.props.location.pathname === '/faq' || this.props.location.pathname === '/feedback')? 'dropdown-toggle active':'dropdown-toggle'}
										aria-expanded="false"
										data-toggle="dropdown">
										<i className="icon-help" aria-hidden="true" />
										<span className="sr-only">Toggle Help Dropdown</span>
									</button>
									<ul
										id="pse-help-nav"
										className="dropdown-menu dropdown-menu-right"
										aria-labelledby="help-header-dropdown">
										{this.renderHelpMenuItems()}
									</ul>
								</li>
							</ul>
						</nav>
					</div>
				</div>
				<div className="pageMask hidden-xs hidden-md hidden-lg" onClick={this.closeMainMenu} />
			</header>
		);
	}
}
