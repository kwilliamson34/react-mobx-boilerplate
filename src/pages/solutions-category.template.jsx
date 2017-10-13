import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import PageTitle from '../components/page-title/page-title';
import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';
import SolutionCard from '../components/solutions/solution-card';

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

  renderCards = (solutionsArray) => {
    return solutionsArray.map((solution) => {
      return <SolutionCard
                key={solution.promo_title}
                linkTo={`${this.props.match.url}/${encodeURIComponent(solution.promo_title)}`}
                title={solution.promo_title}
                imageUrl={solution.promo_image_url}
                description={solution.promo_description}
                hasValidRelatedApp={this.externalLinkStore.hasValidRelatedApp(solution)}/>
    });
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
            <PageTitle className="intro-block">{categoryTitle}</PageTitle>
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
