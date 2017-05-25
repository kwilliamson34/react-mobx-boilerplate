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
    this.store.handleInput(event.target.value)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.store.getSearchResults();
  }

  handleClearClick = () => {
    this.store.clear();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="search input-group has-clear">
          <label htmlFor="search-box" className="form-group-title">Search<span className="sr-only">&nbsp;App Catalog</span></label>
          <input id="search-box" ref="input" className="form-control" title="searchQuery" type="text" value={this.store.searchQuery} onChange={this.handleInput} />
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
      </form>
    );
  }
}
