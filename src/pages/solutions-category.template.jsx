import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';

import {utilsService} from '../core/services/utils.service';
import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';

@inject('store')
@observer
export default class SolutionsCategoryTemplate extends React.Component {

  static propTypes = {
    match: PropTypes.object,
    store: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.externalLinkStore = this.props.store.externalLinkStore;
  }

  componentWillMount() {
    //User has navigated to a different category page so will make request for new category
    if (this.externalLinkStore.currentSolutionCategory != this.props.match.params.solutionCategory){
      this.externalLinkStore.currentSolutionCategory = this.props.match.params.solutionCategory;
      if (!this.externalLinkStore.allSolutionDetails.length) {
        this.externalLinkStore.getSolutionDetails();
      }
    }
  }

  getGradientStyles(imageUrl) {
    const shadowLength = '39%';
    const shadowOpacity = '0.85';
    // validated in Firefox, Safari and Chrome
    // adapted from https://stackoverflow.com/a/16590040
    return {
      background: `linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) ${shadowLength}, rgba(0, 0, 0, ${shadowOpacity}) 100%), url('${imageUrl}') no-repeat`,
      backgroundSize: 'cover'
    }
  }

  renderCards = (solutionsArray) => {
    return solutionsArray.map((solution) => {
      const solutionUrl = `${this.props.match.url}/${utilsService.getDevicesAndSolutionsUrl(solution.promo_title)}`;
      return (
        <div key={solution.promo_title} className="col-xs-12 col-sm-6 col-md-6 col-lg-4 solutions-card">
          <div className="card-wrapper has-shadow">
            <Link to={solutionUrl}>
              <div className="card-img-wrapper">
                {this.externalLinkStore.hasRelatedApp(solution)
                  ? <p className="is-linked">App Available</p>
                  : ''}
                <div className="img" style={this.getGradientStyles(solution.promo_image_url)} alt={solution.promo_title}></div>
              </div>
              <div className="card-contents-wrapper">
                <h3 className="card-title" dangerouslySetInnerHTML={{__html: solution.promo_title}}></h3>
                <div className="card-desc" dangerouslySetInnerHTML={{__html: solution.promo_description}}></div>
              </div>
              <div className="learn-more">Learn More<i className="icon-arrowRight" aria-hidden="true" /></div>
            </Link>
          </div>
        </div>
      )
    })
  }

  render() {
    const categoryTitle = this.props.match.params.solutionCategory.replace('-', ' ');
    const crumbs = [
      {	pageHref: '/admin',
        pageTitle: 'Administration Dashboard'
      },
      {	pageHref: '/admin/solutions',
        pageTitle: 'Public Safety Solutions'
      },
      {	pageHref: `/${this.props.match.url}`,
        pageTitle: categoryTitle
      }
    ];

    return (
      <article id="solutions-category-page">
        <BreadcrumbNav links={crumbs} />
        <div className="container">
          <section className="intro-block">
            <h1 className="centered">{categoryTitle}</h1>
          </section>
          <section className="all-cards-wrapper text-center">
            <nav className="center-block">
              {this.externalLinkStore.allSolutionDetails.length > 0
                && this.renderCards(this.externalLinkStore.filteredSolutionCategoryData.solutions)}
            </nav>
          </section>
        </div>
      </article>
    )

  }
}
