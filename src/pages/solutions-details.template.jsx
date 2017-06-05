import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
// import { Link } from 'react-router-dom';

const mockDetailPage = {
  title: 'Advanced Solution',
  description: 'A solution for many of the problems faced by your industry and your community. Works well in critical situations, reliable at all times. Rugged designs, hardened interfaces. Waterproof at literally any depth of water. Unaffected by temperature and humidity. Certified impervious to dogs, crows, wild swine, and small varmints. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati ut, nemo sunt eligendi numquam amet, aliquam dolor, distinctio itaque alias, quos ducimus. Voluptatem totam, iure fugiat modi exercitationem nemo ipsam.',
  headerPath: 'https://www-test.firstnet.ws/sites/default/files/images/content/banner/Tools_0.png',
  imagePath: 'https://www-test.firstnet.ws/sites/default/files/images/blocks/4.Solutions_Tools%20Mobile%20Forms%201008.jpg',
  caption: 'Emergency responders using the solution.',
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

@inject('store')
@observer
export default class SolutionsDetailsTemplate extends React.Component {

  static propTypes = {
    store: PropTypes.object,
    match: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.renderPurchasingInfo = this.renderPurchasingInfo.bind(this);
  }

  renderPurchasingInfo() {
    return (
      <section className="purchasing-info">
        <h3>For Purchasing</h3>
        <dl role="list">
          <dt>Contact:</dt>
          <dd>
            {mockDetailPage.purchasing.contact}
          </dd>
          <dt>Phone:</dt>
          <dd>
            <a href={`tel:+1${mockDetailPage.purchasing.phone}`}>{mockDetailPage.purchasing.phone}</a>
          </dd>
          <dt>Email:</dt>
          <dd>
            <a href={`mailto:${mockDetailPage.purchasing.email}`}>{mockDetailPage.purchasing.email}</a>
          </dd>
          <dt>Company:</dt>
          <dd>
            <a href={mockDetailPage.purchasing.url}>{mockDetailPage.purchasing.company}</a>
          </dd>
          <dt>Website:</dt>
          <dd>
            <a href={mockDetailPage.purchasing.url}>{mockDetailPage.purchasing.url.split('www.')[1]}</a>
          </dd>
        </dl>
      </section>
    )
  }

  render() {

    //TODO: Purchasing info section should not render if no info is available, but we don't know what that will look like. This assumes there will be an empty object, but it may need to be revised.
    const shouldRenderPurchasingInfo = Object.keys(mockDetailPage.purchasing).length !== 0;

    return (
      <article id="shop-solutions-page">
        <section className="content-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-xs-12"><h1 className="as-h2">{mockDetailPage.title}</h1></div>
          </div>
          <div className="row">
            <div className="col-xs-12"><p>{mockDetailPage.description}</p></div>
            <figure className="img-wrapper">
              <img src={mockDetailPage.imagePath} alt={"Image for " + mockDetailPage.title}/>
              <figcaption>{mockDetailPage.caption}</figcaption>
            </figure>
            {shouldRenderPurchasingInfo && this.renderPurchasingInfo()}
          </div>
        </div>
        </section>
      </article>
    )
  }
}
