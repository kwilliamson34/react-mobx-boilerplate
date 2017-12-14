import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {observable, computed} from 'mobx';
import _ from 'lodash';

import PageTitle from '../page-title/page-title';
import Truncate from '../truncate/truncate';

@observer
export class Faq extends React.Component {

  static propTypes = {
    faqData: PropTypes.object,
    userRolesArray: PropTypes.array
  }

  constructor(props) {
    super(props);
    this.faq = this.props.faqData;
  }

  componentWillUnmount() {
    this.activeCategory = 'All';
  }

  @observable activeCategory = 'All';
  @computed get categoriesToShow() {
    //Requirements assumption: In the event of a combination role, YES overrides NO
    return this.faq.categories.filter(category => {
      return _.difference(this.props.userRolesArray, category.hideFromRoles).length > 0;
    });
  }
  @computed get entriesToShow() {
    return this.faq.entries.filter(faq => {
      const titlesToShow = this.categoriesToShow.map(category => category.title);
      return titlesToShow.indexOf(faq.category) > -1;
    });
  }
  @computed get activeEntries() {
    if (this.activeCategory === 'All') {
      return this.entriesToShow;
    } else {
      return this.entriesToShow.filter(faq => faq.category === this.activeCategory);
    }
  }

  updateCategory = (event) => {
    event.preventDefault();
    this.activeCategory = event.target.value;
  }

  renderSingleButton = (category) => {
    const isActive = this.activeCategory === category.title;
    return (<button role="button" value={category.title} onClick={this.updateCategory} className={`as-link category-tab-button ${isActive
        ? 'active'
        : ''}`}>
      {category.title}
    </button>)
  }

  renderCategoriesAsButtons = (categories) => {
    return (<div className="faq-category-tabs">
      <ul>
        {
          categories.map(category => {
            return (<li key={category.title}>
              {this.renderSingleButton(category)}
            </li>)
          })
        }
      </ul>
    </div>)
  }

  renderCategoriesAsSelectMenu = (categories) => {
    return (<div className="faq-category-select">
      <form>
        <label htmlFor="faqCategory">Filter By Category</label>
        <select id="faqCategory" className="form-control" onChange={this.updateCategory} value={this.activeCategory}>
          <option value="All">All Categories</option>
          {
            categories.map((category, i) => {
              return (<option key={i} value={category.title}>{category.title}</option>)
            })
          }
        </select>
      </form>
    </div>)
  }

  renderFaqEntriesList = () => {
    return (<div className="faq-entry-list">
      {
        this.activeEntries.map((entry, i) => {
          return (<article key={entry.question} className="faq-entry">
            <h3 id={'faq-' + i}>{entry.question}</h3>
            <Truncate className="faq-entry-content truncate-container" cutoffSymbol="" charLimit={entry.maxStringLength}>
              {entry.answer}
            </Truncate>
          </article>)
        })
      }
    </div>)
  }

  render() {
    return (<div>
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
              {this.renderCategoriesAsButtons(this.categoriesToShow)}
            </div>
            <div className="hidden-sm hidden-md hidden-lg">
              {this.renderCategoriesAsSelectMenu(this.categoriesToShow)}
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
    </div>);
  }
}
