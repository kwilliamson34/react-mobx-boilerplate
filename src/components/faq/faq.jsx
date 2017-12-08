import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import _ from 'lodash';

import PageTitle from '../page-title/page-title';
import Truncate from '../truncate/truncate';

@observer
export class Faq extends React.Component {

  static propTypes = {
    faqData: PropTypes.object,
    userPermissions: PropTypes.array
  }

  constructor(props) {
    super(props);
    this.faq = this.props.faqData;
    this.allAvailablePermissions = [];
  }

  componentWillMount() {
    this.allAvailablePermissions = this.findAvailablePermissions();
  }

  componentWillUnmount() {
    this.activeCategory = 'All';
  }

  @observable activeCategory = 'All';

  findAvailablePermissions = () => {
    let allPermissions = [];
    for (let category in this.faq.categories) {
      this.faq.categories[category].permissions.forEach(permission => {
        if (allPermissions.indexOf(permission) === -1) {
          allPermissions.push(permission);
        }
      });
    }
    return allPermissions;
  }

  permissionedCategories = () => {
    return _.intersection(this.allAvailablePermissions, this.props.userPermissions).length > 0
      ? this.faq.categories.filter(category => _.intersection(category.permissions, this.props.userPermissions).length > 0)
      : this.faq.categories;
  }

  filteredFaqEntries = () => {
    if (this.activeCategory === 'All') {
      return this.faq.entries.filter(faq => this.permissionedCategories().map(category => category.title).indexOf(faq.category) > -1);
    } else {
      return this.faq.entries.filter(faq => faq.category === this.activeCategory);
    }
  }

  updateCategory = (event) => {
    event.preventDefault();
    this.activeCategory = event.target.value;
  }

  renderSingleButton = (category) => {
    const isActive = this.activeCategory === category.title;
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
          <label htmlFor="faqCategory">Filter By Category</label>
          <select id="faqCategory" className="form-control" onChange={this.updateCategory} value={this.activeCategory}>
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
        {this.filteredFaqEntries().map((entry, i) => {
          return (
            <article key={i} className="faq-entry">
              <h3 id={'faq-' + i}>{entry.question}</h3>
              <Truncate className="faq-entry-content truncate-container" cutoffSymbol="" charLimit={entry.maxStringLength}>
                {entry.answer}
              </Truncate>
            </article>
          )
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
                {this.renderCategoriesAsButtons(this.permissionedCategories())}
              </div>
              <div className="hidden-sm hidden-md hidden-lg">
                {this.renderCategoriesAsSelectMenu(this.permissionedCategories())}
              </div>
              <div className="horizontal-line-header">
                <h2>
                  {this.activeCategory}
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
