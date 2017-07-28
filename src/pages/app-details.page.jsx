import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import {utilsService} from '../core/services/utils.service';
import moment from 'moment'

import {AppDetailBanner} from '../components/app-details/app-detail-banner';
import RatingsChart from '../components/ratings-chart/ratings-chart';
import AppReviews from '../components/app-reviews/app-reviews';
import ScreenshotGallery from '../components/screenshot-gallery/screenshot-gallery';
import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';
import {MDMAlerts} from '../components/configure-mdm/mdm-alerts';
import Truncate from '../components/truncate/truncate';
import NewTabLink from '../components/link/new-tab-link';
import $ from 'jquery';

@inject('store')
@observer
export default class AppDetailsPage extends React.Component {

  static propTypes = {
    store: PropTypes.object,
    match: PropTypes.object,
    currentAppObject: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.appStore = this.props.store.appCatalogStore;
    this.mdmStore = this.props.store.mdmStore;
    this.userStore = this.props.store.userStore;
    this.viewedAlert = false;
  }

  componentWillMount() {
    if (this.userStore.user.pse === '') {
      utilsService.handlePendingAuthorizationsMapping();
    } else {
      this.mdmStore.clearAlerts();
      this.mdmStore.getMDMConfiguration();
      if (this.appStore.allApps.length) {
        this.updateCurrentApp();
      } else {
        this.appStore.fetchAppCatalog().then(() => {
          this.updateCurrentApp();
        });
      }
    }
  }

  componentWillUnmount() {
    this.mdmStore.clearAlerts();
  }

  updateCurrentApp() {
    const psk = this.props.match.params.appPsk;
    this.appStore.fetchAppDetailByPsk(psk);
  }

  render() {
    const crumbs = [
      {
        pageHref: '/admin',
        pageTitle: 'Administration Dashboard'
      }, {
        pageHref: '/admin/manage-apps',
        pageTitle: 'Manage Apps'
      }, {
        pageHref: '/app/' + (this.appStore.currentAppObject
          ? this.appStore.currentAppObject.app_psk
          : ''),
        pageTitle: this.appStore.currentAppObject
          ? this.appStore.currentAppObject.app_name
          : ''
      }
    ];

    if (this.mdmStore.app_alerts.length !== 0 && !this.viewedAlert) {
      setTimeout(() => {
        $('#mdm-alerts').focus();
        this.viewedAlert = true;
      }, 100);
    }
    return (
      <article id="app-details-page">
        <BreadcrumbNav links={crumbs}/>
        {this.mdmStore.app_alerts.length !== 0 &&
          <div className=" app-details-alerts">
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                    <MDMAlerts store={this.mdmStore} page="manage_apps" clearSelectedCards={this.mdmStore.clearAppsReferencedByAlert}/>
                </div>
              </div>
            </div>
          </div>
        }
        {(this.appStore.currentAppObject && this.appStore.currentAppObject.detailsFetched)
          ? <div>
              <AppDetailBanner data={this.appStore.currentAppObject} appCatalogStore={this.appStore}  configuredMDMType={this.mdmStore.pseMDMObject.toJS().mdm_type} pushToMDM={this.mdmStore.pushToMDM.bind(this.mdmStore)} appCatalogMDMStatuses={this.mdmStore.appCatalogMDMStatuses.toJS()}/>
              {(this.appStore.currentAppObject.tabletScreenshots.length > 0 || this.appStore.currentAppObject.mobileScreenshots.length > 0) &&
                <section className='app-gallery'>
                  <ScreenshotGallery detailObj={this.appStore.currentAppObject}/>
                </section>
              }
              <section className="app-description">
                <div className="container">
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10">
                      <h2 id="app-details-description">Description</h2>
                      <Truncate className="truncate-container" returnToId="app-details-description" charLimit={550}>
                        {this.appStore.currentAppObject.long_description}
                      </Truncate>
                      {this.appStore.currentAppObject.version.version_note.length &&
                      <div>
                        <h2 id="app-details-whats-new">What's New</h2>
                        <div>{moment(this.appStore.currentAppObject.version.release_date).format('MMMM DD, YYYY')}</div>
                        <Truncate className="truncate-container" returnToId="app-details-whats-new" charLimit={500}>
                          {this.appStore.currentAppObject.version.version_note}
                        </Truncate>
                      </div>
                      }
                    </div>
                  </div>
                </div>
              </section>
              <section className="app-ratings">
                <div className="container">
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10">
                      <h2>Reviews</h2>
                      <RatingsChart
                        value={this.appStore.currentAppObject.rating}
                        reviewsTotal={this.appStore.currentAppObject.reviews_count}
                        reviews={this.appStore.currentAppObject.reviews}/>
                      {this.appStore.currentAppObject.reviews.length > 0 &&
                        <AppReviews reviews={this.appStore.currentAppObject.reviews}/>}
                    </div>
                  </div>
                </div>
              </section>
              <section className="app-developer">
                <div className="container">
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10">
                      <h2>About the Developer</h2>
                      <p className="dev-description" dangerouslySetInnerHTML={{
                        __html: this.appStore.currentAppObject.custom_metadata.developer_description
                      }}></p>
                      <div className="developer-website">
                        <NewTabLink to={'http://' + this.appStore.currentAppObject.custom_metadata.developer_website} className="fn-primary" showIcon={true}>
                          Visit Developer Website
                        </NewTabLink>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          : <div className="container loading-container">
            <div className="row">
              <div className="col-xs-12">
                <p className="as-h2" aria-live="polite">
                  <i className="as-h2 icon-reload" aria-hidden="true"></i>
                  Loading app&hellip;
                </p>
              </div>
            </div>
          </div>
        }
      </article>
    )
  }
}
