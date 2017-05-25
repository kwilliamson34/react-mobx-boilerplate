import React from 'react';
import { observer, PropTypes } from 'mobx-react';

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
      <div>
        <section className="filters">
          <div className="row">
            <div className="col-xs-12">
              <span className="form-group-title">Filter</span>
            </div>
            <div className="col-md-4 col-xs-12">
              <div className="form-group">
                <label htmlFor="category-filter">Category</label>
                <select id="category-filter" className="form-control" selected={this.store.categoryFilter} onChange={this.handleCategoryChange}>
                  {this.store.categories.map((category, index) => {
                    return <option value={category.value} key={index}>{category.title}</option>
                  })}
                </select>
              </div>
            </div>
            <div className="col-md-4 col-xs-12">
              <div className="form-group">
                <label htmlFor="segment-filter">Segment</label>
                <select id="segment-filter" className="form-control" selected={this.store.segmentFilter} onChange={this.handleSegmentChange}>
                  {this.store.segments.map((segment, index) => {
                    return <option value={segment.value} key={index}>{segment.title}</option>
                  })}
                </select>
              </div>
            </div>
            <div className="col-md-4 col-xs-12">
              <div className="form-group">
                <label htmlFor="platform-filter">Platform</label>
                <select id="platform-filter" className="form-control" selected={this.store.platformFilter} onChange={this.handlePlatformChange}>
                  {this.store.platforms.map((platform, index) => {
                    return <option value={platform.value} key={index}>{platform.title}</option>
                  })}
                </select>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
