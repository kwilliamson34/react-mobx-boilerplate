import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ScrollToTop from './core/services/scroll-to-top';

//State Management
import {Provider, observer} from 'mobx-react';
import {pseStore} from './core/stores/master.store';

//Styles
import '../styles/app.scss';

//Common Components
import Header from './components/header';
//import Footer from './components/footer';
import { Footer } from './components/footer/footer.jsx';

//Pages
import HomeView from './pages/home.page';
import AdminDashboardView from './pages/admin-dashboard.page';
import ManageAppsView from './pages/manage-apps.page';
import AppDetailsView from './pages/app-details.page';
import ShopPlansView from './pages/shop-plans.page';
import ShopDevicesView from './pages/shop-devices.page';

@observer
export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
              <Provider store={pseStore}>
                  <ScrollToTop>
                    <div id="PSE-wrapper">
                        <Header/>
                        <Route exact path="/" component={HomeView}/>
                        <Route exact path="/admin" component={AdminDashboardView} />
                        <Route path="/admin/manage-apps" component={ManageAppsView}/>
                        <Route path="/app/detail" component={AppDetailsView} />
                        <Route path="/shop-plans" component={ShopPlansView} />
                        <Route path="/shop-devices" component={ShopDevicesView} />
                        <Footer/>
                    </div>
                  </ScrollToTop>
              </Provider>
            </Router>
        )
    }
}
