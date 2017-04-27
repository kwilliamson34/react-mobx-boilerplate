import React from 'react';

import TitlePane from '../components/title-pane/title-pane';

import { CardList } from '../components/card-list/card-list.jsx';
import { SearchForm } from '../components/search/search-form.jsx';
import {inject, observer} from 'mobx-react';

import {observer,inject} from 'mobx-react';

@inject('store')
@observer
export default class ManageAppsView extends React.Component {

	constructor(props) {
		super(props);
		this.homeStore = this.props.store.homeStore;
		this.searchStore = this.props.store.searchStore;
	}

	componentDidMount(){
		this.homeStore.getHomeCards();
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
										<p>Filters Here</p>
									</div>
									<div className="col-md-8">
										<SearchForm store={this.searchStore} />
									</div>
								</div>
							</div>
						</div>
							<div className="row">
								{/*TODO - clean this up to just change the store and title.*/}
								{!this.searchStore.shouldShowSearchResults &&
									<CardList title="Apps" cards={this.homeStore.recommendedCards}></CardList>
								}
								{this.searchStore.shouldShowSearchResults && !this.searchStore.isLoading &&
									<CardList title="Search Results" cards={this.searchStore.searchResults}></CardList>
								}
							</div>
					</section>
				</main>
			)
	}
}
