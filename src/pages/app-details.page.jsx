import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import {utilsService} from '../core/services/utils.service';

import PageTitle from '../components/page-title/page-title';
import {AppDetailBanner} from '../components/app-details/app-detail-banner';
import AppReviews from '../components/app-reviews/app-reviews';
import ScreenshotGallery from '../components/screenshot-gallery/screenshot-gallery';
import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';
import Alerts from '../components/alerts/alerts';
import {Truncate, RatingsChart} from 'fn-common-ui';
import {NewTabLink} from 'fn-common-ui';

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
    } else {
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
    this.appStore.fetchAppDetailByPsk({psk: this.props.match.params.appPsk});
  }

  renderScreenshotGallery = (currentAppObject) => {
    if(currentAppObject.tabletScreenshots.length > 0 || currentAppObject.mobileScreenshots.length > 0) {
      return (
        <section className="app-gallery">
          <ScreenshotGallery detailObj={currentAppObject}/>
        </section>
      )
    }
    return '';
  }

  renderDescription = (currentAppObject) => {
    return (
      <div>
        <h2 id="app-details-description">Description</h2>
        <Truncate charLimit={550}>
          {currentAppObject.long_description}
        </Truncate>
      </div>
    )
  }

  renderWhatsNewSection = (versionObj) => {
    return (
      <section className="whats-new">
        <h2 id="app-details-whats-new" className="whats-new-title">What&apos;s New</h2>
        <div className="whats-new-date">{utilsService.normalizedDate(versionObj.release_date, 'MMMM D, YYYY')}</div>
        <Truncate charLimit={500}>
          {versionObj.version_note || ''}
        </Truncate>
      </section>
    )
  }

  renderReviewsSection = (currentAppObject) => {
    return (
      <section className="app-ratings walkthrough-app-ratings">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10">
              <h2>Reviews</h2>
              <RatingsChart value={currentAppObject.rating} reviewsTotal={currentAppObject.reviews_count} reviews={currentAppObject.reviews}/>
              {currentAppObject.reviews.length > 0 && <AppReviews reviews={currentAppObject.reviews}/>}
            </div>
          </div>
        </div>
      </section>
    )
  }

  renderDeveloperSection = (custom_metadata) => {
    const rawDeveloperWebsite = custom_metadata.developer_website.trim();
    const cleanDeveloperWebsite = rawDeveloperWebsite.indexOf('http') > -1
      ? rawDeveloperWebsite
      : 'http://' + rawDeveloperWebsite;
    return (
      <section className="app-developer">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10">
              <h2>About this Developer</h2>
              <p className="dev-description" dangerouslySetInnerHTML={{
                __html: custom_metadata.developer_description
              }}></p>
              <div className="developer-website">
                <NewTabLink to={cleanDeveloperWebsite} className="fn-secondary" showIcon={true}>
                  Visit Developer Website
                </NewTabLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
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
        <div className="app-details-alerts">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <PageTitle className="sr-only">App Details</PageTitle>
                <Alerts
                  showAlert={this.mdmStore.showAlertOnAppDetails}
                  alertText="This app could not be pushed to MDM."
                  clearAlert={this.mdmStore.clearAlertAndReferences.bind(this.mdmStore)}
                  showSuccess={this.mdmStore.showSuccessOnAppDetails}
                  successText="This app has been pushed to MDM."
                  clearSuccess={this.mdmStore.clearSuccess.bind(this.mdmStore)}/>
              </div>
            </div>
          </div>
        </div>
        {(this.appStore.currentAppObject && this.appStore.currentAppObject.detailsFetched)
          ? <div>
              <AppDetailBanner
                pskToRender={this.appStore.currentAppObject.app_psk}
                actionBlock="app_managment_block"
                isWithinCard={true}
                containsPrimaryHeader={true}
                appCatalogStore={this.appStore}
                configuredMDMType={this.mdmStore.values.mdm_type}
                pushToMDM={this.mdmStore.pushToMDM.bind(this.mdmStore)}
                appCatalogMDMStatuses={this.mdmStore.appCatalogMDMStatuses.toJS()}/>
              <div className="app-description-block walkthrough-app-details">
                {this.renderScreenshotGallery(this.appStore.currentAppObject)}
                <section className="app-description">
                  <div className="container">
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10">
                        {this.renderDescription(this.appStore.currentAppObject)}
                        {this.appStore.currentAppObject.version && this.renderWhatsNewSection(this.appStore.currentAppObject.version)}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              {this.renderReviewsSection(this.appStore.currentAppObject)}
              {this.renderDeveloperSection(this.appStore.currentAppObject.custom_metadata)}
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
