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
    this.externalStore = this.props.store.externalContentStore;
  }

  componentWillMount() {
    this.externalStore.getPSSCells(this.props.match.url);
  }

  render() {
    console.log('cellsArray categoryPage    ', this.externalStore.cellsArray);


    return (
      <article id="shop-solutions-page">
        <section className="content-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-xs-12"><h1 className="as-h2">Solutions Category</h1></div>
          </div>
          <div className="row">
            <div className="col-xs-12"><p>{this.externalStore.cellsArray.map((mug) => {
                return(
                  <div>{mug.title}</div>
                )
              })}</p></div>
          </div>
        </div>
        </section>
      </article>
    )
  }

}
