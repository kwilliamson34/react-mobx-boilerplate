import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import { FaqEntry } from './faq-entry.jsx';

@observer
export class FaqMain extends React.Component {

	static propTypes = {
		store: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);
        this.updateCategoryBySelect = this.updateCategoryBySelect.bind(this);
        this.updateCategoryByTab = this.updateCategoryByTab.bind(this);
        this.state = { category: 'ALL' };
	}

    componentWillMount() {
		this.props.store.toggleFaqPageHeaderButton(true);
    }

    componentWillUnmount() {
		this.props.store.toggleFaqPageHeaderButton(false);
        this.props.store.updateFilter('ALL');
    }

    updateCategoryBySelect(event) {
        event.preventDefault();
        this.setState({category: event.target.value});
		this.props.store.updateFilter(event.target.value);
    }

    updateCategoryByTab(category, event) {
        event.preventDefault();
        this.setState({category: category});
		this.props.store.updateFilter(category);
    }

	render() {

		let topicList = this.props.store.faqs.categories.map((category, i) => {
            return ( <option key={i} value={category.toUpperCase()}>{category} </option> )
		});

		let categoryList = <ul>
                <li key={0}>
                    <a href="#"
						className={(this.state.category === 'ALL'?'active':'')}
						onClick={this.updateCategoryByTab.bind(this,'ALL')}>ALL</a>
                </li>
                {this.props.store.faqs.categories.map((category, i) => {
					return ( <li key={i} >
						<a href="#"
							onClick={this.updateCategoryByTab.bind(this,category)}
							className={(this.state.category === category?'active category-tab-button':'category-tab-button')}>
							{category.toUpperCase().replace(/\s/g,'\u00a0') + ' '}
						</a></li> )
		})}</ul>;

        // Regex on the category replaces spaces with &nbsp;
        // to ensure that the category doesn't end up on a new line

		let faqEntryList = this.props.store.filteredFaqEntries.map((entry) => {
			return (<FaqEntry faq={entry} key={entry.id} num={entry.id} />)
		});

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
                                <div className="faq-category-tabs">
                                    {categoryList}
                                </div>
                            </div>
                            <div className="hidden-sm hidden-md hidden-lg">
                                <div className="faq-category-select">
                                    <form>
                                        <label htmlFor="faqCategory">FILTER BY CATEGORY</label>
                                        <select id="faqCategory" className="form-control" onChange={this.updateCategoryBySelect.bind(this)} value={this.props.store.faqCategoryFilter}>
                                            <option value="ALL">All Categories</option>
                                            {topicList}
                                        </select>
                                    </form>
                                </div>
                            </div>
                            <div className="horizontal-line-header">
                                <h2>
                                    {this.state.category}
                                </h2>
                            </div>
                            <div className="faq-entry-list">
                                {faqEntryList}
                            </div>
                        </div>
                    </div>
                </article>
            </div>
		);
	}
}