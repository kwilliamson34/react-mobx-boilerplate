import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
// import { Link } from 'react-router-dom';

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
            <div className="col-xs-12"></div>
          </div>
        </div>
        </section>
      </article>
    )
  }

}
