import 'jquery';
import 'bootstrap';

import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Link
} from 'react-router-dom';
import ScrollToTop from './core/services/scroll-to-top';

//State Management
import {
	Provider,
	observer
} from 'mobx-react';
import {
	pseMasterStore
} from './core/stores/master.store';

//Styles
import '../styles/app.scss';

//Common Components
import Header from './components/header/header';
import Footer from './components/footer/footer.jsx';

//Pages

import HomePage from './pages/home.page';

//admin
import ManageUsersPage from './pages/manage-users.page';
import ManageBillingPage from './pages/manage-billing.page';
import ManageServicesPage from './pages/manage-services.page';
import ManageAppsPage from './pages/manage-apps.page';
import ManagePushToTalkPage from './pages/manage-push-to-talk.page';
import ManageWirelessReportsPage from './pages/manage-wireless-reports.page';
import AdminDashboardPage from './pages/admin-dashboard.page';

//MP pages
import ShopDevicesPage from './pages/shop-devices.page'
import ShopSpecializedPage from './pages/shop-specialized.page';
import ShopSolutionsPage from './pages/shop-solutions.page';

//content pages
import AppDetailsPage from './pages/app-details.page';

//Help section
import HelpCenterPage from './pages/help-center.page';

import NoMatch from './pages/no-match.page';

@observer
export default class App extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		const AppHub = ({
			match
		}) => {
			return (
				<div id="app-page">
					<Switch>
						<Route path={`${match.url}/:appId`} component={AppDetailsPage} />
						<Route exact path={match.url} render={() => (
							<article>
								<div className="container">
									<div className="col-xs-12">
										<h1>Sorry.</h1>
										<p>We couldn't find the app you were looking for.  <Link to="manage-apps">Go to the App Catalog</Link></p>
									</div>
								</div>
							</article>
						)}/>
					</Switch>
				</div>
			)
		}

		return (
			<Router>
				<Provider store={pseMasterStore}>
					<ScrollToTop>
						<div id="PSE-wrapper">
							<a href="#main-content" className="sr-only sr-only-focusable">Skip Navigation</a>
							<Header/>
							<main id="main-content">
								<Switch>
									<Route exact path="/" component={HomePage}/>
									<Route path="/admin/manage-users" component={ManageUsersPage} />
									<Route path="/admin/manage-billing" component={ManageBillingPage} />
									<Route path="/admin/manage-services" component={ManageServicesPage} />
									<Route path="/admin/manage-apps" component={ManageAppsPage} />
									<Route path="/admin/manage-push-to-talk" component={ManagePushToTalkPage} />
									<Route path="/admin/manage-wireless-reports" component={ManageWirelessReportsPage} />
									<Route path="/admin" component={AdminDashboardPage} />
									<Route path="/app" component={AppHub} />
									<Route path="/shop-devices" component={ShopDevicesPage} />
									<Route path="/shop-specialized" component={ShopSpecializedPage} />
									<Route path="/shop-solutions" component={ShopSolutionsPage} />
									<Route path="/help-center" component={HelpCenterPage} />
									<Route component={NoMatch}/>
								</Switch>
							</main>
							<Footer/>
						</div>
					</ScrollToTop>
				</Provider>
			</Router>
		)
	}
}
