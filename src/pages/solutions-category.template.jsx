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
    let backgroundImage = '';
    if(utilsService.getIsInternetExplorer()) {
      backgroundImage = `-ms-linear-gradient(bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) ${shadowLength}, rgba(0, 0, 0, ${shadowOpacity}) 100%), url('${imageUrl}')`
    } else {
      backgroundImage = `linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) ${shadowLength}, rgba(0, 0, 0, ${shadowOpacity}) 100%), url('${imageUrl}')`
    }
    return {backgroundImage}
  }

  getNormalStyles(imageUrl) {
    return {
      background: `url('${imageUrl}') no-repeat`,
      backgroundPosition: 'center',
      backgroundSize: 'cover'
    }
  }

  renderCards = (solutionsArray) => {
    return solutionsArray.map((solution) => {
      const solutionUrl = `${this.props.match.url}/${utilsService.getDevicesAndSolutionsUrl(solution.promo_title)}`;
      const hasValidRelatedApp = this.externalLinkStore.hasValidRelatedApp(solution);
      return (
        <div key={solution.promo_title} className="col-xs-12 col-sm-6 col-md-6 col-lg-4 solutions-card">
          <div className="card-wrapper has-shadow">
            <Link to={solutionUrl}>
              <div className="card-img-wrapper">
                {hasValidRelatedApp
                  ? <p className="is-linked">App Available</p>
                  : ''}
                {hasValidRelatedApp
                  ? <div className="img" style={this.getGradientStyles(solution.promo_image_url)} alt={solution.promo_title}></div>
                  : <div className="img" style={this.getNormalStyles(solution.promo_image_url)} alt={solution.promo_title}></div>}
              </div>
              <div className="card-contents-wrapper">
                <h2 className="card-title as-h3" dangerouslySetInnerHTML={{__html: solution.promo_title}}></h2>
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
          <h1 className="intro-block">{categoryTitle}</h1>
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
