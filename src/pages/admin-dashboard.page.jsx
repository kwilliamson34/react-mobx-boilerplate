import React from 'react';
import {Link} from 'react-router-dom';
import NewTabLink from '../components/link/new-tab-link';

export default class AdminDashboardPage extends React.Component {
	constructor(props){
		super(props);
		this.showPushToTalkModal = this.showPushToTalkModal.bind(this);
	}

	showPushToTalkModal() {
		//TODO launch the modal to choose push-to-talk provider
	}

	render() {
		return (
			<article id="admin-dashboard-page">
					<div className="container">
						<div className="col-xs-12">
							<h1 className="as-h2">Administration</h1>
						</div>
						<div className="row no-gutters">
							<section className="col-xs-12 col-lg-8 manage-actions">
								<div className="col-xs-12">
									<h2 className="as-h4">Manage</h2>
								</div>
								<nav>
									<ul>
										<li className="col-xs-12 col-sm-6">
											<NewTabLink to="https://profilemgt.firstnet.att.com/ebiz/firstnet/index.jsp" className="dashboard-card manage-users has-shadow">
												<div className="desc">
													<h3>Manage users</h3>
													<p>Add, edit and remove users.</p>
												</div>
												<span>Manage Users</span>
											</NewTabLink>
										</li>
										<li className="col-xs-12 col-sm-6">
											<NewTabLink to="TODO" className="dashboard-card manage-billing has-shadow">
												<div className="desc">
													<h3>Manage billing</h3>
													<p>View &amp; pay bills, update info</p>
												</div>
												<span>Manage Billing</span>
											</NewTabLink>
										</li>
										<li  className="col-xs-12 col-sm-6">
											<NewTabLink to="https://wireless.firstnet.att.com/b2bservlets/HaloSSOLoginServlet.dyn" className="dashboard-card manage-services has-shadow">
												<div className="desc">
													<h3>Manage services</h3>
													<p>Assign or remove device, change rate plans &amp; features</p>
												</div>
												<span>Manage Services</span>
											</NewTabLink>
										</li>
										<li className="col-xs-12 col-sm-6">
											<Link to="/admin/manage-apps" className="dashboard-card manage-apps has-shadow">
												<div className="desc">
													<h3>Manage apps</h3>
													<p>Push an app to your Mobile Device Management(MDM) solution, recommend apps, block apps</p>
												</div>
												<span>Manage apps</span>
											</Link>
										</li>
										<li className="col-xs-12 col-sm-6">
											<button className="dashboard-card manage-push-talk has-shadow as-link" onClick={this.showPushToTalkModal}>
												<div className="desc">
													<h3>Manage push-to-talk</h3>
													<p>Create and remove talk groups, add and remove users from talk groups</p>
												</div>
												<span>Manage Push-to-Talk</span>
											</button>
										</li>
										<li className="col-xs-12 col-sm-6">
											<NewTabLink to="https://www.wireless.att.com/businesscare/menu/index.jsp?subject=Reports&wtLinkName=Reports&wtLinkLoc=S1&&wtLinkType=InventoryReport" className="dashboard-card manage-wireless-reports has-shadow">
												<div className="desc">
													<h3>View wireless reports</h3>
													<p>View device inventory, rate plan summary, early termination fees, upgrade eligibility, device unlock eligibility</p>
												</div>
												<span>View Wireless Reports</span>
											</NewTabLink>
										</li>
									</ul>
								</nav>
						</section>
						<aside className="col-xs-12 col-lg-4 shop-actions">
							<div className="col-xs-12">
								<h2 className="as-h4">Shop</h2>
							</div>
							<nav>
								<ul>
									<li className="col-xs-12 col-md-6 col-lg-12">
										<NewTabLink to="TODO" className="dashboard-card shop-devices-rates has-shadow">
											<div className="desc">
												<h3>Shop standard devices &amp; rate plans</h3>
												<p>Add a new device, provision an existing device, add a rate plan, feature(s) and accessories</p>
											</div>
											<span>Shop Devices &amp; Plans</span>
										</NewTabLink>
									</li>
									<li className="col-xs-12 col-md-6 col-lg-12">
										<Link to="/shop-specialized-devices" className="dashboard-card shop-specialized-devices has-shadow">
											<div className="desc">
												<h3>Shop specialized devices</h3>
												<p>Purchase ruggedized devices, vehicle routers, etc.</p>
											</div>
											<span>Shop Specialized</span>
										</Link>
									</li>
									<li className="col-xs-12 col-md-6 col-lg-12">
										<Link to="/shop-solutions" className="dashboard-card shop-solutions has-shadow">
											<div className="desc">
												<h3>Shop public safety solutions</h3>
												<p>Browse public safety solutions and choose which are best for your organization</p>
											</div>
											<span>Shop Solutions</span>
										</Link>
									</li>
								</ul>
							</nav>
						</aside>
					</div>
				</div>
		</article>
		)
	}
}
