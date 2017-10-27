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
    dataToSort: PropTypes.string,
    columnName: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node
  }

  static defaultProps = {
    children: []
  }

  @computed get arrowDirection() {
    return this.props.sortByAscending ? 'arrow-up' : 'arrow-down';
  }

  toggleSort = () => {
    this.props.toggleSort(this.props.columnToSort);
  }

  isActive = () => {
    return this.props.isActive ? 'sort-button active' : 'sort-button';
  }

  render() {
    return (
      <th scope="col" className={this.props.className}>
        <span className="sr-only" aria-live="assertive" aria-relevant="text" aria-atomic="true">
          The table is now sorted by {this.props.columnName || this.props.columnToSort}
          {this.props.sortByAscending ? 'in ascending' : 'in descending'}
          order.
        </span>
        <button type="button" className={this.isActive()} onClick={this.toggleSort}>
          <span className="sr-only">Sort By</span>
          <span className="sort-name">
            {this.props.children}
            <i className={this.arrowDirection} aria-hidden="true" />
          </span>
        </button>
      </th>
    )
  }
}
