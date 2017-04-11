import React from 'react';

import { Button } from 'react-bootstrap';

const Footer = React.createClass({

  render() {
    return (
        <footer role="banner" className="clearfix">
            <div className="container">
                <div className="hidden-xs">
                    <div className="col-sm-4">
                        <img src="assets/svg/FirstNet.svg" alt="FirstNet" className="fn-logo" height="36" />
                        <div className="copyright">&copy; 2016 FirstNet — All Rights Reserved.
                            <br />More Legal Stuff</div>
                    </div>
                    <div className="col-sm-4">
                        <div className="social">
                            <img src="assets/svg/Facebook.svg" height="32" alt="FirstNet - Facebook" />
                            <img src="assets/svg/Twitter.svg" height="32" alt="FirstNet - Twitter" />
                            <img src="assets/svg/Tumblr.svg" height="32" alt="FirstNet - Tumblr" />
                            <img src="assets/svg/YouTube.svg" height="32" alt="FirstNet - YouTube" />
                        </div>
                    </div>
                    <div className="col-sm-4 text-right">
                        <Button bsStyle="primary" className="fn-primary">News &amp; Blog</Button>
                        <Button bsStyle="primary" className="fn-primary">Subscribe</Button>
                    </div>
                </div>
                <div className="visible-xs-block">
                    <div className="col-xs-6">
                        <img src="assets/svg/FirstNet.svg" alt="FirstNet" height="24" className="fn-logo--mobile" />
                        <div className="copyright">&copy; 2016 FirstNet — All Rights Reserved.
                            <br />More Legal Stuff</div>
                    </div>
                    <div className="col-xs-6 text-right remove-padding">
                        <div className="social--mobile">
                            <a href="#"><img src="assets/svg/Facebook.svg" height="32" alt="FirstNet - Facebook" /></a>
                            <a href="#"><img src="assets/svg/Twitter.svg" height="32" alt="FirstNet - Twitter" /></a>
                            <a href="#"><img src="assets/svg/Tumblr.svg" height="32" alt="FirstNet - Tumblr" /></a>
                            <a href="#"><img src="assets/svg/YouTube.svg" height="32" alt="FirstNet - YouTube" /></a>
                        </div>
                        <Button bsStyle="primary" className="fn-primary">News &amp; Blog</Button>
                        <Button bsStyle="primary" className="fn-primary">Subscribe</Button>
                    </div>
                </div>
            </div>
        </footer>
      )
  }
});

export default Footer;
