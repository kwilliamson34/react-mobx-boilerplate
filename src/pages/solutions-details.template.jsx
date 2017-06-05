import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';

const mockDetailPage = {
  title: 'Advanced Solution',
  subtitle: 'Empower Logistics and Disrupt Resources',
  description: 'A solution for many of the problems faced by your industry and your community. Works well in critical situations, reliable at all times. Rugged designs, hardened interfaces. Waterproof at literally any depth of water. Unaffected by temperature and humidity. Certified impervious to dogs, crows, bears, wild swine, and small varmints. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati ut, nemo sunt eligendi numquam amet, aliquam dolor, distinctio itaque alias, quos ducimus. Voluptatem totam, iure fugiat modi exercitationem nemo ipsam.',
  headerPath: 'https://www-test.firstnet.ws/sites/default/files/images/content/banner/Tools_0.png',
  imagePath: 'https://www-test.firstnet.ws/sites/default/files/images/blocks/4.Solutions_Tools%20Mobile%20Forms%201008.jpg',
  caption: 'Emergency responders utilizing the solution.',
  purchasing: {
   contact: 'Lucius Fox',
   phone: '800-XXX-XXX',
   email: 'lfox@samsung.com',
   company: 'Samsung Group',
   url: 'https://www.samsung.com/us'
 }
}

// const mockDetailPage = {
//   title: 'Advanced Solution',
//   description: 'A solution for many of the problems faced by your industry and your community. Works well in critical situations, reliable at all times. Rugged designs, hardened interfaces. Waterproof at literally any depth of water. Unaffected by temperature and humidity. Certified impervious to dogs, crows, wild swine, and small varmints. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati ut, nemo sunt eligendi numquam amet, aliquam dolor, distinctio itaque alias, quos ducimus. Voluptatem totam, iure fugiat modi exercitationem nemo ipsam.',
//   headerPath: 'https://www-test.firstnet.ws/sites/default/files/images/content/banner/Tools_0.png',
//   imagePath: 'https://www-test.firstnet.ws/sites/default/files/images/blocks/4.Solutions_Tools%20Mobile%20Forms%201008.jpg',
//   caption: 'Emergency responders using the solution.',
//   purchasing: {}
// }

// @inject('store')
@observer
export default class SolutionsDetailsTemplate extends React.Component {

  static propTypes = {
    // store: PropTypes.object,
    match: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.renderPurchasingInfo = this.renderPurchasingInfo.bind(this);
    console.log('MATCH  ', this.props.match);
  }

  renderPurchasingInfo() {

    //TODO: Design calls for truncated url sans everything before the domain name. Below assumes all the URLs will have a www., which feels presumptuous; if so, write more.
    const cutUrl = mockDetailPage.purchasing.url.split('www.')[1];

    return (
      <section className="purchasing-info">
        <h2 className="as-h3">For Purchasing</h2>
        <hr/>
        <dl role="list">
          <dt>Contact</dt>
          <dd>
            {mockDetailPage.purchasing.contact}
          </dd>
          <dt>Phone</dt>
          <dd>
            <a href={`tel:+1${mockDetailPage.purchasing.phone}`}>{mockDetailPage.purchasing.phone}</a>
          </dd>
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${mockDetailPage.purchasing.email}`}>{mockDetailPage.purchasing.email}</a>
          </dd>
          <dt>Company</dt>
          <dd>
            <a href={mockDetailPage.purchasing.url}>{mockDetailPage.purchasing.company}</a>
          </dd>
          <dt>Website</dt>
          <dd>
            <a href={mockDetailPage.purchasing.url}>{cutUrl}</a>
          </dd>
        </dl>
      </section>
    )
  }

  render() {

    //TODO: Probably temporary; section should not render if there is no purchasing info, but we don't yet know what that will look like.
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
      {	pageHref: `/${this.props.match.params.solutionCategory}`,
        pageTitle: solutionCategory
      },
      {	pageHref: `/${this.props.match.params.solutionDetail}`,
        pageTitle: solutionDetail
      },
    ];

    return (
      <article id="solutions-details-page">
        <BreadcrumbNav links={crumbs} />
        <div className="container">
        <section className="details-wrapper">
          <div className="row">
            <div className="col-xs-12">
              <h1 className="as-h2">{mockDetailPage.title}</h1>
              <h2 className="as-h3">{mockDetailPage.subtitle}</h2>
              <p>{mockDetailPage.description}</p>
              </div>
            <figure className="img-wrapper">
              <img src={mockDetailPage.imagePath} alt={"Image for " + mockDetailPage.title}/>
              <figcaption>{mockDetailPage.caption}</figcaption>
            </figure>
          </div>
        </section>
        {shouldRenderPurchasingInfo && this.renderPurchasingInfo()}
      </div>
      </article>
    )
  }
}
