import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import {utilsService} from '../core/services/utils.service';

import {AppDetailBanner} from '../components/app-details/app-detail-banner';
import RatingsChart from '../components/ratings-chart/ratings-chart';
import AppReviews from '../components/app-reviews/app-reviews';
import ScreenshotGallery from '../components/screenshot-gallery/screenshot-gallery';
import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';
import Truncate from '../components/truncate/truncate';

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
  }

  componentWillMount() {
    if (this.userStore.user.pse === '') {
      utilsService.handlePendingAuthorizationsMapping();
    }else{
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

  updateCurrentApp() {
    const psk = this.props.match.params.appPsk;
    this.appStore.fetchAppDetailByPsk(psk);
  }

  formatDate(dateStr) {
    let dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    let parsedDate = new Date(dateStr);
    let formattedDate = parsedDate.toLocaleString('en-US', dateOptions);
    return formattedDate;
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
    return (
      <article id="app-details-page">
        <BreadcrumbNav links={crumbs}/>
        {(this.appStore.currentAppObject && this.appStore.currentAppObject.detailsFetched)
          ? <div>
              <AppDetailBanner data={this.appStore.currentAppObject} appCatalogStore={this.appStore}  mdmIsConfigured={this.mdmStore.pseMDMObject.toJS().mdm_type} pushToMDM={this.mdmStore.pushToMDM.bind(this.mdmStore)} appMDMStatus={this.mdmStore.appMDMStatus.toJS()}/>
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
                        <a href={'http://' + this.appStore.currentAppObject.custom_metadata.developer_website} className="fn-primary" target="_blank" rel="noopener noreferrer">
                          Visit Developer Website
                          <i className="icon-external-site" aria-hidden="true"></i>
                        </a>
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
