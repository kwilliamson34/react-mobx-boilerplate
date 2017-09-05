import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {FaqEntry} from './faq-entry.jsx';
import $ from 'jquery';

@observer
export class FaqMain extends React.Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  componentWillMount() {
    this.store.toggleFaqPageHeaderButton(true);
  }

  componentWillUnmount() {
    this.store.toggleFaqPageHeaderButton(false);
    this.store.updateFilter('ALL');
  }

  updateCategory = (event) => {
    event.preventDefault();
    this.store.updateFilter(event.target.value || $(event.target).data('value'));
  }

  renderSingleButton = (category, key) => {
    const isActive = this.store.faqCategoryFilter === category;
    return (
      <li key={key}>
        <a href="#" role="button" data-value={category} onClick={this.updateCategory} className={`category-tab-button ${isActive
          ? 'active'
          : ''}`}>
          {category}
        </a>
      </li>
    )
  }

  renderCategoriesAsButtons = () => {
    return (
      <div className="faq-category-tabs">
        <ul>
          {this.renderSingleButton('ALL', 0)}
          {this.store.faqs.categories.map((category, i) => {
            return this.renderSingleButton(category, i);
          })}
        </ul>
      </div>
    )
  }

  renderCategoriesAsSelectMenu = () => {
    return (
      <div className="faq-category-select">
        <form>
          <label htmlFor="faqCategory">FILTER BY CATEGORY</label>
          <select id="faqCategory" className="form-control" onChange={this.updateCategory} value={this.store.faqCategoryFilter}>
            <option value="ALL">All Categories</option>
            {this.store.faqs.categories.map((category, i) => {
              return (
                <option key={i} value={category}>{category}</option>
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
        {this.store.filteredFaqEntries.map((entry) => {
          return (<FaqEntry faq={entry} key={entry.id} num={entry.id}/>)
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
                  <h1>Frequently Asked&nbsp;Questions</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <article className="container">
          <div className="row">
            <div className="faq-header col-xs-12 col-sm-10 col-sm-offset-1">
              <div className="hidden-xs">
                {this.renderCategoriesAsButtons()}
              </div>
              <div className="hidden-sm hidden-md hidden-lg">
                {this.renderCategoriesAsSelectMenu()}
              </div>
              <div className="horizontal-line-header">
                <h2>
                  {this.store.faqCategoryFilter}
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
