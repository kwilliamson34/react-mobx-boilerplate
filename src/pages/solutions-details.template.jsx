import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
// import { Link } from 'react-router-dom';

const mockDetailPage = {
  title: 'Advanced Solution',
  description: 'A solution for many of the problems faced by your industry and your community. Works well in critical situations, reliable at all times. Rugged designs, hardened interfaces. Waterproof at literally any depth of water. Unaffected by temperature and humidity. Certified impervious to dogs, crows, wild swine, and small varmints. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati ut, nemo sunt eligendi numquam amet, aliquam dolor, distinctio itaque alias, quos ducimus. Voluptatem totam, iure fugiat modi exercitationem nemo ipsam.',
  headerPath: 'https://www-test.firstnet.ws/sites/default/files/images/content/banner/Tools_0.png',
  imagePath: 'https://www-test.firstnet.ws/sites/default/files/images/blocks/4.Solutions_Tools%20Mobile%20Forms%201008.jpg',
  caption: 'Emergency responders using the solution.'
}

@inject('store')
@observer
export default class SolutionsDetailsTemplate extends React.Component {

  static propTypes = {
    store: PropTypes.object,
    match: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.externalStore = this.props.store.externalLinkStore;
  }

  componentWillMount() {
    // this.externalStore.getSolutionDetails(this.props.match.url);
    // this.externalStore.getSolutionHeaderImg(this.props.match.url);
  }

  render() {

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
            <section className="purchasing-info">
              <h3>For Purchasing</h3>

            </section>
          </div>
        </div>
        </section>
      </article>
    )
  }
}
