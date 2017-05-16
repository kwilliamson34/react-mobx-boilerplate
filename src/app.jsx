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
import { Provider, observer } from 'mobx-react';
import { pseMasterStore } from './core/stores/master.store';

//Styles
import '../styles/app.scss';

//Common Components
import Header from './components/header/header';
import Footer from './components/footer/footer.jsx';

//Pages
import HomePage from './pages/home.page';
import AdminDashboardPage from './pages/admin-dashboard.page';
import ManageAppsPage from './pages/manage-apps.page';
import AppDetailsPage from './pages/app-details.page';
import HelpCenterPage from './pages/help-center.page';
import ShopPlansView from './pages/shop-plans.page';
import NoMatch from './pages/no-match.page';

@observer
export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const AppHub = ({ match }) => {
			return(
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

		// if( document.cookie.indexOf("cookiename=") < 0) {
		// 	alert("Cookie not found, redirecting you.");
		// 	window.location.replace('http://url');
		// }
		console.log(document.cookie)

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
                        <Route path="/admin" component={AdminDashboardPage} />
                        <Route path="/manage-apps" component={ManageAppsPage}/>
                        <Route path="/help-center" component={HelpCenterPage} />
                        <Route path="/shop-plans" component={ShopPlansView} />
												<Route path="/app" component={AppHub} />
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
