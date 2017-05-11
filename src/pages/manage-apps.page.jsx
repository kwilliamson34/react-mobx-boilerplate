import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';

import TitlePane from '../components/title-pane/title-pane';
import { CardList } from '../components/card-list/card-list';
import { SearchForm } from '../components/search/search-form';
import { Filters } from '../components/filters/filters';


@inject('store')
@observer
export default class ManageAppsPage extends React.Component {

	constructor(props) {
		super(props);
		this.cardListStore = this.props.store.cardListStore;
		this.onButtonClick = this.onButtonClick.bind(this);
		this.pageId = 'manageAppsPage';
		this.itemsPerRow = 4;
	}

	componentDidMount() {
		this.cardListStore.getAdminApps();
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
				<TitlePane pageTitle="Manage Apps" />
				<section className="">
					<div className="container manage-apps">
						<div className="row">
							<div className="col-md-3">
								<h2>Manage Apps</h2>
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
						<CardList
							canLoadMore={this.canLoadMore}
							cards={this.paginatedCards}
							handleButtonClick={this.onButtonClick}
							appManagementActions={{
								changeAppAvailability: this.props.store.cardListStore.changeAppAvailability.bind(this.props.store.cardListStore),
								changeAppRecommended: this.props.store.cardListStore.changeAppRecommended.bind(this.props.store.cardListStore)
							}}/>
					</div>
				</section>
			</article>
		)
	}
}

ManageAppsPage.propTypes = {
	store: PropTypes.object
};
