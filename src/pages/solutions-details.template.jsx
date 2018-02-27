import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import {Link} from 'react-router-dom';

import {history} from '../core/services/history.service';
import PageTitle from '../components/page-title/page-title';
import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';
import PurchasingInfo from '../components/purchasing-info/purchasing-info';
import {AppDetailBanner} from '../components/app-details/app-detail-banner';
import Alerts from '../components/alerts/alerts';

@inject('store')
@observer
export default class SolutionsDetailsTemplate extends React.Component {

  static propTypes = {
    store: PropTypes.object,
    match: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.externalLinkStore = this.props.store.externalLinkStore;
    this.appCatalogStore = this.props.store.appCatalogStore;
    this.leadCaptureStore = this.props.store.leadCaptureStore;
  }

  componentWillMount() {
    this.externalLinkStore.fetchMarketingPortalData();

    const solutionName = decodeURIComponent(this.props.match.params.solutionDetail);
    this.externalLinkStore.setCurrentSolution(solutionName);
    this.leadCaptureStore.setCurrentSolution(solutionName);
  }

  componentWillUnmount() {
    this.leadCaptureStore.updateSuccess('');
  }

  handleLeadCaptureOnClick = (event) => {
    if (this.leadCaptureStore.solutionAlreadyRequested) {
      event.preventDefault();
    } else {
      const leadCaptureHref = `/admin/solutions/${this.props.match.params.solutionCategory}/${this.props.match.params.solutionDetail}/request-info`;
      history.push(leadCaptureHref);
    }
  }

  render() {
    const solutionCategoryTitle = this.props.match.params.solutionCategory.replace(/-/g, ' ');
    const solutionDetailTitle = decodeURIComponent(this.props.match.params.solutionDetail);

    const solutionDetail = this.externalLinkStore.currentSolutionDetail || {};
    const purchasingInfo = this.externalLinkStore.currentSolutionPurchasingInfo;

    const crumbs = [
      {
        pageHref: '/admin',
        pageTitle: 'Administration Dashboard'
      }, {
        pageHref: '/admin/solutions',
        pageTitle: 'Public Safety Solutions'
      }, {
        pageHref: `/admin/solutions/${this.props.match.params.solutionCategory}`,
        pageTitle: solutionCategoryTitle
      }, {
        pageHref: `/${this.props.match.url}`,
        pageTitle: solutionDetailTitle
      }
    ];

    return (
      <article id="solutions-details-page" className="solutions-details-page">
        <BreadcrumbNav links={crumbs}/>
        <div className="container">

          <div className="row">
            <section className="details-wrapper col-lg-offset-1 col-lg-10">
              <div className="content-wrapper">
                <PageTitle className="sr-only">{solutionDetailTitle}</PageTitle>
                <div dangerouslySetInnerHTML={{
                  __html: solutionDetail.body
                }}></div>
              </div>
            </section>
          </div>

          {this.renderLeadCaptureSection()}

          {purchasingInfo &&
            <div className="row">
              <section className="col-xs-12 col-lg-offset-1 col-lg-10">
                <PurchasingInfo contactInfo={purchasingInfo}/>
              </section>
            </div>}

          {this.externalLinkStore.hasValidRelatedApp(solutionDetail) && this.appCatalogStore.currentAppObject.detailsFetched &&
            <div className="row">
              <section className="col-xs-12 col-lg-offset-1 col-lg-10 app-details-section">
                <h2>Related App</h2>
                <hr />
                <AppDetailBanner
                  pskToRender={this.externalLinkStore.currentSolutionDetail.related_app_psk}
                  actionBlock="link_to_details"
                  appCatalogStore={this.appCatalogStore}
                  suppressFetchFailure={true}/>
              </section>
            </div>}

        </div>
      </article>
    )
  }

  renderLeadCaptureSection = () => {
    const solutionDetailTitle = decodeURIComponent(this.props.match.params.solutionDetail);
    const showSuccess = this.leadCaptureStore.successToDisplay && this.leadCaptureStore.successToDisplay.length > 0;
    return (
      <div className="row">
        <section className="col-xs-12 col-lg-offset-1 col-lg-10 learn-more-section">
          <h2>Learn More</h2>
          <hr/>
          {showSuccess
            ? <Alerts
                showSuccess={true}
                successText={this.leadCaptureStore.successToDisplay}
                clearSuccess={() => {this.leadCaptureStore.updateSuccess('')}} />
            : <div>
                <span className="solution-name" dangerouslySetInnerHTML={{
                  __html: solutionDetailTitle
                }}></span>
              <button onClick={this.handleLeadCaptureOnClick} aria-label={this.leadCaptureStore.solutionAlreadyRequested ? 'Request Information form already submitted' : ''} aria-disabled={this.leadCaptureStore.solutionAlreadyRequested} className="fn-primary">
                    Request Information
                </button>
              </div>}
        </section>
      </div>
    )
  }
}
