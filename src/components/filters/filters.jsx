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
    this.filterRefs = [];
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

  resetFilters = () => {
    this.store.resetFilters();

    Object.keys(this.filterRefs).forEach((key) => {
      this.filterRefs[key].value = '';
    });
  }

  renderSelect({id, label, initialValue, changeHandler, optionsArray}) {
    const component = (
      <div>
        <label htmlFor={id}>{label}</label>
        <select id={id} ref={ref => this.filterRefs[id] = ref} className="form-control" selected={initialValue} onChange={changeHandler}>
          {optionsArray.map((option, index) => {
            return <option value={option.value} key={index}>{option.title}</option>
          })}
        </select>
      </div>
    );
    return component;
  }

  render() {
    return (
      <section className="filters">
        <div className="row">
          <div className="col-xs-12">
            <span className="form-group-title">Filter</span>
          </div>
          <div className="col-md-4 col-xs-12">
            <div className="form-group">
              {this.renderSelect({
                id: 'category-filter',
                label: 'Category',
                initialValue: this.store.categoryFilter,
                changeHandler: this.handleCategoryChange,
                optionsArray: this.store.categories
              })}
            </div>
          </div>
          <div className="col-md-4 col-xs-12">
            <div className="form-group">
              {this.renderSelect({
                id: 'segment-filter',
                label: 'Segment',
                initialValue: this.store.segmentFilter,
                changeHandler: this.handleSegmentChange,
                optionsArray: this.store.segments
              })}
            </div>
          </div>
          <div className="col-md-4 col-xs-12">
            <div className="form-group">
              {this.renderSelect({
                id: 'platform-filter',
                label: 'Platform',
                initialValue: this.store.platformFilter,
                changeHandler: this.handlePlatformChange,
                optionsArray: this.store.platforms
              })}
            </div>
          </div>
          <button className="btn fn-primary reset-filters-button" onClick={this.resetFilters}>Reset Filters</button>
        </div>
      </section>
    );
  }
}
