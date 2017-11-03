import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {computed} from 'mobx';

@observer
export class TableColumn extends React.Component {

  static propTypes = {
    toggleSort: PropTypes.func,
    sortByAscending: PropTypes.bool,
    isActive: PropTypes.bool,
    columnDataKey: PropTypes.string,
    columnClassName: PropTypes.string,
    headerLabel: PropTypes.string,
    additionalHeaderJsx: PropTypes.object,
    srOnlyAnnouncement: PropTypes.string,
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

  renderSortingElements = () => {
    return (
      <div className="sort-button-container">
        <span className="sr-only" aria-live="assertive" aria-relevant="text" aria-atomic="true">
          The table is now sorted by {this.props.headerLabel || this.props.columnDataKey}
          {this.props.sortByAscending ? 'in ascending' : 'in descending'}
          order.
        </span>
        <button type="button" className={this.isActive()} onClick={this.toggleSort}>
          <span className="sr-only">Sort By</span>
          <span className="sort-name">
            {this.props.headerLabel}
            <i className={this.arrowDirection} aria-hidden="true" />
          </span>
        </button>
      </div>
    )
  }

  render() {
    return (
      <div role="columnheader" className={`table-head-column ${this.props.columnClassName}`}>
        {this.props.toggleSort && this.renderSortingElements()}
        {this.props.additionalHeaderJsx}
        {
          this.props.headerLabel && !this.props.toggleSort &&
          <div className="header-label">
            {this.props.headerLabel}
          </div>
        }
      </div>
    )
  }
}
