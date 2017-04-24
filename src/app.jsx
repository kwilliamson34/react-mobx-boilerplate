import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ScrollToTop from './core/services/scroll-to-top';

//State Management
import {Provider, observer} from 'mobx-react';
import {pseMasterStore} from './core/stores/master.store';

//Styles
import '../styles/app.scss';

//Common Components
import Header from './components/header/header';
import Footer from './components/footer';

//Pages
import HomePage from './pages/home.page';
import AdminDashboardPage from './pages/admin-dashboard.page';
import ManageAppsPage from './pages/manage-apps.page';
import AppDetailsPage from './pages/app-details.page';
import HelpCenterPage from './pages/help-center.page';

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
                        <Header/>
                        <Route exact path="/" component={HomePage}/>
                        <Route exact path="/admin" component={AdminDashboardPage} />
                        <Route path="/admin/manage-apps" component={ManageAppsPage}/>
                        <Route path="/app/detail" component={AppDetailsPage} />
                        <Route exact path="/help-center" component={HelpCenterPage} />
                        <Footer/>
                    </div>
                  </ScrollToTop>
              </Provider>
            </Router>
        )
    }
}
