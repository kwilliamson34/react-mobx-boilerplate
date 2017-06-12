import React from 'react';
import {Link} from 'react-router-dom';
import NewTabLink from '../components/link/new-tab-link';
import {observer, inject} from 'mobx-react';
import PropTypes from 'prop-types';

@inject('store')
@observer
export default class AdminDashboardPage extends React.Component {

  static propTypes = {
    store: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.linkStore = this.props.store.externalLinkStore;
  }

  togglePushToTalkModal = (event) => {
    event.preventDefault();
    this.linkStore.togglePushToTalkModal();
  }

  setPushToTalkProvider = (provider) => {
    this.linkStore.setPushToTalkProvider(provider);
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
                  <li className="col-xs-12">
                    <NewTabLink to={this.linkStore.manageUsersLink} className="dashboard-card manage-users has-shadow">
                      <div className="desc">
                        <h3>Manage users</h3>
                        <p>Add, edit and remove users</p>
                      </div>
                      <span>Manage Users <i className="icon-arrowRight" aria-hidden="true"></i></span>
                    </NewTabLink>
                  </li>
                  <li className="col-xs-12 col-sm-6">
                    <NewTabLink to={this.linkStore.manageServicesLink} className="dashboard-card manage-services has-shadow">
                      <div className="desc">
                        <h3>Manage services & billing</h3>
                        <p>Assign or remove device, change rate plans &amp; features, view & pay bills, update info</p>
                      </div>
                      <span>Manage services & billing <i className="icon-arrowRight" aria-hidden="true"></i></span>
                    </NewTabLink>
                  </li>
                  <li className="col-xs-12 col-sm-6">
                    <Link to="/admin/manage-apps" className="dashboard-card manage-apps has-shadow">
                      <div className="desc">
                        <h3>Manage apps</h3>
                        <p>Push an app to your Mobile Device Management(MDM) solution, recommend apps, block apps</p>
                      </div>
                      <span>Manage apps <i className="icon-arrowRight" aria-hidden="true"></i></span>
                    </Link>
                  </li>
                  <li className="col-xs-12 col-sm-6">
                    <button className="dashboard-card manage-push-talk has-shadow as-link" onClick={this.togglePushToTalkModal}>
                      <div className="desc">
                        <h3>Manage push-to-talk</h3>
                        <p>Create and remove talk groups, add and remove users from talk groups</p>
                      </div>
                      <span>Manage Push-to-Talk <i className="icon-arrowRight" aria-hidden="true"></i></span>
                    </button>
                  </li>
                  <li className="col-xs-12 col-sm-6">
                    <NewTabLink to={this.linkStore.viewWirelessReportsLink} className="dashboard-card manage-wireless-reports has-shadow">
                      <div className="desc">
                        <h3>View wireless reports</h3>
                        <p>View device inventory, rate plan summary, early termination fees, upgrade eligibility, device unlock eligibility</p>
                      </div>
                      <span>View Wireless Reports <i className="icon-arrowRight" aria-hidden="true"></i></span>
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
                    <NewTabLink to={this.linkStore.shopStandardDevicesLink} className="dashboard-card shop-devices-rates has-shadow">
                      <div className="desc">
                        <h3>Shop standard devices &amp; rate plans</h3>
                        <p>Add a new device, provision an existing device, add a rate plan, feature(s) and accessories</p>
                      </div>
                      <span>Shop Devices &amp; Plans <i className="icon-arrowRight" aria-hidden="true"></i></span>
                    </NewTabLink>
                  </li>
                  <li className="col-xs-12 col-md-6 col-lg-12">
                    <Link to="/devices" className="dashboard-card shop-specialized-devices has-shadow">
                      <div className="desc">
                        <h3>Shop specialized devices</h3>
                        <p>Purchase ruggedized devices, vehicle routers, etc.</p>
                      </div>
                      <span>Shop Specialized <i className="icon-arrowRight" aria-hidden="true"></i></span>
                    </Link>
                  </li>
                  <li className="col-xs-12 col-md-6 col-lg-12">
                    <Link to="/solutions" className="dashboard-card shop-solutions has-shadow">
                      <div className="desc">
                        <h3>Shop public safety solutions</h3>
                        <p>Browse public safety solutions and choose which are best for your organization</p>
                      </div>
                      <span>Shop Solutions <i className="icon-arrowRight" aria-hidden="true"></i></span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </aside>
          </div>
        </div>

        {this.linkStore.showPushToTalkModal && this.renderPushToTalkModal()}
      </article>
    )
  }
}
