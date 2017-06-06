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

  constructor(props) {
    super(props);
    this.renderCards = this.renderCards.bind(this);
  }

  renderCards(cardsArray) {

    //TODO: hardcoded temp url to single mocked details page. In fact, going to /solutions/anything/anything takes you to identical category and details mocked pages.
    const tempUrl = `${this.props.match.url}/advanced-solution`;

    return cardsArray.map((card) => {

      return (
        <div key={card.title} className="col-xs-12 col-sm-6 col-md-6 col-lg-4 solutions-card">
          <div className="card-wrapper has-shadow">
            <Link to={tempUrl}>
              <div className="card-img-wrapper">
                <img src={card.imgPath} alt={'Image for ' + card.title}/>
              </div>
              <div className="card-contents-wrapper">
                <h3 className="card-title">{card.title}</h3>
                <div className="card-desc">{card.description}</div>
              </div>
              <div className="learn-more">Learn More</div>
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
      {	pageHref: `/${this.props.match.params.solutionCategory}`,
        pageTitle: categoryTitle
      }
    ];


    return (
      <article id="solutions-category-page">
        <BreadcrumbNav links={crumbs} />
        <div className="container">
          <section className="intro-block">
            <h1 className="as-h2">{categoryTitle}</h1>
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
