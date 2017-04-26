import React from 'react';
import PropTypes from 'prop-types'; // if not @injecting the store, use prop-types
import { Link } from 'react-router-dom';

import { observer } from 'mobx-react';
// import { inject, observer, PropTypes } from 'mobx-react'; // if @injecting, use mobx PropTypes to get observableArray etc.

import { SummaryCard } from '../summary-card/summary-card.jsx';


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
        // this.state = {
        //     showFewer: true
        // }
    }

    // handleButtonClick = () => {
    //     this.setState({showFewer: !this.state.showFewer});
    // }

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
                        {this.props.cards.map((card, i) =>{
                            return (
                                <div className="col-md-3 col-xs-4 center-block" key={i} >
                                    <Link to="/faq">
                                        <SummaryCard display={card}></SummaryCard>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                {/*<button className="btn fn-primary center-block" onClick={this.handleButtonClick}>
                    Show {(this.state.showFewer)
                    ? 'More'
                    : 'Fewer'}
                </button>*/}
                </div>
            </section>
        );
    }
}




