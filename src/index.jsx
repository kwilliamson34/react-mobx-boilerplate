import 'jquery';

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ScrollToTop from './core/services/scroll-to-top';

//State Management
import {observer, PropTypes} from 'mobx-react';
import {PSEStore} from './core/stores/master.store';

//Styles
import '../styles/app.scss';

//Common Components
import Header from './components/header/index';
import Footer from './components/footer/index';

//Views
import HomeView from './views/home';
import AdminDashboardView from './views/admin-dashboard';
import ManageAppsView from './views/manage-apps';
import AppDetailsView from './views/app-details';

@observer
class App extends React.Component {

    constructor(props) {
        super(props);
        this.store = this.props.store;
    }

    render() {
        return (
            <Router>
                <ScrollToTop>
                    <div id="PSE-wrapper">
                        <Header/>
                        <Route exact path="/" component={HomeView}/>
                        <Route exact path="/admin" component={AdminDashboardView} />
                        <Route path="/admin/manage-apps" component={ManageAppsView}/>
                        <Route path="/app/detail" component={AppDetailsView} />
                        <Footer/>
                    </div>
              </ScrollToTop>
            </Router>
        )
    }
}

App.propTypes = {
  store: PropTypes.observableObject
}

ReactDOM.render(<App store={PSEStore}/>, document.getElementById('app') );
