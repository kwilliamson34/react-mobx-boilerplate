import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
export class SearchForm extends React.Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
    resetPagination: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  handleInput = (event) => {
    this.store.handleSearchInput(event.target.value)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.resetPagination();
    this.store.getSearchResults();
  }

  handleClearClick = () => {
    this.props.resetPagination();
    this.store.clearSearchQuery();
  }

  render() {
    return (
      <form className="search-form form-group" onSubmit={this.handleSubmit}>
        <div className="search-input input-group">
          <label htmlFor="search-field" className="control-label">Search<span className="sr-only">&nbsp;App Catalog</span></label>
          <div className="search-bar">
            <input id="search-field" type="search" ref="input" className="form-control" title="searchQuery" value={this.store.searchQuery} onChange={this.handleInput} />
            {(this.store.searchQuery.length > 0) &&
              <button className="btn clear-btn" type="button" onClick={this.handleClearClick}>
                <span className="sr-only">Clear</span>
                <span aria-hidden="true" className="icon-close"/>
              </button>
            }
            <button className="btn search-btn" type="submit">
              <span className="sr-only">Search</span>
              <span aria-hidden="true" className="icon-search"/>
            </button>
          </div>
        </div>
      </form>
    );
  }
}
