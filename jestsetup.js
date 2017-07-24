import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import TestUtils from 'react-dom/test-utils';
import renderer from 'react-test-renderer';

global.React = React;
global.ReactDOM = ReactDOM;
global.Router = Router;
global.TestUtils = TestUtils;
global.renderer = renderer;

// Skip createElement errors but fail tests on any other error
console.error = message => {
  if (!/(React.createElement: type should not be null)/.test(message)) {
    //TODO: throw errors when logged to console; apply to propTypes.isRequired tests
    // throw new Error(message);
  }
};

console.warn = message => {
  //do nothing; hide node-uuid warnings
};
