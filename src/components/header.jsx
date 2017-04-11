import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';

const Header = React.createClass({

  render() {
 
    return (
            <header className="clearfix">
                <div className="hidden-xs">
                    <div className="top-subnav clearfix">
                        <div className="container">
                            <div className="col-sm-8">
                                <a href="#">FIRSTNET APP STORE</a> <a href="#">FIRSTNET.COM</a> <a href="#">FIRSTNET.GOV</a>
                            </div>
                            <div className="col-sm-4 text-right">
                                <i className="icon-profile"></i> &nbsp; <i className="icon-search"></i>
                            </div>
                        </div>
                    </div>
                    <div className="main-nav">
                        <div className="container">
                            <div className="col-sm-6 ">
                                <div className="fn-logo-desk main-menu">
                                    <i className="icon-hamburger" style={{ display: 'inline-block',fontSize:'28px',marginRight:'8px', verticalAlign:'top' }}></i>
                                </div>
                                <div className="fn-logo-desk">
                                    <img src="assets/svg/FirstNet.svg" className="fn-logo" alt="First Net" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="visible-xs-block header-mobile">
                    <div className="container">
                    <div className="btnMenu pull-left dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ><i className="icon-hamburger"></i></a>
                        <ul className="dropdown-menu menu-global-mobile">
                            <li><a href="/#/dev-apps-landing"><span>My Apps</span></a></li>
                            <li><a href="/#/api-catalog"><span>API Catalog Listing</span></a></li>
                            <li><a href="/#/api-code-samples"><span>API Code Samples</span></a></li>
                            <li><a href="/#/why-create-apps"><span>Why Create Apps?</span></a></li>
                        </ul>
                    </div>

                    <img src="assets/svg/FirstNet.svg" alt="FirstNet" className="fn-logo" />
                    <div className="btnMenu pull-right"><i className="icon-profile"></i></div>
                    </div>
                </div>
            </header>
    )
  }
});

export default Header;
