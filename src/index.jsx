import React from 'react';
import ReactDOM from 'react-dom';

import {observer} from 'mobx-react';

import {appStore} from './core/stores/app.store';

import '../styles/app.scss';

@observer class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="col-xs-12">
                    <main>
                        <h1>Future Home of PSE Homepage</h1>
                    </main>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App store={appStore}/>, document.getElementById('app'));
