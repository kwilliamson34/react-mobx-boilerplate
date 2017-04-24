import React from 'react';
import {Link} from 'react-router-dom';
import {Grid, Row, Button} from 'react-bootstrap';

import UtilityNav from './utility-nav';
import PSESelector from '../pse-selector';

export default class PSEHeader extends React.Component {
		constructor(props) {
				super(props);
		}

		render() {
				return (
						<header className="fnnav pse" role="banner">
							<div className="pageMask hidden-md hidden-lg"></div>
								<UtilityNav/>
								<div className="fnnav__mainbar">

										<Grid >
												<Row>
														<div className="fnnav__header">
																<button type='button' className="navbar-toggle">
																		<span className='sr-only'>Toggle navigation</span>
																		<span className='icon-bar'></span>
																		<span className='icon-bar'></span>
																		<span className='icon-bar'></span>
																</button>
																<div className="fnnav__brand">
																		<Link to="/">
																				<img src="/images/logo-FirstNet-local-control.svg" alt="FirstNet Logo" />
																				<span className="sr-only">Go Home</span>
																		</Link>
																</div>
														</div>
														<nav id="main-menu" aria-label="Main Menu">
																<ul className='fnnav__main'>
																		<li className="mainnav-item blue" role="presentation">
																				<Button bsClass="btnSubmenu">
																						<span className="sr-only">Expand Section Navigation</span>
																				</Button>
																				<a id="pse-profile" href="#profile">
																						<i aria-hidden="true" className="icon-profile"></i>Lois Lane</a>
																				<ul aria-labelledby="pse-profile">
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
																										<i className="icon-logout" aria-hidden="true"></i>Log Out</Link>
																						</li>
																				</ul>
																		</li>
																		<li className="mainnav-item" role="presentation">
																				<Button bsClass="btnSubmenu">
																						<span className="sr-only">Expand Section Navigation</span>
																				</Button>
																				<Link to="/admin">Administration Dashboard</Link>
																				<ul aria-labelledby="pse-help-center">
																						<li role="presentation">
																								<Link to="/admin/manage-apps">Manage Apps</Link>
																						</li>
																				</ul>
																		</li>
																		<li className="mainnav-item" role="presentation">
																				<Button bsClass="btnSubmenu">
																						<span className="sr-only">Expand Section Navigation</span>
																				</Button>
																				<Link id="pse-help-center" to="/?help-center">Help Center</Link>
																				<ul aria-labelledby="pse-help-center">
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
														<div className="fnnav__weather">
																weather
														</div>
												</Row>

										</Grid>
								</div>
						</header>
				)
		}

}
