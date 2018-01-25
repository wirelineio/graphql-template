//
// Copyright 2017 Wireline, Inc.
//

import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, Switch } from 'react-router-dom';

import { AppContainer } from './util/container';
import { Client } from './util/client';

/**
 * Apollo client.
 */
class AppClient extends Client {

  /** Get app reducer. */
  getReducers() {
    return [];
  }

  /** Create the initial reducer store state. */
  getInitialState() {
    return {};
  }
}

/**
 * Root container and Redux router.
 */
class AppRoutes extends React.Component {

  static contextTypes = {
    config: PropTypes.object.isRequired
  };

  render() {

    const HomePanel = (props) => {
//    let { params } = this.props;

      return (
        <div>Home</div>
      );
    };

    //
    // Redux Router.
    // https://reacttraining.com/react-router/web/api/Route/Route-props
    // NOTE: Each component extracts the router path params passed to props.
    //

    return (
      <Switch>
        <Route path={ '/' } component={ HomePanel }/>

        <Redirect to={ '/' }/>
      </Switch>
    );
  }
}

window.client = new AppClient(window.config);

/**
 * Initialize.
 */
window.client.init().then(client => {
  console.log('Config:', JSON.stringify(client.config));

  let App = (
    <AppContainer config={ client.config } client={ client.apollo } store={ client.store } history={ client.history }>
      <AppRoutes/>
    </AppContainer>
  );

  let { rootId } = client.config;
  ReactDOM.render(App, document.getElementById(rootId));
});
