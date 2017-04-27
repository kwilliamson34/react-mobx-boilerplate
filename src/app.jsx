import 'jquery';
import 'bootstrap';

import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ScrollToTop from './core/services/scroll-to-top';

//State Management
import {Provider, observer} from 'mobx-react';
import {pseMasterStore} from './core/stores/master.store';

//Styles
import '../styles/app.scss';

//Common Components

import Header from './components/header/header';
import Footer  from './components/footer/footer.jsx';

//Pages

import HomePage from './pages/home.page';
import AdminDashboardPage from './pages/admin-dashboard.page';
import ManageAppsPage from './pages/manage-apps.page';
import AppDetailsPage from './pages/app-details.page';
import HelpCenterPage from './pages/help-center.page';
import ShopPlansView from './pages/shop-plans.page';
import ShopDevicesView from './pages/shop-devices.page';

import NoMatch from './pages/no-match.page';


@observer
export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
              <Provider store={pseMasterStore}>
                  <ScrollToTop>
                    <div id="PSE-wrapper">
                        <a href="#main-content" className="sr-only sr-only-focusable">Skip Navigation</a>
                        <Header/>
                        <Switch>
                          <Route path="/" exact component={HomePage}/>
                          <Route path="/admin" exact component={AdminDashboardPage} />
                          <Route path="/manage-apps" exact component={ManageAppsPage}/>
                          <Route path="/help-center" exact component={HelpCenterPage} />
                          <Route path="/shop-plans" exact component={ShopPlansView} />
                          <Route path="/shop-devices" exact component={ShopDevicesView} />
                          <Route path="/app" component={AppDetailsPage} />
                          <Route component={NoMatch}/>
                        </Switch>
                        <Footer/>
                    </div>
                  </ScrollToTop>
              </Provider>
            </Router>
        )
    }
}
