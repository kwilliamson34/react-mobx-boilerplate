import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';

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
  }

  componentWillMount() {
    // checking if the user was on this page previously, eliminating need for new request
    if (this.props.match.params.solutionDetail != this.externalLinkStore.currentSolutionDetail.path) {
      let solutionPath = this.props.match.params.solutionDetail;
      this.externalLinkStore.resetSolutionDetail();
      if (this.externalLinkStore.allSolutionDetails.length) {
        this.fetchSolutionDetails(solutionPath);
      } else {
        this.externalLinkStore.getSolutionDetails().then(() => {
          this.fetchSolutionDetails(solutionPath);
        });
      }
    }
  }

  fetchSolutionDetails(solutionPath) {
    this.externalLinkStore.fetchSolutionDetails({solutionPath, setAsCurrent: true});

    const solutionDetail = this.externalLinkStore.currentSolutionDetail;
    if(this.externalLinkStore.hasValidRelatedApp(solutionDetail)) {
      this.appCatalogStore.setCurrentApp(solutionDetail.related_app_psk);
      if(!this.appCatalogStore.currentAppObject || !this.appCatalogStore.currentAppObject.detailsFetched) {
        this.appCatalogStore.fetchAppDetailByPsk(solutionDetail.related_app_psk);
      }
    }
  }

  render() {
    const solutionCategoryTitle = this.props.match.params.solutionCategory.replace(/-/g, ' ');
    const solutionDetailTitle = this.props.match.params.solutionDetail.replace(/\+/g, ' ');
    const solutionDetail = this.externalLinkStore.currentSolutionDetail;
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
                <div dangerouslySetInnerHTML={{
                  __html: solutionDetail.body
                }}></div>
              </div>
            </section>
          </div>

          {this.externalLinkStore.hasValidRelatedApp(solutionDetail) && this.appCatalogStore.currentAppObject.app_psk &&
            <div className="row">
              <section className="col-xs-12 col-lg-offset-1 col-lg-10 app-details-section">
                <h2>Related App</h2>
                <hr />
                <AppDetailBanner
                  pskToRender={solutionDetail.related_app_psk}
                  actionBlock="link_to_details"
                  appCatalogStore={this.appCatalogStore}/>
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
}
