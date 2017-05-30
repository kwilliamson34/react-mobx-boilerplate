import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
// import { Link } from 'react-router-dom';

@inject('store')
@observer
export default class ShopSolutionsPage extends React.Component {

  static propTypes = {
    store: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.solutionsStore = this.props.store.externalContentStore;
  }

  componentWillMount() {
    this.solutionsStore.getPublicSafetySolutions();
  }

  render() {
    return (
      <article id="shop-solutions-page">
        <section className="content-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-xs-12"><h1 className="as-h2">Solutions</h1></div>
          </div>
          <div className="row">
            <div className="col-xs-12"><p>Content Here</p></div>
          </div>
        </div>
        </section>
      </article>
    )
  }
}
