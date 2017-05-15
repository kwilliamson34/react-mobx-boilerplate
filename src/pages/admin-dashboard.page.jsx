import React from 'react';

import {
	Link
} from 'react-router-dom';


export default class AdminDashboardPage extends React.Component {
	render() {
		return (
			<article id="admin-dashboard-page">
        <div className="container">
          <div className="col-xs-12">
						<h1>Administration</h1>
          </div>
					<div className="row no-gutters">
          <section className="col-xs-12 col-md-8 manage-actions">
            <div className="col-xs-12">
							<h2 className="as-h4">Manage</h2>
						</div>
            <nav>
              <ul>
                <li className="col-xs-12 col-sm-6">
                  <Link to="/admin/manage-users" className="dashboard-card has-shadow">
                    <div className="desc">
											<h3>Manage users</h3>
											<p>Add, edit and remove users.</p>
										</div>
										<span>Manage Users</span>
                  </Link>
                </li>
                <li className="col-xs-12 col-sm-6">
                  <Link to="/admin/manage-billing" className="dashboard-card has-shadow">
                    <div className="desc">
											<h3>Manage billing</h3>
											<p>View &amp; pay bills, update info</p>
										</div>
                    <span>Manage Billing</span>
                  </Link>
                </li>
                <li  className="col-xs-12 col-sm-6">
                  <Link to="/admin/manage-services" className="dashboard-card has-shadow">
                    <div className="desc">
											<h3>Manage services</h3>
											<p>Assign or remove device, change rate plans &amp features</p>
										</div>
                    <span>Manage Services</span>
                  </Link>
                </li>
                <li className="col-xs-12 col-sm-6">
                  <Link to="/admin/manage-apps" className="dashboard-card has-shadow">
                    <div className="desc">
											<h3>Manage apps</h3>
											<p>Push an app to your Mobile Device Management(MDM) solution, recommend apps, block apps</p>
										</div>
                    <span>Manage apps</span>
                  </Link>
                </li>
                <li className="col-xs-12 col-sm-6">
                  <Link to="/admin/manage-push-talk" className="dashboard-card has-shadow">
                    <div className="desc">
											<h3>Manage push-to-talk</h3>
											<p>Create and remove talk groups, add and remove users from talk groups</p>
										</div>
                    <span>Manage Push-to-Talk</span>
                  </Link>
                </li>
                <li className="col-xs-12 col-sm-6">
                  <Link to="/admin/view-wireless-reports" className="dashboard-card has-shadow">
                    <div className="desc">
											<h3>View wireless reports</h3>
											<p>View device inventory, rate plan summary, early termination fees, upgrade eligibility, device unlock eligibility</p>
										</div>
                    <span>View Wireless Reports</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </section>
          <aside className="col-xs-12 col-md-4 shop-actions">
            <div className="col-xs-12"><h2 className="as-h4">Shop</h2></div>
            <nav>
              <ul>
                <li className="col-xs-12 col-sm-6 col-md-12">
                  <Link to="/shop-devices" className="dashboard-card has-shadow">
                      <div className="desc">
												<h3>Shop standard devices &amp; rate plans</h3>
												<p>Add a new device, provision an existing device, add a rate plan, feature(s) and accessories</p>
											</div>
                    <span>Shop Devices &amp; Plans</span>
                  </Link>
                </li>
                <li  className="col-xs-12 col-sm-6 col-md-12">
                  <Link to="/shop-specialized" className="dashboard-card has-shadow">
                    <div className="desc">
											<h3>Shop specialized devices</h3>
											<p>Purchase reggedized devices, vehicle routers, etc.</p>
										</div>
                    <span>Shop Specialized</span>
                  </Link>
                </li>
                <li  className="col-xs-12 col-sm-6 col-md-12">
                  <Link to="/shop-solutions" className="dashboard-card has-shadow">
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
