import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ScrollToTop from './components/scroll-to-top';

//State Management
import {Provider, observer} from 'mobx-react';
import {PSEStore} from './core/stores/pse.store';

//Styles
import '../styles/app.scss';

//Common Components
import Header from './components/header';
import Footer from './components/footer';

//Views
import HomeView from './views/home';
import AdminDashboardView from './views/admin-dashboard';
import ManageAppsView from './views/manage-apps';
import AppDetailsView from './views/app-details';

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <ScrollToTop>
                <Provider store="pseStore">
                    <div id="PSE-wrapper">
                        <Header/>
                        <Route exact path="/" component={HomeView}/>
                        <Route exact path="/admin" component={AdminDashboardView} />
                        <Route path="/admin/manage-apps" component={ManageAppsView}/>
                        <Route path="/app/detail" component={AppDetailsView} />
                        <Footer/>
                    </div>
                </Provider>
              </ScrollToTop>
            </Router>
        )
    }
}
