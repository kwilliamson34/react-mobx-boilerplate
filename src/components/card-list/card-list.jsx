import React from 'react';
import PropTypes from 'prop-types';

import {observer} from 'mobx-react';

import {SummaryCard} from '../summary-card/summary-card.jsx';
import AppManagementBlock from '../app-management-block/app-management-block.jsx';

@observer
export class CardList extends React.Component {

  static propTypes = {
    cards: PropTypes.array.isRequired,
    numPagesShown: PropTypes.number,
    itemsPerPage: PropTypes.number.isRequired,
    isLoading: PropTypes.bool,
    title: PropTypes.string,
    handleLoadMoreClick: PropTypes.func,
    handleViewAllAppsClick: PropTypes.func,
    changeAppAvailability: PropTypes.func.isRequired,
    changeAppRecommended: PropTypes.func.isRequired,
    getMatchingApp: PropTypes.func.isRequired
  }

  static defaultProps = {
    cards: [],
    title: ''
  }

  get canLoadMore() {
    let totalItems = this.props.cards.length;
    return totalItems > this.props.itemsPerPage && totalItems > (this.props.numPagesShown * this.props.itemsPerPage);
  }

  get showNoResultsBlock() {
    return this.props.cards.length <= 0 && !this.props.isLoading;
  }

  renderCard(card, i) {
    return (
      <div className="col-md-3 col-xs-4 center-block" key={i}>
        <SummaryCard display={card}/>
        <div className="hidden-xs">
          <AppManagementBlock
            psk={card.app_psk}
            getMatchingApp={this.props.getMatchingApp}
            changeAppAvailability={this.props.changeAppAvailability}
            changeAppRecommended={this.props.changeAppRecommended}/>
        </div>
      </div>
    )
  }

  render() {
    const hideCardList = (this.props.isLoading || this.showNoResultsBlock);
    return (
      <section className="card-list-container col-md-12 col-xs-12">
        <div className={`container ${hideCardList && 'card-list-substitute'}`}>
          {this.props.isLoading
            ? <h2>Loading...</h2>
            : <div className="row">
                {this.props.cards.map((card, i) => {
                  return this.renderCard(card, i)
                })}
                {this.canLoadMore && this.props.handleLoadMoreClick &&
                  <div className="card-list-load-more">
                    <button className="btn fn-primary" onClick={this.props.handleLoadMoreClick}>Load More</button>
                  </div>
                }
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
        </div>
      </section>
    );
  }
}
