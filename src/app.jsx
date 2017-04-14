import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

//State Management
import {Provider, observer} from 'mobx-react';
import {PSEStore} from './core/stores/pse.store';

//Styles
import '../styles/app.scss';

//Common Components
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';

//Views
import Home from './views/home.jsx';
import Dashboard from './views/dashboard.jsx';

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Provider store="pseStore">
                    <div id="PSE-wrapper">
                        <Header/>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/admin-dashboard" component={Dashboard}/>
                        <Footer/>
                    </div>
                </Provider>
            </Router>
        )
    }
}
