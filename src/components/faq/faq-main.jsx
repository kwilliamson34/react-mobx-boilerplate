import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import {FaqEntry} from './faq-entry.jsx';
import PageTitle from '../page-title/page-title';

@observer
export class FaqMain extends React.Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  componentWillUnmount() {
    this.store.updateFilter('All');
  }

  updateCategory = (event) => {
    event.preventDefault();
    this.store.updateFilter(event.target.value);
  }

  renderSingleButton = (category) => {
    const isActive = this.store.activeCategory === category.title;
    return (
      <button role="button" value={category.title} onClick={this.updateCategory} className={`as-link category-tab-button ${isActive
        ? 'active'
        : ''}`}>
        {category.title}
      </button>
    )
  }

  renderCategoriesAsButtons = (categories) => {
    return (
      <div className="faq-category-tabs">
        <ul>
          {categories.map((category, i) => {
            return (
              <li key={i}>
                {this.renderSingleButton(category)}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  renderCategoriesAsSelectMenu = (categories) => {
    return (
      <div className="faq-category-select">
        <form>
          <label htmlFor="faqCategory">FILTER BY CATEGORY</label>
          <select id="faqCategory" className="form-control" onChange={this.updateCategory} value={this.store.faqCategoryFilter}>
            <option value="All">All Categories</option>
            {categories.map((category, i) => {
              return (
                <option key={i} value={category.title}>{category.title}</option>
              )
            })}
          </select>
        </form>
      </div>
    )
  }

  renderFaqEntriesList = () => {
    return (
      <div className="faq-entry-list">
        {this.store.filteredFaqEntries.map((entry, i) => {
          return <FaqEntry faq={entry} key={i} num={i}/>
        })}
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className="faq-top-header">
          <div className="image-box">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-sm-10 col-sm-offset-1 faq-header-box">
                  <PageTitle>Frequently Asked&nbsp;Questions</PageTitle>
                </div>
              </div>
            </div>
          </div>
        </div>
        <article className="container">
          <div className="row">
            <div className="faq-header col-xs-12 col-sm-10 col-sm-offset-1">
              <div className="hidden-xs">
                {this.renderCategoriesAsButtons(this.store.permissionedCategories)}
              </div>
              <div className="hidden-sm hidden-md hidden-lg">
                {this.renderCategoriesAsSelectMenu(this.store.permissionedCategories)}
              </div>
              <div className="horizontal-line-header">
                <h2>
                  {this.store.activeCategory}
                </h2>
              </div>
              {this.renderFaqEntriesList()}
            </div>
          </div>
        </article>
      </div>
    );
  }
}
