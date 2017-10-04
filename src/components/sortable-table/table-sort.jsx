import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
export class Sort extends React.Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
    val: PropTypes.string.isRequired,
    list: PropTypes.string.isRequired,
    children: PropTypes.node
  }

  constructor(props) {
    super(props);
    this.toggleSort = this.toggleSort.bind(this);
    this.arrowDirection = this.arrowDirection.bind(this);
    this.isActive = this.isActive.bind(this);
  }

  toggleSort = () => {
    this.props.store.toggleSort(this.props.list, this.props.val);
  }

  arrowDirection = () => {
    let sortKey = this.props.store.sorts[this.props.list];
    if (sortKey === this.props.val) {
      return this.props.store.sortDirection[this.props.list] === 'asc' ? 'arrow-up' : 'arrow-down';
    } else {
      return null;
    }
  }

  isActive = () => {
    let sortKey = this.props.store.sorts[this.props.list];
    return (sortKey === this.props.val) ? 'sort-button active' : 'sort-button';
  }

  render() {
    return (
        <button type="button" ref={`${this.props.val}Button`} className={this.isActive()} onClick={this.toggleSort}>
            <span className="sr-only">Sort By</span>
            <span className="sort-name">
                {this.props.children}
                <i className={this.arrowDirection()} />
            </span>
        </button>
    )
  }
}
