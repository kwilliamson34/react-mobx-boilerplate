import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';

import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';
import PurchasingInfo from '../components/purchasing-info/purchasing-info';

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
  }

  componentWillMount() {
    // checking if the user was on this page previously, eliminating need for new request
    if (this.props.match.params.solutionDetail != this.externalLinkStore.currentSolutionDetail.path){
      this.externalLinkStore.resetSolutionDetail();
      if (this.externalLinkStore.allSolutionDetails.length) {
        this.externalLinkStore.fetchAndShowSolutionDetails(this.props.match.params.solutionDetail);
      } else {
        this.externalLinkStore.getSolutionDetails()
        .then(() => this.externalLinkStore.fetchAndShowSolutionDetails(this.props.match.params.solutionDetail));
      }
    }
  }

  render() {

    const solutionCategory = this.props.match.params.solutionCategory.replace(/-/g, ' ');
    const solutionDetail = this.props.match.params.solutionDetail.replace(/\+/g, ' ');

    const crumbs = [
      {	pageHref: '/admin',
        pageTitle: 'Administration Dashboard'
      },
      {	pageHref: '/admin/solutions',
        pageTitle: 'Public Safety Solutions'
      },
      {	pageHref: `/admin/solutions/${this.props.match.params.solutionCategory}`,
        pageTitle: solutionCategory
      },
      {	pageHref: `/${this.props.match.url}`,
        pageTitle: solutionDetail
      }
    ];

    return (
      <article id="solutions-details-page">
        <BreadcrumbNav links={crumbs} />
        <div className="container">
        <section className="details-wrapper col-lg-offset-1 col-lg-10">
          <div className="row">
            <div className="col-xs-12 content-wrapper">
              <div dangerouslySetInnerHTML={{__html: this.externalLinkStore.currentSolutionDetail}}></div>
            </div>
          </div>
        </section>
        <div className="col-lg-offset-1 col-lg-10">
          {this.externalLinkStore.currentPurchasingInfo && this.externalLinkStore.showPurchasingInfo &&
            <PurchasingInfo contactInfo={this.externalLinkStore.currentPurchasingInfo} />
          }
        </div>
      </div>
      </article>
    )
  }
}
