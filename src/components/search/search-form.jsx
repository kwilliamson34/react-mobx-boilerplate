import React from 'react';
import { observer, inject, PropTypes } from 'mobx-react';
import _ from 'lodash';

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

  handleClearClick = (event) => {
    this.store.clear();
  }

  get disabledState() {
    return this.store.searchButtonIsEnabled ? "" : "disabled";
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="search input-group input-group-lg has-clear">
          <input ref="input" className="form-control" title="searchQuery" type="text" value={this.store.searchQuery} placeholder="Search Apps" onChange={this.handleInput} />
          {(this.store.searchQuery.length > 0) &&
            <span className="icon-close" onClick={this.handleClearClick}></span>
          }
          <span className="input-group-btn">
            <button className="btn btn-primary" type="submit" disabled={this.disabledState}>
              <span className="sr-only">Search</span>
              <span className="icon-search"/>
            </button>
          </span>
        </div>
      </form>
    );
  }
}
