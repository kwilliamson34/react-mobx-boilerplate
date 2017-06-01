import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';

// import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';

@inject('store')
@observer
export default class ShopSolutionsPage extends React.Component {

  static propTypes = {
    store: PropTypes.object,
    match: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.externalStore = this.props.store.externalLinkStore;
  }

  componentWillMount() {
    this.externalStore.getPSSCells(this.props.match.url);
    this.externalStore.getPSSHeaderImg(this.props.match.url);
  }

  renderCells(cellsArray) {

    //TODO: crude slice job to cut next-gen-911, which is going away from marketing portal. remove after that happens.
    let cutArray = cellsArray.slice(0, 4);

    return cutArray.map((cell) => {

      return (
        <li key={cell.title} className="col-xs-12 col-sm-6 col-md-4 solutions-cell">
          <div className="cell-contents has-shadow">
            <Link to={cell.url}>
              <div className="cell-img">
                <img src={cell.imgPath} alt={'Image for ' + cell.title}/>
              </div>
              <div className="cell-description">
                <h3 className="cell-title">{cell.title}</h3>
                <div className="cell-desc">{cell.description}</div>
                <div className="cell-more">Learn More</div>
              </div>
            </Link>
          </div>
        </li>
      )
    })
  }

  render() {
    console.log('cellsArray landingPage   ', this.externalStore.cellsArray);
    console.log('headerImg landingPage   ', this.externalStore.headerImg);

    return (
      <article id="shop-solutions-page">
        <section className="content-wrapper">
          <section className="pssheader-main" style={{backgroundImage: this.externalStore.headerImg}}>
            <div className="pssheader-main-contents">
              <h1 className="as-h2">Solutions</h1>
              <p>Innovative communication and collaboration technologies help public safety improve decision making</p>
            </div>
          </section>
        <div className="container">
          <div>
            <section className="col-sm-12 intro-block">
              <h2>For Public Safety, By Public Safety</h2>
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
            <section>
              <nav>
                <ul>
                  {this.externalStore.cellsArray.length > 0
                    && this.renderCells(this.externalStore.cellsArray)}
                </ul>
              </nav>
            </section>
          </div>
        </div>
        </section>
      </article>
    )
  }
}
