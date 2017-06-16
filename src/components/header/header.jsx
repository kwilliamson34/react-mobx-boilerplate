import React from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom';
import NewTabLink from '../link/new-tab-link';
import {observer, inject, PropTypes} from 'mobx-react';
import 'bootstrap';

@inject('store')
@withRouter
@observer
export default class PSEHeader extends React.Component {

	static propTypes = {
    store: PropTypes.observableObject.isRequired
  }

	constructor(props) {
		super(props);
		this.headerStore = this.props.store.headerStore;
		this.userStore = this.props.store.userStore;
		this.linkStore = this.props.store.externalLinkStore;
	}

	toggleMainMenu = () => {
		this.headerStore.toggleMainMenu();
	}

	onLogout = (event) => {
		event.preventDefault();
		this.userStore.logoutUser();
	}

	togglePushToTalkModal = (event) => {
    event.preventDefault();
    this.linkStore.togglePushToTalkModal();
  }

  setPushToTalkProvider = (provider) => {
    this.linkStore.setPushToTalkProvider(provider);
    this.linkStore.togglePushToTalkModal();
  }

  goToPushToTalkLink = () => {
    this.linkStore.togglePushToTalkModal();
  }

	renderPushToTalkModal = () => {

    return (
      <div>
        <div id="exitModal" className="modal fade in">
          <div className="modal-dialog">
            <div className="modal-content">
              <button type="button" className="btn close-modal icon-close" onClick={this.togglePushToTalkModal}>
                <span className="sr-only">close window</span>
              </button>
              <div className="row no-gutters">
                <div className="col-xs-12">
                  <h1 className="as-h2">Choose push-to-talk provider</h1>
                  <ul className="ptt-providers">
                    <li>
                      <NewTabLink to={this.linkStore.managePushToTalkKodiakLink}>
                        <label htmlFor="ATT_PTT">AT&T Enhanced Push-to-Talk</label>
                        <button type="button" id="ATT_PTT" className={this.linkStore.pushToTalkProvider === 'ATT' ? 'ptt-provider active' : 'ptt-provider'} onClick={this.setPushToTalkProvider.bind(this, 'ATT')}>
                          <img src="/images/attlogo.png" alt="AT&T logo" />
                        </button>
                      </NewTabLink>
                    </li>
                    <li>
                      <NewTabLink to={this.linkStore.managePushToTalkMotorolaLink}>
                        <label htmlFor="FN_PTT">FirstNet Enhanced Push-to-Talk</label>
                        <button type="button" id="FN_PTT" className={this.linkStore.pushToTalkProvider === 'FN' ? 'ptt-provider active' : 'ptt-provider'} onClick={this.setPushToTalkProvider.bind(this, 'FN')}>
                          <img src="/images/firstnetlogo.png" alt="FirstNet logo" />
                        </button>
                      </NewTabLink>
                    </li>
                  </ul>
                </div>
                <div className="col-xs-12 text-center ptt-modal-actions">
                  <Link to="/solutions/push-to-talk/push-to-talk">
                    <button className='fn-primary' onClick={this.goToPushToTalkLink}>Get Push-To-Talk</button>
                  </Link>
                  <button className='fn-secondary' onClick={this.togglePushToTalkModal}>Return to Dashboard</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade in"></div>
      </div>
    )
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
																<a id="pse-profile" href="/manage-profile">
																		<i className="icon-profile" aria-hidden="true" ></i>Lois Lane</a>
																<ul id="pse-profile-nav" className="collapse" aria-labelledby="pse-profile">
																		<li role="presentation">
																				<Link to="/manage-profile">Manage My Profile</Link>
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
																{/* hiding for demo and until tablet/mobile comps are updated */}
																{/* <button className="btnSubmenu"
																	data-toggle="collapse"
																	data-target="#pse-admin-nav"
																	aria-haspopup="true"
																	aria-expanded="false">
																		<span className="sr-only">Expand Section Navigation</span>
																</button> */}
																<NavLink id="linkBtn-admin" to="/admin" activeClassName="active">Administration</NavLink>
																<div className="header-submenu is-flex">
																<ul id="pse-admin-nav"
																	className="collapse"
																	aria-labelledby="linkBtn-admin">
																	<strong className="visible-md-block visible-lg-block">Manage</strong>
																	<li role="presentation">
																		<NewTabLink to={this.linkStore.manageUsersLink}><i className="icon-external-site" aria-hidden="true" />Manage Users</NewTabLink>
																	</li>
																	<li role="presentation">
																		<NavLink to="/admin/manage-apps">Manage Apps</NavLink>
																	</li>
																	<li role="presentation">
																		<NewTabLink to={this.linkStore.manageServicesLink}>
																		<i className="icon-external-site" aria-hidden="true" />Manage Services &amp; Billing</NewTabLink>
																	</li>
																	<li role="presentation">
																		<a href="#" onClick={this.togglePushToTalkModal}>
																		<i className="icon-external-site" aria-hidden="true" />Manage push-to-talk</a>
																	</li>
																	<li role="presentation">
																		<NewTabLink to={this.linkStore.viewWirelessReportsLink}>
																		<i className="icon-external-site" aria-hidden="true" />View wireless reports</NewTabLink>
																	</li>
																</ul>
																	<ul id="pse-aside-nav"
																		className="collapse"
																		aria-labelledby="linkBtn-admin">
																		<strong className="visible-md-block visible-lg-block">Shop</strong>
																	<li>
																		<NewTabLink to={this.linkStore.shopStandardDevicesLink}>
																		<i className="icon-external-site" aria-hidden="true" />Rate Plans &amp; Standard Devices</NewTabLink>
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
														<li id="hdr-network-status" className="mainnav-item desktop-textlink" role="presentation">
																<NavLink id="linkBtn-networkStatus" to="/network-status" activeClassName="active">Network Status</NavLink>
														</li>
														{/* following only appears in mobile */}
														<li className="mainnav-item grey" role="presentation">
																<NavLink activeClassName="active" to="/faq">FAQ</NavLink>
														</li>
														<li className="mainnav-item grey" role="presentation">
																<NavLink activeClassName="active" to="/feedback">Give Us FeedBack</NavLink>
														</li>
														<li className="mainnav-item grey" role="presentation">
																<a href="tel:800-600-8000">AT&T CUSTOMER SERVICE: <span>800-600-8000</span></a>
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
																	<NavLink to="/manage-profile" activeClassName="active">Manage My Profile</NavLink>
																</li>
																<li role="presentation">
																	<a href="#" onClick={this.onLogout}>
																		<i className="icon-logout" aria-hidden="true"></i>Log Out
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
																<i className="icon-help" aria-label="Go to Help Center"></i>
															</button>
															<ul id="pse-help-nav"
																role="menu"
																className="dropdown-menu dropdown-menu-right"
																aria-labelledby="help-header-dropdown">
																	<li role="presentation">
																			<NavLink to="/faq" activeClassName="active">FAQ</NavLink>
																	</li>
																	<li role="presentation">
																			<NavLink to="/feedback" activeClassName="active">Give Us Feedback</NavLink>
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
