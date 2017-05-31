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
    this.externalStore.getHeaderImg(this.props.match.url);
  }

  renderCells(cellsArray) {

    return cellsArray.map((cell) => {

      return (
        <li key={cell.title} className="col-xs-12 col-sm-6 has-shadow">
          <img src={cell.imgPath} alt=""/>
          <div>{cell.title}</div>
          <div>{cell.description}</div>
          <Link to={cell.url} title={cell.title}>Learn More ></Link>
        </li>
      )
    })
  }

  render() {
    console.log('cellsArray categoryPage    ', this.externalStore.cellsArray);
    console.log('headerImg landingPage   ', this.externalStore.headerImg);

    //TODO: style normalized title to have initial caps in css.
    let normalizedTitle = this.props.match.params.solutionCategory.split('-').join(' ');


    return (
      <article id="shop-solutions-page">
        <section className="content-wrapper">
        <div className="container">
          <div className="row">
            <section className="col-xs-12 pssheader-small" style={{backgroundImage: this.externalStore.headerImg}}>
              <h1 className="as-h2">{normalizedTitle}</h1>
            </section>
          </div>
          <div className="row">
            <section className="col-xs-12 col-lg-8">
              <div className="col-xs-12">
                <ul>
                  {this.externalStore.cellsArray.length > 0
                    && this.renderCells(this.externalStore.cellsArray)}
                </ul>
              </div>
            </section>
          </div>
        </div>
        </section>
      </article>
    )
  }

}
