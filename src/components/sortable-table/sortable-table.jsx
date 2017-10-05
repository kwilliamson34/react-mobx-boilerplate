import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import SortableColumn from './sortable-column';

@observer
export class SortableTable extends React.Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
    caption: PropTypes.string.isRequired,
    columns: PropTypes.array,
    rows: PropTypes.array,
    tableId: PropTypes.string
  };

  static defaultProps = {
    columns: [],
    rows: []
  }

  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  handleRowSelection = (e, app) => {
    if (e.key === 'Enter' || e.type === 'click') {
      this.store.rowSelected(app);
    }
  };

  handleToggleSort = (key) => {
    this.store.toggleSort(key);
  }

  showLoadingOrRenderRows = () => {
    if (this.store.isLoading){
      return [<LoadingRow key={1} extended={this.props.extended} />, <LoadingRow key={2} extended={this.props.extended} />]
    } else if (this.store.apps[this.props.list]) {
      return this.store[this.props.list].map((app, i) => {
        return <AppRow app={app} extended={this.props.extended} key={i} onAppRowSelected={this.handleRowSelection} />
      })
    }
  }

  noResults = () => {
    if (this.store.myApps[`${this.props.list}Apps`] && this.store.myApps[`${this.props.list}Apps`].length < 1) {
      return (<div className="my-apps-not-found" ref="noApps">
        <div className="as-h2">You don't have any {this.props.list.toLowerCase()} apps yet.</div>
      </div>)

    } else if (this.store[this.props.list] && this.store[this.props.list].length < 1) {
      return (<div className="my-apps-not-found" ref="noResults">
        <div className="as-h2">Sorry, no results were found.</div>
        <div className="as-h3">Adjust the filters to view your apps.</div>
      </div>)
    }
  }

  render() {
    return (
      <div className="">
        <span className="sr-only" aria-live="assertive" aria-atomic="true">{this.props.caption}
          is now sorted by {this.store.sorts[this.props.list]}
          by {this.props.store.sortDirection[this.props.list] ? 'ascending' : 'descending'}</span>
        <table className="my-apps-table" id={this.props.tableId}>
          <caption>{this.props.caption}</caption>
          <thead>
            <tr>
              {
                this.props.columns.map(col => {
                  const sortDirection = this.store.sortDirections[col.key];
                  const isActive = this.store.activeColumn === col.key;
                  return (
                    <SortableColumn
                      toggleSort={this.handleToggleSort}
                      sortDirection={sortDirection}
                      isActive={isActive}
                      columnToSort={col.key}
                      columnWidth={col.columnWidth}/>
                  )
                })
              }
            </tr>
          </thead>
          <tbody>
            {this.showLoadingOrRenderRows()}
          </tbody>
        </table>
        {!this.store.isLoading && this.noResults()}
      </div>
    )
  }

}
