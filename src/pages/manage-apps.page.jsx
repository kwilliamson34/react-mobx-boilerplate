import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom';

import { CardList } from '../components/card-list/card-list';
import { SearchForm } from '../components/search/search-form';
import { Filters } from '../components/filters/filters';


@inject('store')
@observer
export default class ManageAppsPage extends React.Component {

	constructor(props) {
		super(props);
		this.cardListStore = this.props.store.cardListStore;
		this.appCatalogStore = this.props.store.appCatalogStore;
		this.onButtonClick = this.onButtonClick.bind(this);
		this.pageId = 'manageAppsPage';
		this.itemsPerRow = 4;
	}

	componentDidMount() {
		this.cardListStore.fetchCardList();
		this.appCatalogStore.fetchAppCatalog();
		if(!this.props.store.pages[this.pageId]){
			this.props.store.registerPage(this.pageId);
		}
	}

	onButtonClick() {
		this.props.store.changePage(this.pageId);
	}

	paginate(cards, page){
		let totalCards = this.props.store.pages[page] * this.itemsPerRow;
		return cards.slice(0, totalCards);
	}

	get paginatedCards(){
		return this.paginate(this.cardListStore.filteredSearchResults, this.pageId)
	}

	get canLoadMore(){
		let totalItems = this.cardListStore.filteredSearchResults.length;
		return totalItems > this.itemsPerRow  && totalItems > (this.props.store.pages[this.pageId] * this.itemsPerRow);
	}

	render() {
		return (
			<article id="manage-apps-page">
				<div className="container">
					<div className="row">
						<div className="col-xs-12 text-right add-margin-vertical">
							<Link to="/admin/configure-mdm" className="fn-primary">Configure MDM</Link>
						</div>
					</div>
				</div>
				<section className="">
					<div className="container manage-apps">
						<div className="row">
							<div className="col-md-3">
								<h1 className="as-h2">Manage Apps</h1>
							</div>
							<div className="col-md-9 row">
								<div className="col-md-6">
									<Filters store={this.cardListStore} />
								</div>
								<div className="col-md-6">
									<SearchForm store={this.cardListStore} />
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						{this.appCatalogStore.allApps.length && this.cardListStore.searchResults.length &&
							<CardList
								canLoadMore={this.canLoadMore}
								cards={this.paginatedCards}
								handleButtonClick={this.onButtonClick}
								changeAppAvailability={this.appCatalogStore.changeAppAvailability.bind(this.appCatalogStore)}
								changeAppRecommended={this.appCatalogStore.changeAppRecommended.bind(this.appCatalogStore)}
								getMatchingApp={this.appCatalogStore.getMatchingApp.bind(this.appCatalogStore)}/>
						}
					</div>
				</section>
			</article>
		)
	}
}

ManageAppsPage.propTypes = {
	store: PropTypes.object
};
