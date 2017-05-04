import React from 'react';
import PropTypes from 'prop-types'; // if not @injecting the store, use prop-types

import { observer } from 'mobx-react';

import { SummaryCard } from '../summary-card/summary-card.jsx';
import { AppManagementBlock } from '../app-management-block/app-management-block.jsx';


@observer
export class CardList extends React.Component {


    // propTypes go in as statics
    static propTypes = {
        cards: PropTypes.array.isRequired,
        // cards: PropTypes.observableArray.isRequired, // if using mobx PropTypes, can use observables.
        title: PropTypes.string
    }

    static defaultProps = {
        cards: [],
        title: ''
    }

    constructor(props) {
        super(props);
        this.cards = this.props.cards;
        this.canLoadMore = this.props.canLoadMore;
    }

    componentWillReceiveProps(nextProps) {
        this.cards = nextProps.cards;
        this.canLoadMore = nextProps.canLoadMore;
    }

    render() {
        return (
            <section className="card-list-container col-md-12 col-xs-12">
                <div className="container">
                    {this.props.title &&
                        (<h2 className="card-list-title">
                            {this.props.title}
                            <span className="sr-only">List</span>
                        </h2>)
                    }
                    <div className="card-list-cards row">
                        {this.cards.map((card, i) =>{
                            return (
                                <div className="col-md-3 col-xs-4 center-block" key={i} >
                                    <SummaryCard display={card}></SummaryCard>
                                    <div className="hidden-xs">
                                        <AppManagementBlock app={card} ></AppManagementBlock>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {this.canLoadMore &&
                        (<div className="card-list-load-more">
                            <button className="btn fn-primary" onClick={this.props.handleButtonClick}>Load More</button>
                        </div>)
                    }
                </div>
            </section>
        );
    }
}
