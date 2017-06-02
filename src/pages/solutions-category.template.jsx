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
    this.externalStore.getPSSCells(this.props.match.url);
    this.externalStore.getPSSHeaderImg(this.props.match.url);
  }

  renderCells(cellsArray) {

    return cellsArray.map((cell) => {

      return (
        <div key={cell.title} className="col-xs-12 col-sm-6 col-md-4 solutions-cell">
          <div className="cell-wrapper has-shadow">
            <Link to={cell.url}>
              <div className="cell-img-wrapper">
                <img src={cell.imgPath} alt={'Image for ' + cell.title}/>
              </div>
              <div className="cell-contents-wrapper">
                <h3 className="cell-title">{cell.title}</h3>
                <div className="cell-desc">{cell.description}</div>
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
        <section className="content-wrapper">
          <section className="pssheader small" style={{backgroundImage: this.externalStore.headerImg}}>
            <div className="pssheader-contents">
              <h1 className="as-h2">{normalizedTitle}</h1>
            </div>
          </section>
          <div className="container">
            <section className="cell-wrapper">
              <nav>
                {this.externalStore.cellsArray.length > 0
                  && this.renderCells(this.externalStore.cellsArray)}
              </nav>
            </section>
          </div>
        </section>
      </article>
    )

  }
}
