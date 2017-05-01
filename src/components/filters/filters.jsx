import React from 'react';
import { observer, inject, PropTypes } from 'mobx-react';

@observer
export class Filters extends React.Component {

  static propTypes = {
    store: PropTypes.observableObject.isRequired
  }

  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  handleCategoryChange = (event) => {
    this.store.changeCategoryFilter(event.target.value);
  }

  handleSegmentChange = (event) => {
    this.store.changeSegmentFilter(event.target.value);
  }

  handlePlatformChange = (event) => {
    this.store.changePlatformFilter(event.target.value);
  }

  render() {
    return (
      <div className="filters row">
        <div className="filter-title col-md-2">Filter</div>
        <div className="form-group col-md-5 col-xs-12">
          <span className="sr-only"><label htmlFor="category-filter">Category</label></span>
          <select id="category-filter" className="form-control" selected={this.store.categoryFilter} onChange={this.handleCategoryChange}>
            {this.store.categories.map((category, index) => {
              return <option value={category.value} key={index}>{category.title}</option>
            })}
          </select>
        </div>
        <div className="form-group col-md-5 col-xs-12">
          <span className="sr-only"><label htmlFor="segment-filter">Segment</label></span>
          <select id="segment-filter" className="form-control" selected={this.store.segmentFilter} onChange={this.handleSegmentChange}>
            {this.store.segments.map((segment, index) => {
              return <option value={segment.value} key={index}>{segment.title}</option>
            })}
          </select>
        </div>
        {/*<div className="form-group col-md-3 hidden-xs hidden-sm">
          <span className="sr-only"><label htmlFor="platform-filter">Platform</label></span>
          <select id="platform-filter" className="form-control" selected={this.store.platformFilter} onChange={this.handlePlatformChange}>
            {this.store.platforms.map((platform, index) => {
              return <option value={platform.value} key={index}>{platform.title}</option>
            })}
          </select>
        </div>*/}
      </div>
    );
  }
}
