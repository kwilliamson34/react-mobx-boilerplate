import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';

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
    console.log('cellsArray categoryPage    ', this.externalStore.cellsArray);
    console.log('headerImg landingPage   ', this.externalStore.headerImg);

    let normalizedTitle = this.props.match.params.solutionCategory.split('-').join(' ');

    return (
      <article id="solutions-category-page">
        <section className="content-wrapper">
          <section className="pssheader-small" style={{backgroundImage: this.externalStore.headerImg}}>
            <div className="pssheader-small-contents">
              <h1 className="as-h2">{normalizedTitle}</h1>
            </div>
          </section>
          <div className="container">
            <section>
              <nav>
                <ul>
                  {this.externalStore.cellsArray.length > 0
                    && this.renderCells(this.externalStore.cellsArray)}
                </ul>
              </nav>
            </section>
          </div>
        </section>
      </article>
    )

  }

}
