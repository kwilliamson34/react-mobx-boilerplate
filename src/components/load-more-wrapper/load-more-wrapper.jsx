import React from 'react';
import PropTypes from 'prop-types';

import { observer, inject } from 'mobx-react';

@inject('store')
@observer
export default class LoadMoreWrapper extends React.Component {

    static propTypes = {
      store: PropTypes.object,
      showLoadMoreClick: PropTypes.bool,
      isLoading: PropTypes.bool,
      itemsPerPage: PropTypes.number,
      children: PropTypes.array
    }

    static defaultProps = {
      itemsPerPage: 4,
      showLoadMoreClick: true,
      isLoading: false
    }


    componentWillMount(){
      this.pageId = Math.random();
      this.props.store.registerPage(this.pageId);
    }

    componentDidUpdate(newProps){
      if(this.props.children !== newProps.children){
        this.props.store.resetPage(this.pageId);
      }
      if(this.shouldFocus){
        let toFocus = this.props.itemsPerPage * (this.props.store.pages[this.pageId]-1);
        this.refs[toFocus].focus();
      }
    }

    componentWillUnmount(){
      this.props.store.deRegisterPage(this.pageId);
    }

    get canLoadMore() {
      let totalItems = this.props.children.length;
      return totalItems > this.props.itemsPerPage && totalItems > this.paginatedItems.length;
    }

    get showNoResultsBlock() {
      return this.props.children.length <= 0
    }

    get paginatedItems() {
      let currentLoadMoreMultiplier = this.props.store.pages[this.pageId];
      return this.props.children.slice(0, this.props.itemsPerPage * currentLoadMoreMultiplier);
    }

    get modifiedChildren() {
      return React.Children.map(this.paginatedItems, (child, i) => {
        return React.cloneElement(child, {ref: i });
      })
    }

    handleLoadMoreClick = (e) => {
      if (e.type === 'click' && e.clientX === 0 && e.clientY === 0) {
        this.shouldFocus = true;
      } else {
        this.shouldFocus = false;
      }
      this.props.store.changePage(this.pageId);
    }


    render() {
      return (
        <div className="load-more-container">
            {!this.showNoResultsBlock &&
              <div>
                {this.modifiedChildren}
              </div>
            }
            {!this.props.isLoading && this.props.showLoadMoreClick && this.canLoadMore &&
              <div className="card-list-load-more col-xs-12 text-center">
                <button className="btn fn-primary" onClick={this.handleLoadMoreClick}>Load More<span className="sr-only"> and focus the first new item</span></button>
              </div>
            }
            {!this.props.isLoading && this.showNoResultsBlock &&
              <div className="card-list-no-results">
                <h3>No Results</h3>
                <p>There are no results to display.</p>
              </div>
            }
        </div>
      );
    }
}
