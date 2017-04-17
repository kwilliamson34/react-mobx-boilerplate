import React from 'react';
import {Link} from 'react-router-dom';

export default class Header extends React.Component {

    render() {
        return (
            <header className="clearfix text-center">
                <h1>Header</h1>
                <ul className="list-inline">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/admin">Administrator Dashboard</Link></li>
                  <li><Link to="/admin/manage-apps">Manage Apps</Link></li>
                  <li><Link to="/app/detail">App Details</Link></li>
                </ul>
            </header>
        )
    }

}
