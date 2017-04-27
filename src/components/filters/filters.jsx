import React from 'react';
import { observer, inject, PropTypes } from 'mobx-react';

@observer
export class Filters extends React.Component {

  static propTypes = {
    store: PropTypes.observableObject.isRequired
  }

  constructor(props){
    super(props);
    this.store = this.props.store;
  }

  handleCategoryChange = (event) => {
    this.store.changeCategoryFilter(event.target.value);
  }

  handleSegmentChange = (event) => {
    this.store.changeSegmentFilter(event.target.value);
  }

  render() {
    return (
      <div className="filters">
          <h4>Filter</h4>
          <div className="form-group">
            <label htmlFor="category-filter">Category</label>
            <select disabled id="category-filter" className="form-control" selected={this.store.categoryFilter} onChange={this.handleCategoryChange}>
              {this.store.categories.map((category, index) => {
                return <option value={category.value} key={index}>{category.title}</option>
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="segment-filter">Segment</label>
              <select id="segment-filter" className="form-control" selected={this.store.segmentFilter} onChange={this.handleSegmentChange}>
                {this.store.segments.map((segment, index) => {
                  return <option value={segment.value} key={index}>{segment.title}</option>
                })}
              </select>
          </div>
      </div>
    );
  }
}
