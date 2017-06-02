import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';

import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';

@inject('store')
@observer
export default class SolutionsCategoryTemplate extends React.Component {

  static propTypes = {
    store: PropTypes.object,
    match: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.externalStore = this.props.store.externalLinkStore;
  }

  componentWillMount() {
    this.externalStore.getSolutionCards(this.props.match.url);
    this.externalStore.getSolutionHeaderImg(this.props.match.url);
  }

  renderCards(cardsArray) {

    return cardsArray.map((card) => {

      return (
        <div key={card.title} className="col-xs-12 col-sm-6 col-md-4 solutions-card">
          <div className="card-wrapper has-shadow">
            <Link to={card.url}>
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

    const currentCategory = this.props.match.params.solutionCategory;
    const normalizedTitle = currentCategory.split('-').join(' ');

    const crumbs = [
      {	pageHref: '/admin',
        pageTitle: 'Administration Dashboard'
      },
      {	pageHref: '/solutions',
        pageTitle: 'Public Safety Solutions'
      },
      {	pageHref: `/${currentCategory}`,
        pageTitle: normalizedTitle
      }
    ];


    return (
      <article id="solutions-category-page">
        <BreadcrumbNav links={crumbs} />
        <section className="content-wrapper container">
          <section className="pssheader small" style={{backgroundImage: this.externalStore.solutionHeaderImg}}>
            <div className="pssheader-contents">
              <h1 className="as-h2">{normalizedTitle}</h1>
            </div>
          </section>
          <div className="container">
            <section className="card-wrapper">
              <nav>
                {this.externalStore.solutionCards.length > 0
                  && this.renderCards(this.externalStore.solutionCards)}
              </nav>
            </section>
          </div>
        </section>
      </article>
    )

  }
}
