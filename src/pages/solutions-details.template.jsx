import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import {Link} from 'react-router-dom';

import PageTitle from '../components/page-title/page-title';
import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';
import PurchasingInfo from '../components/purchasing-info/purchasing-info';
import {AppDetailBanner} from '../components/app-details/app-detail-banner';

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
    this.leadCaptureStore.hideSuccess();
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
                <PageTitle className="sr-only">Solution Details</PageTitle>
                <div dangerouslySetInnerHTML={{
                  __html: solutionDetail.body
                }}></div>
              </div>
            </section>
          </div>

          {this.renderLeadCaptureSection()}

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
                <hr />
              </section>
            </div>}

          {purchasingInfo &&
            <div className="row">
              <section className="col-xs-12 col-lg-offset-1 col-lg-10">
                <PurchasingInfo contactInfo={purchasingInfo}/>
              </section>
            </div>}

        </div>
      </article>
    )
  }

  renderLeadCaptureSection = () => {
    const solutionDetailTitle = decodeURIComponent(this.props.match.params.solutionDetail);
    const leadCaptureHref = `/admin/solutions/${this.props.match.params.solutionCategory}/${this.props.match.params.solutionDetail}/request-info`;

    return (
      <div className="row">
        <section className="col-xs-12 col-lg-offset-1 col-lg-10 learn-more-section">
          <h2>Learn More</h2>
          <hr/>
          {this.leadCaptureStore.showSuccess
            ? <div className="alert alert-success">
                <button type="button" className="close_btn icon-close" onClick={this.leadCaptureStore.hideSuccess.bind(this.leadCaptureStore)}>
                  <span className="sr-only">Close alert</span>
                </button>
                <p role="alert" aria-live="assertive">
                  <strong>Success!&nbsp;</strong>Your request has been received. A specialist will be contacting you soon.
                </p>
              </div>
            : <div>
              <span className="solution-name" dangerouslySetInnerHTML={{
                __html: solutionDetailTitle
              }}></span>
              <Link to={leadCaptureHref} className={`btn fn-primary ${this.leadCaptureStore.solutionAlreadyRequested
                ? 'disabled'
                : ''}`}>
                Request Information
              </Link>
            </div>}
        </section>
      </div>
    )
  }
}
