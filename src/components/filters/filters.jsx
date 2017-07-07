import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
export class Filters extends React.Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
    resetPagination: PropTypes.func
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

  resetFilters = () => {
    this.store.resetFilters();
    this.props.resetPagination();
  }

  renderSelect({id, label, initialValue, defaultDisplayName, changeHandler, optionsArray}) {
    const component = (
      <div>
        <label className="control-label" htmlFor={id}>{label}</label>
        <select id={id} ref={ref => this.store.addFilterElementRef(id, ref)} className="form-control" defaultValue={initialValue} onChange={changeHandler}>
          <option value="">{defaultDisplayName}</option>
          {optionsArray.map((option, index) => {
            return <option value={option.name} key={index}>{option.display}</option>
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
          <div className="col-sm-4 col-xs-12">
            <div className="form-group">
              {this.renderSelect({
                id: 'category-filter',
                label: 'Category',
                defaultDisplayName: 'All Categories',
                initialValue: this.store.categoryFilter,
                changeHandler: this.handleCategoryChange,
                optionsArray: this.store.categories
              })}
            </div>
          </div>
          <div className="col-sm-4 col-xs-12">
            <div className="form-group">
              {this.renderSelect({
                id: 'segment-filter',
                label: 'Branch/Discipline',
                defaultDisplayName: 'All Branches/Disciplines',
                initialValue: this.store.segmentFilter,
                changeHandler: this.handleSegmentChange,
                optionsArray: this.store.segments
              })}
            </div>
          </div>
          <div className="col-sm-4 col-xs-12">
            <div className="form-group">
              {this.renderSelect({
                id: 'platform-filter',
                label: 'Platform',
                defaultDisplayName: 'All Platforms',
                initialValue: this.store.platformFilter,
                changeHandler: this.handlePlatformChange,
                optionsArray: this.store.platforms
              })}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 text-right">
            <button className="reset-filters-button" onClick={this.resetFilters}>Reset Filters</button>
          </div>
        </div>
      </section>
    );
  }
}
