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
    this.store.handleInput(event.target.value);
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
        <div className="search input-group input-group-lg has-clear">
          <label className="sr-only" htmlFor="search-box">Search Box</label>
          <input id="search-box" ref="input" className="form-control" title="searchQuery" type="text" value={this.store.searchQuery} placeholder="Search Apps" onChange={this.handleInput} />
          {(this.store.searchQuery.length > 0) &&
            <span className="icon-close" onClick={this.handleClearClick}></span>
          }
          <span className="input-group-btn">
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
