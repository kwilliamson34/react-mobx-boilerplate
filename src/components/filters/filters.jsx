import React from 'react';
import { observer, PropTypes } from 'mobx-react';

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
      <div>
      <section className="filters">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <span className="sr-only"><label htmlFor="category-filter">Category</label></span>
                <select disabled id="category-filter" className="form-control" selected={this.store.categoryFilter} onChange={this.handleCategoryChange}>
                  {this.store.categories.map((category, index) => {
                    return <option value={category.value} key={index}>{category.title}</option>
                  })}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <span className="sr-only"><label htmlFor="segment-filter">Segment</label></span>
                  <select id="segment-filter" className="form-control" selected={this.store.segmentFilter} onChange={this.handleSegmentChange}>
                    {this.store.segments.map((segment, index) => {
                      return <option value={segment.value} key={index}>{segment.title}</option>
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
