import React from 'react';

import TitlePane from '../components/title-pane/title-pane';

import { CardList } from '../components/card-list/card-list.jsx';
import { SearchForm } from '../components/search/search-form.jsx';
import { Filters } from '../components/filters/filters.jsx';
import {inject, observer} from 'mobx-react';

@inject('store')
@observer
export default class ManageAppsView extends React.Component {

	constructor(props) {
		super(props);
		// this.homeStore = this.props.store.homeStore;
		// this.searchStore = this.props.store.searchStore;
		this.cardListStore = this.props.store.cardListStore;
	}

	componentDidMount(){
		this.cardListStore.getHomeCards();
	}

	render() {
		return (
			<main className="content-main">
				<TitlePane pageTitle="Manage Apps" />
					<section className="">
						<div className="container">
							<div className="row">
								<div className="col-md-4">
									<h2>Manage Apps</h2>
								</div>
								<div className="col-md-8 row">
									<div className="col-md-4">
										<Filters store={this.cardListStore} />
									</div>
									<div className="col-md-8">
										<SearchForm store={this.cardListStore} />
									</div>
								</div>
							</div>
						</div>
							<div className="row">
								{/*TODO - clean this up to just change the store and title.*/}
								{/*{!this.cardListStore.isFiltered &&
									<CardList title="Apps" cards={this.cardListStore.searchResults}></CardList>
								}
								{this.cardListStore.shouldShowSearchResults && !this.cardListStore.isLoading &&
									<CardList title="Search Results" cards={this.cardListStore.searchResults}></CardList>
								}*/}
								{/*{this.cardListStore.isFiltered &&*/}
									<CardList title="Apps" cards={this.cardListStore.filteredSearchResults} />
								{/*}*/}
							</div>
					</section>
				</main>
			)
	}
}
