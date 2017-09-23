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

  handleFilterShowHideClick = (event) => {
    event.preventDefault();
    this.store.toggleFilterShowHide();
  }

  resetFilters = () => {
    this.store.resetFilters();
    this.props.resetPagination();
  }

  renderSelect({id, label, initialValue, defaultDisplayName, changeHandler, optionsArray}) {
    return (
      <div>
        <label className="control-label filter-category-label" htmlFor={id} tabIndex="0">{label}</label>
        <select id={id} ref={ref => this.store.addFilterElementRef(id, ref)} className="form-control" defaultValue={initialValue} onChange={changeHandler}>
          <option value="">{defaultDisplayName}</option>
          {optionsArray.map((option, index) => {
            return <option value={option.name} key={index}>{option.display}</option>
          })}
        </select>
      </div>
    );
  }

  renderFilters() {
    return (
      <div className={!this.store.showFilters ? 'hidden-xs' : ''}>
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
    );
  }

  render() {
    return (
      <section className="filters">
        <div className="row">
          <div className="col-xs-12 hidden-xs">
            <span className="form-group-title" tabIndex="0">Filters</span>
          </div>
          {this.store.showFilters && <div className="col-xs-12 hidden-sm hidden-md hidden-lg">
            <button className="filters-button with-caret" onClick={this.handleFilterShowHideClick}>
              <span>Hide Filters</span>
              <i className='icon-arrowUp' aria-hidden='true' />
            </button>
          </div>}
          {this.renderFilters()}
        </div>
        <div className="row">
          {this.store.showFilters
            ? <div className="col-xs-12 text-right">
                <button className="filters-button" onClick={this.resetFilters}><span>Reset Filters</span></button>
              </div>
            : <div>
              <div className="col-xs-6 hidden-sm hidden-md hidden-lg">
                <button className="filters-button" onClick={this.handleFilterShowHideClick}>
                  <span>Show Filters</span>
                  <i className='icon-arrowDown' aria-hidden='true' />
                </button>
              </div>
              <div className="col-xs-6 col-sm-12 text-right">
                <button className="filters-button" onClick={this.resetFilters}><span>Reset Filters</span></button>
              </div>
            </div>
          }
        </div>
      </section>
    );
  }
}
