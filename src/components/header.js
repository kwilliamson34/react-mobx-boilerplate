import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';

export default class Header extends React.Component {

    render() {
        return (
            <header className="clearfix text-center">
                <h1>Header</h1>
            </header>
        )
    }

};
