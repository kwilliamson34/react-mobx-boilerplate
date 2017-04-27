import React from 'react';
import {Link} from 'react-router-dom';

export default class PlansAndDevices extends React.Component {

    render() {
        return (
            <section className="placeholder mp-links" id="PlansAndDevices">
                <div className="container pad-header-spacing">
                    <h2>Shop Plans and Devices</h2>
                    <div className="row">
                        <div className="col-xs-12 col-md-4 pad-box view-solutions">
                            <div className="pad-padding text-left">
                                <div className="pad-text imagebox">
                                    <h3>Solutions</h3>
                                    <p>Lorem ipsum dolor sit amet consectetuer adipiscing elit</p>
                                    <Link to="view-solutions" className="pad-button btn btn-lg btn-default">View Solutions</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4 pad-box rate-plans">
                            <div className="pad-padding text-left">
                                <div className="pad-text imagebox">
                                    <h3>Rate Plans</h3>
                                    <p>Lorem ipsum dolor sit amet consectetuer adipiscing elit</p>
                                    <Link to="/shop-plans" className="pad-button btn btn-lg btn-default">Shop Plans</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4 pad-box shop-devices">
                            <div className="pad-padding text-left">
                                <div className="pad-text imagebox">
                                    <h3>Devices & Accessories</h3>
                                    <p>Lorem ipsum dolor sit amet consectetuer adipiscing elit</p>
                                    <Link to="/shop-devices" className="pad-button btn btn-lg btn-default">Shop Devices</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
