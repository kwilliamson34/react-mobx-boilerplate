import React from 'react';
import {Link} from 'react-router-dom';
import config from 'config';
import PSESelector from '../pse-selector/pse-selector';

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
                                        <button id="user-dropdown"
                                          role="button"
                                          className="dropdown-toggle btn btn-default" data-toggle="dropdown">
                                            <i aria-hidden="true" className="icon-profile"></i>
                                            <span className="sr-only">Profile Dropdown</span>
                                        </button>
                                        <ul role="menu" className="dropdown-menu dropdown-menu-right" aria-labelledby="user-dropdown">
                                            <li role="presentation">
                                                <Link to="/profile/manage-account">Manage My Account</Link>
                                            </li>
                                            <li role="presentation">
                                                <Link to="/profile/change-password">Change Password</Link>
                                            </li>
                                            <li role="presentation">
                                                <Link to="/profile/configure-location">Configure Location</Link>
                                            </li>
                                            <li role="presentation">
                                                <Link to="/profile/configure-news">Configure News</Link>
                                            </li>
                                            <li role="presentation">
                                                <Link to="/profile/configure-mdm">Configure MDM</Link>
                                            </li>
                                            <li role="presentation">
                                                <a href={config.haloLogout}>
                                                    <i aria-hidden="true" className="icon-logout"></i>
                                                    Log Out
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <Link to="/faq">
                                        <i aria-hidden="true" className="icon-help"></i>
                                        <span className="sr-only">Go to Frequently Asked Questions</span>
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
