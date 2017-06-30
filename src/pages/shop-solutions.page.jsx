import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';

import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';

const htmlRegex = /<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[\^'">\s]+))?)+\s*|\s*)\/?>/g;
const mockLanding = require('../fixtures/mock-solutions-landing-cards.json');

@inject('store')
@observer
export default class ShopSolutionsPage extends React.Component {

  static propTypes = {
    store: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.externalLinkStore = this.props.store.externalLinkStore;
  }

  componentWillMount() {
    //TODO: Temporary workaround until APIs are sorted out
    this.externalLinkStore.solutionCategories = mockLanding.solution_category;

    if (!this.externalLinkStore.solutionCategories.length) {
      this.externalLinkStore.fetchSolutionCategories();
    }
  }

  renderCards = (cardsArray) => {

    //TODO: temporary cut to remove the final "Next Generation 9-11" category from the list. The status of this item is an open question; for now it's not needed.
    let redactedArray = cardsArray.slice(0, 4);

    return redactedArray.map((card) => {
      const path = card.name.replace(/ /g, '-').toLowerCase();
      const description = card.description.replace(htmlRegex, '');
      return (
        <div key={card.name} className="col-xs-12 col-sm-6 col-md-6 col-lg-4 solutions-card">
          <div className="card-wrapper has-shadow">
            <Link to={`solutions/${path}`}>
              <div className="card-img-wrapper">
                <img src={card.thumbnail_url} alt={card.thumbnail_alt}/>
              </div>
              <div className="card-contents-wrapper">
                <h3 className="card-title">{card.name}</h3>
                <div className="card-desc">{description}</div>
              </div>
              <div className="learn-more">Learn More<i className="icon-arrowRight" aria-hidden="true" /></div>
            </Link>
          </div>
        </div>
      )
    })
  }

  render() {

    const crumbs = [
      {	pageHref: '/admin',
        pageTitle: 'Administration Dashboard'
      },
      {	pageHref: '/admin/solutions',
        pageTitle: 'Public Safety Solutions'
      }
    ];

    return (
      <article id="shop-solutions-page">
        <BreadcrumbNav links={crumbs} />
          <div className="container center-block">
            <section className="intro-block col-xs-12">
              <h1 className="as-h2">For Public Safety, By Public Safety</h1>
              <p>
                The FirstNet Applications Store and Solutions Catalog offers enhanced technologies to complement public safety's fundamental services and applications. Current solutions include applications that are designed to improve workflow and communication, enhance device and connection security, and enable public safety organizations to scale departmental capabilities by utilizing cloud and IP-based services.
              </p>
              <p>
                FirstNet is cultivating a dedicated public safety applications development program, with participation from leading providers across the applications development community. Many more solutions will be added in response to these focused efforts and as public safety needs evolve.
              </p>
              <p>
                Contact a FirstNet Specialist to learn more about FirstNet Solutions and pricing details.
              </p>
            </section>
            <section className="all-cards-wrapper">
              <nav>
                {this.externalLinkStore.solutionCategories.length > 0
                  && this.renderCards(this.externalLinkStore.solutionCategories)}
              </nav>
            </section>
          </div>
      </article>
    )
  }
}
