import React from 'react';
import { observer, PropTypes } from 'mobx-react';

@observer
export class SearchForm extends React.Component {

  static propTypes = {
    store: PropTypes.observableObject.isRequired
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
    this.store.getSearchResults();
  }

  handleClearClick = () => {
    this.store.clearSearchQuery();
  }

  render() {
    return (
      <form className="search-form form-group" onSubmit={this.handleSubmit}>
        <div className="search-input input-group">
          <label htmlFor="search-box" className="control-label">Search<span className="sr-only">&nbsp;App Catalog</span></label>
          <input id="search-box" type="search" ref="input" className="form-control" title="searchQuery" value={this.store.searchQuery} onChange={this.handleInput} />
          {(this.store.searchQuery.length > 0) &&
            <button className="btn clear-btn" type="button" onClick={this.handleClearClick}>
              <span className="sr-only">Clear</span>
              <span aria-hidden="true" className="icon-close"/>
            </button>
          }
          <span className="input-group-btn search-btn">
            <button className="btn btn-primary" type="submit">
              <span className="sr-only">Search</span>
              <span aria-hidden="true" className="icon-search"/>
            </button>
          </span>
        </div>
        <p>{this.store.searchResultsCountLabel}</p>
      </form>
    );
  }
}
