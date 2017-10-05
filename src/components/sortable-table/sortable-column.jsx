import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
export class SortableColumn extends React.Component {

  static propTypes = {
    toggleSort: PropTypes.func.isRequired,
    sortDirection: PropTypes.bool.isRequired,
    isActive: PropTypes.bool.isRequired,
    columnToSort: PropTypes.string.isRequired,
    columnWidth: PropTypes.string,
    children: PropTypes.node
  }

  toggleSort = () => {
    this.props.toggleSort(this.props.columnToSort);
  }

  arrowDirection = () => {
    return this.props.sortDirection ? 'arrow-up' : 'arrow-down';
  }

  isActive = () => {
    return this.props.isActive ? 'sort-button active' : 'sort-button';
  }

  render() {
    return (
      <th scope="col" className={this.props.columnWidth}>
        <button type="button" ref={`${this.props.sortBy}Button`} className={this.isActive()} onClick={this.toggleSort}>
          <span className="sr-only">Sort By</span>
          <span className="sort-name">
            {this.props.children}
            <i className={this.arrowDirection()} />
          </span>
        </button>
      </th>
    )
  }
}
