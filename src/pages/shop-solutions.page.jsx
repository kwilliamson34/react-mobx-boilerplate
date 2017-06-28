import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';

//TODO: This data is being mocked until Marketing Portal's Solution's landing page is restored, at which point we should receive an API.
const mockLanding = require('../fixtures/mock-solutions-landing-cards.json');

@observer
export default class ShopSolutionsPage extends React.Component {

  renderCards = (cardsArray) => {
    return cardsArray.map((card) => {
      return (
        <div key={card.title} className="col-xs-12 col-sm-6 col-md-6 col-lg-4 solutions-card">
          <div className="card-wrapper has-shadow">
            <Link to={card.url}>
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

    const crumbs = [
      {	pageHref: '/admin',
        pageTitle: 'Administration Dashboard'
      },
      {	pageHref: '/solutions',
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
                {mockLanding.cards.length > 0
                  && this.renderCards(mockLanding.cards)}
              </nav>
            </section>
          </div>
      </article>
    )
  }
}
