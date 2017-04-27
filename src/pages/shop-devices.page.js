import React from 'react';
import {Button} from 'react-bootstrap';
import TitlePane from '../components/title-pane';

export default class ShopPlansView extends React.Component {
    render() {
        return (
          <main id="content-main">
            <TitlePane pageTitle="Plans"/>
            <div className="content-wrapper shop-devices  text-center">
                <section className="product-row">
                    <div className="container">
                        <h2 className="as-h3">FirstNet offers an extensive selection of devices and accessories</h2>
                        <p>To learn more about our full portfolio, contact a FirstNet Specialist.</p>
                    </div>
                </section>
                <section className="product-row">
                    <div className="container">
                        <h1>Phones</h1>
                        <div className="product-container has-shadow">
                            <span className="product-label">Apple iPhone 7</span>
                            <img src="" alt=""></img>
                        </div>
                        <div className="product-container has-shadow">
                            <span className="product-label">Samsung Galaxy S7</span>
                            <img src="" alt=""></img>
                        </div>
                        <div className="product-container has-shadow">
                            <span className="product-label">LG V20</span>
                            <img src="" alt=""></img>
                        </div>
                        <div className="product-container has-shadow">
                            <span className="product-label">Kyocera Duraforce PRO</span>
                            <img src="" alt=""></img>
                        </div>
                        <Button href="#link" className='fn-primary'>Explore all smartphones</Button>
                    </div>
                </section>
                <section className="product-row">
                    <div className="container">
                        <h1>Tablets</h1>
                        <div className="product-container has-shadow">
                            <span className="product-label">Apple iPad Pro (9.7 Inch)</span>
                            <img src="" alt=""></img>
                        </div>
                        <div className="product-container has-shadow">
                            <span className="product-label">Samsung Galaxy Tab E</span>
                            <img src="" alt=""></img>
                        </div>
                        <div className="product-container has-shadow">
                            <span className="product-label">LG G Pad X 8.0</span>
                            <img src="" alt=""></img>
                        </div>
                        <div className="product-container has-shadow">
                            <span className="product-label">AT&T Trek 2 HD</span>
                            <img src="" alt=""></img>
                        </div>
                        <Button href="#link" className='fn-primary'>Explore all tablets</Button>
                    </div>
                </section>
                <section className="product-row">
                    <div className="container">
                        <h1>In-Vehicle</h1>
                        <div className="product-container has-shadow">
                            <span className="product-label">AT&T Trek 2 HD</span>
                            <img src="" alt=""></img>
                        </div>
                        <div className="product-container has-shadow">
                            <span className="product-label">Cradlepoint IBR 1100</span>
                            <img src="" alt=""></img>
                        </div>
                        <div className="product-container has-shadow">
                            <span className="product-label">Sierra Wireless MG90 475x274</span>
                            <img src="" alt=""></img>
                        </div>
                        <div className="product-container has-shadow">
                            <span className="product-label">CalAmp Fusion</span>
                            <img src="" alt=""></img>
                        </div>
                        <Button href="#link" className='fn-primary'>Explore all In-Vehicle</Button>
                    </div>
                </section>
                <section className="product-row">
                    <div className="container">
                        <h1>Accessories</h1>
                        <div className="product-container has-shadow">
                            <span className="product-label">AT&T Unite Explore</span>
                            <img src="" alt=""></img>
                        </div>
                        <div className="product-container has-shadow">
                            <span className="product-label">GumDrop Marine Case</span>
                            <img src="" alt=""></img>
                        </div>
                        <div className="product-container has-shadow">
                            <span className="product-label">AudioVox Car<br></br>Connection 2.0</span>
                            <img src="" alt=""></img>
                        </div>
                        <div className="product-container has-shadow">
                            <span className="product-label">ZTE Mobley</span>
                            <img src="" alt=""></img>
                        </div>
                        <Button href="#link" className='fn-primary'>Explore all Accessories</Button>
                    </div>
                </section>
            </div>
          </main>
        )
    }
}