import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';

import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';
import PurchasingInfo from '../components/purchasing-info/purchasing-info';

// const mockDetailPage = require('../fixtures/mock-solutions-detail.json');

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
    this.externalLinkStore.fetchSolutionDetails();

    //checking if the user was on this page previously, eliminating need for new request
    // if (this.props.match.params.solutionDetail != this.externalLinkStore.currentSolutionDetail.path){
    //   this.externalLinkStore.resetSolutionDetail();
    //   if (this.externalLinkStore.allSolutionDetails.length) {
    //     this.externalLinkStore.fetchAndShowSolutionDetails(this.props.match.params.solutionDetail);
    //   } else {
    //     this.externalLinkStore.fetchSolutionDetails()
    //     .then(() => this.externalLinkStore.fetchAndShowSolutionDetails(this.props.match.params.solutionDetail));
    //   }
    // }
  }

  render() {

    const solutionCategory = this.props.match.params.solutionCategory.split('-').join(' ');
    const solutionDetail = this.props.match.params.solutionDetail.split('-').join(' ');

    const crumbs = [
      {	pageHref: '/admin',
        pageTitle: 'Administration Dashboard'
      },
      {	pageHref: '/solutions',
        pageTitle: 'Public Safety Solutions'
      },
      {	pageHref: `/solutions/${this.props.match.params.solutionCategory}`,
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
        <section className="details-wrapper col-lg-10">
          <div className="row">
            <div className="col-xs-12">
              <h1 className="as-h2">{mockDetailPage.title}</h1>
              <h2 className="as-h3">{mockDetailPage.subtitle}</h2>
              <p>{mockDetailPage.description}</p>
            </div>
            <figure className="details-img-wrapper">
              <img src={mockDetailPage.imagePath} alt={'Image for ' + mockDetailPage.title}/>
              <figcaption>{mockDetailPage.caption}</figcaption>
            </figure>
          </div>
        </section>
      </div>
      </article>
    )
  }
}
