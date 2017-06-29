import React from 'react';
import PropTypes from 'prop-types';

import {observer} from 'mobx-react';

import {SummaryCard} from '../summary-card/summary-card.jsx';
import AppManagementBlock from '../app-management-block/app-management-block.jsx';

@observer
export class CardList extends React.Component {

  static propTypes = {
    filteredAppsCount: PropTypes.number.isRequired,
    cards: PropTypes.array.isRequired,
    numPagesShown: PropTypes.number,
    itemsPerPage: PropTypes.number.isRequired,
    isLoading: PropTypes.bool,
    idToFocus: PropTypes.number,
    title: PropTypes.string,
    handleLoadMoreClick: PropTypes.func,
    handleViewAllAppsClick: PropTypes.func,
    changeAppAvailability: PropTypes.func.isRequired,
    changeAppRecommended: PropTypes.func.isRequired,
    getMatchingApp: PropTypes.func.isRequired,
    mdmIsConfigured: PropTypes.bool.isRequired
  }

  static defaultProps = {
    cards: [],
    title: ''
  }

  get canLoadMore() {
    let totalItems = this.props.filteredAppsCount;
    return totalItems > this.props.itemsPerPage && totalItems > (this.props.numPagesShown * this.props.itemsPerPage);
  }

  get showNoResultsBlock() {
    return this.props.cards.length <= 0 && !this.props.isLoading;
  }

  renderCard(card, i) {
    return (
      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 center-block" key={i}>
        <SummaryCard display={card} shouldFocus={i === this.props.idToFocus}/>
        <AppManagementBlock
          psk={card.app_psk}
          getMatchingApp={this.props.getMatchingApp}
          changeAppAvailability={this.props.changeAppAvailability}
          changeAppRecommended={this.props.changeAppRecommended}
          mdmIsConfigured={this.props.mdmIsConfigured}/>
      </div>
    )
  }

  render() {
    const hideCardList = (this.props.isLoading || this.showNoResultsBlock);
    return (
      <section className={`card-list-container ${hideCardList && 'card-list-substitute'}`}>
        {this.props.isLoading
          ? <div className="row">
              <div className="loading-container">
                <h2><i className="icon-reload"></i>Loading apps&hellip;</h2>
                <div className="ghost-container">
                  <div className="app-ghost"><div></div></div>
                  <div className="app-ghost hidden-xs"><div></div></div>
                  <div className="app-ghost hidden-xs"><div></div></div>
                  <div className="app-ghost hidden-xs hidden-sm"><div></div></div>
                </div>
              </div>
            </div>
          : <div className="row">
              {this.props.cards.map((card, i) => {
                return this.renderCard(card, i)
              })}
            </div>
        }

        {this.props.isLoading || this.canLoadMore && this.props.handleLoadMoreClick &&
          <div className="card-list-load-more">
            <button id="card-list-load-more-btn" className="btn fn-primary" onClick={this.props.handleLoadMoreClick}>Load More</button>
          </div>
        }
        {this.showNoResultsBlock &&
          <div>
            <h2>No Results</h2>
            <p>There are no results to display. Please retry your search.</p>
            {this.props.handleViewAllAppsClick &&
              <button type="button" className="btn fn-primary" onClick={this.props.handleViewAllAppsClick}>View All Apps</button>
            }
          </div>
        }
      </section>
    );
  }
}
