import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {observer, inject} from 'mobx-react';
import NewTabLink from '../components/link/new-tab-link';
import config from 'config';
import PageTitle from '../components/page-title/page-title';

@inject('store')
@observer
export default class AdminDashboardPage extends React.Component {

  static propTypes = {
    store: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.store = this.props.store.userStore;
  }

  render() {
    return (
      <article id="admin-dashboard-page">
        <div className="container">
          <div className="col-xs-12">
            <PageTitle>Administration</PageTitle>
          </div>
          <div className="row no-gutters">
            <section className="col-xs-12 col-lg-8 manage-actions">
              <div className="col-xs-12">
                <h2 className="as-h4">Management</h2>
              </div>
              <nav>
                <ul>
                  {this.store.destinationIsPermitted.manageUsers && <li className="col-xs-12">
                    <NewTabLink to={config.manageUsersLink} className="dashboard-card manage-users has-shadow">
                      <div className="desc">
                        <h3>Manage users</h3>
                        <p>Add, edit and remove users</p>
                      </div>
                      <span>Manage Users <i className="icon-arrowRight" aria-hidden="true"></i></span>
                    </NewTabLink>
                  </li>}
                  {this.store.destinationIsPermitted.manageApps &&   <li className="col-xs-12 col-sm-6">
                    <Link to="/admin/manage-apps" className="dashboard-card manage-apps has-shadow">
                      <div className="desc">
                        <h3>Manage apps</h3>
                        <p>Push an app to your Mobile Device Management(MDM) solution, recommend apps, block apps</p>
                      </div>
                      <span>Manage apps <i className="icon-arrowRight" aria-hidden="true"></i></span>
                    </Link>
                  </li>}
                  <li className="col-xs-12 col-sm-6">
                    <NewTabLink to={config.manageServicesLink} className="dashboard-card manage-services has-shadow">
                      <div className="desc">
                        <h3>Manage services & billing</h3>
                        <p>Assign or remove devices, change rate plans &amp; features, view & pay bills, update information, manage push-to-talk</p>
                      </div>
                      <span>Manage services & billing <i className="icon-arrowRight" aria-hidden="true"></i></span>
                    </NewTabLink>
                  </li>
                  {this.store.destinationIsPermitted.manageVoicemail && <li className="col-xs-12 col-sm-6">
                    <NewTabLink to={config.manageVoicemailAndUsageLink} className="dashboard-card manage-voicemail-and-usage has-shadow">
                      <div className="desc">
                        <h3>Manage voicemail &amp; usage</h3>
                        <p>This is a TEMPORARY description of how folks can take advantage of managing voicemail and usage.</p>
                      </div>
                      <span>Manage voicemail &amp; usage <i className="icon-arrowRight" aria-hidden="true"></i></span>
                    </NewTabLink>
                  </li>}
                  {this.store.destinationIsPermitted.viewReports && <li className="col-xs-12 col-sm-6">
                    <NewTabLink to={config.viewWirelessReportsLink} className="dashboard-card manage-wireless-reports has-shadow">
                      <div className="desc">
                        <h3>View wireless reports</h3>
                        <p>View device inventory, rate plan summary, early termination fees, upgrade eligibility, device unlock eligibility</p>
                      </div>
                      <span>View Wireless Reports <i className="icon-arrowRight" aria-hidden="true"></i></span>
                    </NewTabLink>
                  </li>}
                </ul>
              </nav>
            </section>
            <aside className="col-xs-12 col-lg-4 shop-actions">
              <div className="col-xs-12">
                <h2 className="as-h4">Purchasing &amp; Provisioning</h2>
              </div>
              <nav>
                <ul>
                  {this.store.destinationIsPermitted.shopStandardDevices && <li className="col-xs-12 col-md-6 col-lg-12">
                    <NewTabLink to={config.shopStandardDevicesLink} className="dashboard-card shop-devices-rates has-shadow">
                      <div className="desc">
                        <h3>Shop standard devices &amp; rate plans</h3>
                        <p>Add a new device, provision an existing device, add a rate plan, feature(s) and accessories</p>
                      </div>
                      <span>Shop Devices &amp; Plans <i className="icon-arrowRight" aria-hidden="true"></i></span>
                    </NewTabLink>
                  </li>}
                  {this.store.destinationIsPermitted.shopSpecializedDevices && <li className="col-xs-12 col-md-6 col-lg-12">
                    <Link to="/admin/devices" className="dashboard-card shop-specialized-devices has-shadow">
                      <div className="desc">
                        <h3>Shop specialized devices</h3>
                        <p>Purchase ruggedized devices, vehicle routers, etc.</p>
                      </div>
                      <span>Shop Specialized Devices<i className="icon-arrowRight" aria-hidden="true"></i></span>
                    </Link>
                  </li>}
                  {this.store.destinationIsPermitted.shopPublicSafetySolutions && <li className="col-xs-12 col-md-6 col-lg-12">
                    <Link to="/admin/solutions" className="dashboard-card shop-solutions has-shadow">
                      <div className="desc">
                        <h3>Shop public safety solutions</h3>
                        <p>Browse public safety solutions and choose which are best for your organization</p>
                      </div>
                      <span>Shop Public Safety Solutions <i className="icon-arrowRight" aria-hidden="true"></i></span>
                    </Link>
                  </li>}
                </ul>
              </nav>
            </aside>
          </div>
        </div>
      </article>
    )
  }
}
