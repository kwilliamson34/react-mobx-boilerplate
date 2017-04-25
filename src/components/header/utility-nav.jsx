import React from 'react';
import {Link} from 'react-router-dom';
import {Dropdown, MenuItem} from 'react-bootstrap';

import PSESelector from '../pse-selector';

export default class UtilityNav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="fnnav__utility">
                <div className="container">
                    <div className="row">
                        <nav className="dropdown-group">
                            <ul>
                                <li>
                                    <PSESelector/>
                                </li>
                                <li>
                                    <div className="dropdown btn-group">
                                        <button id="user-dropdown" role="button" className="dropdown-toggle btn btn-default">
                                            <i aria-hidden="true" className="icon-profile"></i>
                                            <span className="sr-only">Profile Dropdown</span>
                                        </button>
                                        <ul role="menu" className="dropdown-menu dropdown-menu-right" aria-labelledby="user-dropdown">
                                            <li role="presentation">Manage My Account</li>
                                            <li role="presentation">Change Password</li>
                                            <li role="presentation">Configure Location</li>
                                            <li role="presentation">Configure News</li>
                                            <li role="presentation">Configure MDM</li>
                                            <li role="presentation">
                                                <i aria-hidden="true" className="icon-logout"></i>
                                                Log Out
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <Link to="/help-center" activeClassName="active">
                                        <i aria-hidden="true" className="icon-help"></i>
                                        <span className="sr-only">Go to Help Center</span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }

}
