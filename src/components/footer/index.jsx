import React from 'react';
import {Link} from 'react-router-dom';

export default class Footer extends React.Component {

    render() {
        return (
            <footer role="banner" className="clearfix text-center">
                <h3>Footer</h3>
                <ul className="list-inline">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/admin">Administrator Dashboard</Link></li>
                  <li><Link to="/admin/manage-apps">Manage Apps</Link></li>
                  <li><Link to="/app/detail">App Details</Link></li>
                </ul>
            </footer>
        )
    }

}
