//
// Copyright 2018 Wireline, Inc.
//

import PropTypes from 'prop-types';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ConnectedRouter } from 'react-router-redux';

/**
 * Root App component.
 *
 * Integrates with Apollo and the Redux Router.
 */
export class AppContainer extends React.Component {

  static propTypes = {
    config:   PropTypes.object.isRequired,
    client:   PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,
    store:    PropTypes.object.isRequired
  };

  static childContextTypes = {
    config: PropTypes.object.isRequired
  };

  getChildContext() {
    let { config } = this.props;

    return {
      config
    };
  }

  render() {
    let { client, store, history, children } = this.props;

    // Apollo
    // https://www.apollographql.com/docs/react/basics/setup.html#ApolloProvider

    // Redux Router
    // https://github.com/reacttraining/react-router/tree/master/packages/react-router-redux
    // https://reacttraining.com/react-router/web/guides/redux-integration

    // NOTE: Delete node_modules if upgrading and have the following error.
    // Error: Module Not Found (node_modules/react-router-redux/lib/index.js).
    // https://github.com/ReactTraining/react-router/issues/5230

    return (
      <ApolloProvider client={ client } store={ store }>
        <ConnectedRouter history={ history }>
          { children }
        </ConnectedRouter>
      </ApolloProvider>
    );
  }
}
