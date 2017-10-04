import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
export class SortableTable extends React.Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
    caption: PropTypes.string.isRequired,
    list: PropTypes.string.isRequired,
    tableId: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  noResults(){
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
          by {this.props.store.sortDirection[this.props.list] === 'asc' ? 'ascending' : 'descending'}</span>
        <table className="my-apps-table" id={this.props.tableId}>
          <caption>{this.props.caption}</caption>
          <thead>
            <tr>
              <th scope="col" className="col-xs-5">
                <Sort store={this.store}
                  key="app_name"
                  val="app_name"
                  list={this.props.list}>App</Sort>
              </th>
              <th scope="col" className='col-xs-1'>
                <Sort
                  store={this.store} key="platform" val="platform"
                  list={this.props.list}>Platform</Sort>
              </th>
              <th scope="col" className="col-xs-3">
                <Sort store={this.store}
                  key={this.props.extended ? "custom_metadata.release_date" : "custom_metadata.submitted_date"}
                  val={this.props.extended ? "custom_metadata.release_date" : "custom_metadata.submitted_date"}
                  list={this.props.list}>{this.props.extended ? 'Release' : 'Submission'} Date
                </Sort>
              </th>
              <th scope="col" className={this.props.extended ? 'col-xs-1' : 'col-xs-3'}>
                <Sort store={this.store}
                  key="custom_metadata.status"
                  val="custom_metadata.status"
                  list={this.props.list}>Status
                </Sort>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.showAppsOrLoadingIndicator()}
          </tbody>
        </table>
        {!this.store.isLoading && this.noResults()}
      </div>
    )
  }

}
