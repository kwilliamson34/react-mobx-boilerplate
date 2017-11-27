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

  permissionedCard(isPermitted, linkTo, className, header, description, callToAction = header) {
    //check if we should use Link or NewTabLink
    let LinkType = linkTo[0] === '/' ? Link : NewTabLink;
    if(isPermitted){
      return (
        <li className="col-xs-12">
          <LinkType to={linkTo} className={`dashboard-card ${className} has-shadow`}>
            <div className="desc">
              <h3>{header}</h3>
              <p>{description}</p>
            </div>
            <span>{callToAction} <i className="icon-arrowRight" aria-hidden="true"></i></span>
          </LinkType>
        </li>
      )
    }
  }

  render() {
    const isPermitted = this.store.destinationIsPermitted;
    const hideAside = !(isPermitted.shopStandardDevices || isPermitted.shopSpecializedDevices || isPermitted.shopPublicSafetySolutions);
    return (
      <article id="admin-dashboard-page">
        <div className="container">
          <div className="col-xs-12">
            <PageTitle>Administration</PageTitle>
          </div>
          <div className="row no-gutters">
            <section className={`col-xs-12 ${hideAside ? 'hide-aside' : 'col-lg-8'} manage-actions`}>
              {!hideAside && <div className="col-xs-12">
                <h2 className="as-h4">Management</h2>
              </div>}
              <nav>
                <ul>
                  {this.permissionedCard(
                    isPermitted.manageUsers,
                    config.manageUsersLink,
                    'manage-users',
                    'Manage users',
                    'Add, edit and remove users'
                  )}
                  {this.permissionedCard(
                    isPermitted.manageApps,
                    '/admin/manage-apps',
                    'manage-apps',
                    'Manage apps',
                    'Push an app to your Mobile Device Management(MDM) solution, recommend apps, block apps',
                  )}
                  {this.permissionedCard(
                    isPermitted.manageBilling,
                    config.manageServicesLink,
                    'manage-services',
                    'Manage services & billing',
                    'Assign or remove devices, change rate plans &amp; features, view & pay bills, update information, manage push-to-talk'
                  )}
                  {this.permissionedCard(
                    isPermitted.manageIotDevices,
                    config.manageIotDevicesLink,
                    'manage-iot',
                    'Manage IoT devices',
                    'Manage the connectivity of your IoT devices'
                  )}
                  {this.permissionedCard(
                    isPermitted.manageVoicemail,
                    config.manageVoicemailAndUsageLink,
                    'manage-voicemail-and-usage',
                    'Manage voicemail &amp; usage',
                    'Manage voicemail and data usage for your devices'
                  )}
                  {this.permissionedCard(
                    isPermitted.viewReports,
                    config.viewWirelessReportsLink,
                    'manage-wireless-reports',
                    'View wireless reports',
                    'View device inventory, rate plan summary, early termination fees, upgrade eligibility, device unlock eligibility'
                  )}
                </ul>
              </nav>
            </section>
            {!hideAside && <aside className="col-xs-12 col-lg-4 shop-actions">
              <div className="col-xs-12">
                <h2 className="as-h4">Purchasing &amp; Provisioning</h2>
              </div>
              <nav>
                <ul>
                  {this.permissionedCard(
                    isPermitted.shopStandardDevices,
                    config.shopStandardDevicesLink,
                    'shop-devices-rates',
                    'Shop standard devices &amp; rate plans',
                    'Add a new device, provision an existing device, add a rate plan, feature(s) and accessories',
                    'Shop Devices &amp; Plans'
                  )}
                  {this.permissionedCard(
                    isPermitted.shopSpecializedDevices,
                    '/admin/devices',
                    'shop-specialized-devices',
                    'Shop specialized devices',
                    'Purchase ruggedized devices, vehicle routers, etc.'
                  )}
                  {this.permissionedCard(
                    isPermitted.shopPublicSafetySolutions,
                    '/admin/solutions',
                    'shop-solutions',
                    'Shop public safety solutions',
                    'Browse public safety solutions and choose which are best for your organization',
                  )}
                </ul>
              </nav>
            </aside>}
          </div>
        </div>
      </article>
    )
  }
}
