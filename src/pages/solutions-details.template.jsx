import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';

const mockDetailPage = require('../fixtures/mock-solutions-detail.json');

@observer
export default class SolutionsDetailsTemplate extends React.Component {

  static propTypes = {
    match: PropTypes.object
  }

  renderPurchasingInfo = () => {

    //TODO: Design calls for truncated url sans everything before the domain name. Below assumes all the URLs will have a www., which feels presumptuous; if so, write more.
    const cutUrl = mockDetailPage.purchasing.url.split('www.')[1];

    return (
      <section className="purchasing-info">
        <h2>For Purchasing</h2>
        <hr/>
        <dl role="presentation">
          <dt role="presentation">Contact</dt>
          <dd>
            {mockDetailPage.purchasing.contact}
          </dd>
          <dt role="presentation">Phone</dt>
          <dd role="link">
            <a href={`tel:+1${mockDetailPage.purchasing.phone}`}>{mockDetailPage.purchasing.phone}</a>
          </dd>
          <dt role="presentation">Email</dt>
          <dd role="link">
            <a href={`mailto:${mockDetailPage.purchasing.email}`}>{mockDetailPage.purchasing.email}</a>
          </dd>
          <dt role="presentation">Company</dt>
          <dd>
            {mockDetailPage.purchasing.company}
          </dd>
          <dt role="presentation">Website</dt>
          <dd role="link">
            <a href={mockDetailPage.purchasing.url}>{cutUrl}</a>
          </dd>
        </dl>
      </section>
    )
  }

  render() {

    //TODO: API will apparently return contact info with empty strings if that field is missing. Check with design for what to do if some but not all contact info is missing (leave that field blank?) If all contact info is missing, section should not render; probably we will need to loop over the keys and check for empty strings.
    const shouldRenderPurchasingInfo = Object.keys(mockDetailPage.purchasing).length !== 0;

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
        <div className="col-xs-12 col-lg-10">
          <div className="row">
            {shouldRenderPurchasingInfo && this.renderPurchasingInfo()}
          </div>
        </div>
      </div>
      </article>
    )
  }
}
