import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {computed} from 'mobx';

import Checkbox from '../forms/checkbox';

@observer
export class MobileHeader extends React.Component {

  static propTypes = {
    toggleSort: PropTypes.func.isRequired,
    sortByAscending: PropTypes.bool.isRequired,
    handleSelectAllCheckbox: PropTypes.func,
    checkSelectAllCheckbox: PropTypes.bool,
    sortData: PropTypes.string,
    sortName: PropTypes.string,
    className: PropTypes.string
  }

  @computed get arrowDirection() {
    return this.props.sortByAscending ? 'icon-arrowUp' : 'icon-arrowDown';
  }

  @computed get textDirection() {
    return this.props.sortByAscending ? 'Ascending' : 'Descending';
  }

  toggleSort = () => {
    this.props.toggleSort(this.props.sortData);
  }

  render() {
    return (
      <div className={`mobile-header ${this.props.className}`}>
        <div className="flex-wrapper">
          <span className="sr-only" aria-live="assertive" aria-relevant="text" aria-atomic="true">
            The table is now sorted by {this.props.sortName || this.props.sortData}
            {this.props.sortByAscending ? 'in ascending' : 'in descending'}
            order.
          </span>
          <Checkbox
            id="select-all-checkbox"
            label="Select or Deselect All Checkboxes"
            value="Select or Deselect All Checkboxes"
            labelIsSrOnly={true}
            handleOnChange={this.props.handleSelectAllCheckbox}
            checked={this.props.checkSelectAllCheckbox}/>
          <button type="button" className="as-link mobile-header-button" onClick={this.toggleSort}>
            <span className="sort-name">
              {`Sort by ${this.props.sortName}`} &ndash; {this.textDirection}
            </span>
            <i className={this.arrowDirection} aria-hidden="true" />
          </button>
        </div>
        <hr/>
      </div>
    )
  }
}
