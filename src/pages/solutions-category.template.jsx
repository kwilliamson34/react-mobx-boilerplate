import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';

const mockCategoryCards = require('../fixtures/mock-solutions-cards.json');

@observer
export default class SolutionsCategoryTemplate extends React.Component {

  static propTypes = {
    match: PropTypes.object
  }

  renderCards = (cardsArray) => {

    //TODO: hardcoded temp url to single mocked details page. We were relying on marketing portal's routing structure to make ours work, so we'll need a new way to create the query strings after we get the new API.
    const tempUrl = `${this.props.match.url}/advanced-solution`;

    return cardsArray.map((card) => {

      return (
        <div key={card.title} className="col-xs-12 col-sm-6 col-md-6 col-lg-4 solutions-card">
          <div className="card-wrapper has-shadow">
            <Link to={tempUrl}>
              <div className="card-img-wrapper">
                <img src={card.imgPath} alt={card.title}/>
              </div>
              <div className="card-contents-wrapper">
                <h3 className="card-title">{card.title}</h3>
                <div className="card-desc">{card.description}</div>
              </div>
              <div className="learn-more">Learn More<i className="icon-arrowRight" aria-hidden="true" /></div>
            </Link>
          </div>
        </div>
      )
    })
  }

  render() {

    const categoryTitle = this.props.match.params.solutionCategory.split('-').join(' ');

    const crumbs = [
      {	pageHref: '/admin',
        pageTitle: 'Administration Dashboard'
      },
      {	pageHref: '/solutions',
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
            <h1 className="as-h2 centered">{categoryTitle}</h1>
          </section>
          <section className="all-cards-wrapper text-center">
            <nav className="center-block">
              {mockCategoryCards.cards.length > 0
                && this.renderCards(mockCategoryCards.cards)}
            </nav>
          </section>
        </div>
      </article>
    )

  }
}
