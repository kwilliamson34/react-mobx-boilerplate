import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {computed} from 'mobx';

@observer
export class SortableColumn extends React.Component {

  static propTypes = {
    toggleSort: PropTypes.func.isRequired,
    sortByAscending: PropTypes.bool.isRequired,
    isActive: PropTypes.bool,
    columnDataKey: PropTypes.string,
    columnName: PropTypes.string,
    columnClassName: PropTypes.string,
    children: PropTypes.node
  }

  static defaultProps = {
    children: []
  }

  @computed get arrowDirection() {
    return this.props.sortByAscending ? 'arrow-up' : 'arrow-down';
  }

  toggleSort = () => {
    this.props.toggleSort(this.props.columnDataKey);
  }

  isActive = () => {
    return this.props.isActive ? 'sort-button active' : 'sort-button';
  }

  render() {
    return (
      <div className={`table-head-column ${this.props.columnClassName}`}>
        <span className="sr-only" aria-live="assertive" aria-relevant="text" aria-atomic="true">
          The table is now sorted by {this.props.columnName || this.props.columnDataKey}
          {this.props.sortByAscending ? 'in ascending' : 'in descending'}
          order.
        </span>
        <button type="button" className={this.isActive()} onClick={this.toggleSort}>
          <span className="sr-only">Sort By</span>
          <span className="sort-name">
            {this.props.columnName}
            <i className={this.arrowDirection} aria-hidden="true" />
          </span>
        </button>
      </div>
    )
  }
}
