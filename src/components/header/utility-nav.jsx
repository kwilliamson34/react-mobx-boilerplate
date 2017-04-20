import React from 'react';
import {Grid, Row, Dropdown, MenuItem} from 'react-bootstrap';

import PSESelector from '../pse-selector';

export default class UtilityNav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="fnnav__utility">
                <Grid>
                    <Row>
                        <nav className="dropdown-group">
                            <ul>
                                <li>
                                    <PSESelector />
                                </li>
                                <li>
                                    <Dropdown id="user-dropdown" pullRight>
                                        <Dropdown.Toggle noCaret>
                                            <i aria-hidden="true" className="icon-profile"></i>
                                            <span className="sr-only">Profile Dropdown</span>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu pullRight>
                                            <MenuItem eventKey='1'>Manage My Account</MenuItem>
                                            <MenuItem eventKey='2'>Change Password</MenuItem>
                                            <MenuItem eventKey='3'>Configure Location</MenuItem>
                                            <MenuItem eventKey='4'>Configure News</MenuItem>
                                            <MenuItem eventKey='5'>Configure MDM</MenuItem>
                                            <MenuItem eventKey='6'>
                                                <i aria-hidden="true" className="icon-logout"></i>
                                                Log Out</MenuItem>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li>
                                <li>
                                    <Dropdown id="help-dropdown" pullRight>
                                        <Dropdown.Toggle noCaret>
                                            <i aria-hidden="true" className="icon-help"></i>
                                            <span className="sr-only">Profile Dropdown</span>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu pullRight>
                                            <MenuItem eventKey='1'>FAQ</MenuItem>
                                            <MenuItem eventKey='2'>Provide Feedback</MenuItem>
                                            <MenuItem eventKey='3'>Contact Us</MenuItem>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li>
                            </ul>
                        </nav>
                    </Row>
                </Grid>
            </div>
        )
    }

}
