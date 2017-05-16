import React from 'react';
import PropTypes from 'prop-types';

import {observer} from 'mobx-react';

import {SummaryCard} from '../summary-card/summary-card.jsx';
import AppManagementBlock from '../app-management-block/app-management-block.jsx';

@observer
export class CardList extends React.Component {

  static propTypes = {
    cards: PropTypes.array.isRequired,
    title: PropTypes.string,
    canLoadMore: PropTypes.bool,
    handleButtonClick: PropTypes.func,
    appManagementActions: PropTypes.object.isRequired
  }

  static defaultProps = {
    cards: [],
    title: ''
  }

  render() {
    console.log('CARDLIST CURRENTAPP?    ', this.currentApp);
    return (
      <section className="card-list-container col-md-12 col-xs-12">
        <div className="container">
          {this.props.title && (
            <h2 className="card-list-title">
              {this.props.title}
              <span className="sr-only">List</span>
            </h2>
          )}
          <div className="card-list-cards row">
            {this.props.cards.map((card, i) => {
              return (
                <div className="col-md-3 col-xs-4 center-block" key={i}>
                  <SummaryCard display={card}/>
                  <div className="hidden-xs">
                    <AppManagementBlock app={card} appManagementActions={this.props.appManagementActions}/>
                  </div>
                </div>
              )
            })}
          </div>
          {this.props.canLoadMore && (
            <div className="card-list-load-more">
              <button className="btn fn-primary" onClick={this.props.handleButtonClick}>Load More</button>
            </div>
          )}
        </div>
      </section>
    );
  }
}
