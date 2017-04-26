import React from 'react';
import {inject, observer} from 'mobx-react';



import { CardList } from '../components/card-list/card-list.jsx';
import TitlePane from '../components/title-pane';

@inject('store')
@observer
export default class ManageAppsView extends React.Component {

    constructor(props) {
		super(props);
		this.homeStore = this.props.store.homeStore;
	}

	componentDidMount(){
		this.homeStore.getHomeCards();
	}

    render() {
        return (
          <main id="content-main">
            <TitlePane pageTitle="Manage Apps" />
            <section className="placeholder-long">
                {/*<div className="container">*/}
                    <h2>Manage Apps</h2>
                    <p>Filters Here</p>
                    {/*<div className="">*/}
                    <CardList title="Apps" cards={this.homeStore.recommendedCards}></CardList>    
                    {/*</div>*/}
                {/*</div>*/}
            </section>
          </main>
        )
    }
}
