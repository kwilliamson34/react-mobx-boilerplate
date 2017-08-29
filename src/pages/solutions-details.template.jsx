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
      this.externalLinkStore.resetSolutionDetail();
      let solutionPath = this.props.match.params.solutionDetail;
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
    const psk = this.externalLinkStore.currentSolutionPsk;
    if(psk) {
      if(this.appCatalogStore.getMatchingApp(psk)) {
        this.appCatalogStore.setCurrentApp(psk)
      } else {
        this.appCatalogStore.fetchAppDetailByPsk(psk);
      }
    }
  }

  render() {
    const solutionCategory = this.props.match.params.solutionCategory.replace(/-/g, ' ');
    const solutionDetail = this.props.match.params.solutionDetail.replace(/\+/g, ' ');

    const crumbs = [
      {
        pageHref: '/admin',
        pageTitle: 'Administration Dashboard'
      }, {
        pageHref: '/admin/solutions',
        pageTitle: 'Public Safety Solutions'
      }, {
        pageHref: `/admin/solutions/${this.props.match.params.solutionCategory}`,
        pageTitle: solutionCategory
      }, {
        pageHref: `/${this.props.match.url}`,
        pageTitle: solutionDetail
      }
    ];

    return (
      <article id="solutions-details-page">
        <BreadcrumbNav links={crumbs}/>
        <div className="container">
          <section className="details-wrapper col-lg-offset-1 col-lg-10">
            <div className="row">
              <div className="col-xs-12 content-wrapper">
                <div dangerouslySetInnerHTML={{
                  __html: this.externalLinkStore.currentSolutionDetail
                }}></div>
              </div>
            </div>
          </section>
          <div className="related-app-block col xs-12">
            {this.externalLinkStore.currentSolutionPsk && this.appCatalogStore.currentAppObject &&
              <div>
                <h2>Related App</h2>
                <hr />
                <AppDetailBanner appCatalogStore={this.appCatalogStore} includeLinkToDetails={true}/>
              </div>
            }
          </div>
          <div>
            {this.externalLinkStore.currentSolutionPurchasingInfo &&
              <PurchasingInfo contactInfo={this.externalLinkStore.currentSolutionPurchasingInfo}/>}
          </div>
        </div>
      </article>
    )
  }
}
