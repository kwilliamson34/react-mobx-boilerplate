import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import PageTitle from '../components/page-title/page-title';

import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';
import SolutionCard from '../components/solutions/solution-card';

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
    if (!this.externalLinkStore.solutionCategories.length) {
      this.externalLinkStore.getSolutionCategories();
    }
  }

  renderCards = (cardsArray) => {
    //TODO: temporary cut to remove the final "Next Generation 9-11" category from the list. The status of this item is an open question; for now it's not needed.
    let redactedArray = cardsArray.slice(0, 4);

    return redactedArray.map((card) => {
      const path = card.name.replace(/ /g, '-').toLowerCase();
      return <SolutionCard
          key={card.name}
          linkTo={`solutions/${path}`}
          title={card.name}
          imageUrl={card.thumbnail_url}
          description={card.description}/>
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
              <PageTitle className="sr-only">Public Safety Solutions</PageTitle>
              <h1>For Public Safety, By Public Safety</h1>
              <p>
                The FirstNet Applications Store and Solutions Catalog offers enhanced technologies to complement public safety's fundamental services and applications. Current solutions include applications that are designed to improve workflow and communication, enhance device and connection security, and enable public safety organizations to scale departmental capabilities by utilizing cloud and IP-based services.
              </p>
              <p>
                FirstNet is cultivating a dedicated public safety applications development program, with participation from leading providers across the applications development community. Many more solutions will be added in response to these focused efforts and as public safety needs evolve.
              </p>
              <p>
                <strong>
                  Contact your FirstNet Solutions Consultant or call&nbsp;
                  <a href={'tel:' + this.externalLinkStore.solutionsConsultantPhone}>
                    <span className="sr-only">FirstNet Solutions Phone:&nbsp;</span>
                    {this.externalLinkStore.solutionsConsultantPhone}
                  </a>
                  &nbsp;to learn more about FirstNet Solutions and pricing details.
                </strong>
              </p>
            </section>
            <section className="all-cards-wrapper">
              <nav>
                {this.externalLinkStore.solutionCategories.length > 0 &&
                  this.renderCards(this.externalLinkStore.solutionCategories)
                }
              </nav>
            </section>
          </div>
      </article>
    )
  }
}
