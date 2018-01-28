//
// Copyright 2017 Wireline, Inc.
//

import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { graphql } from 'graphql';
import { print } from 'graphql/language/printer';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHashHistory from 'history/createHashHistory';
import * as _ from 'lodash';

// TODO(zuspan): pull schema from /sub/data
// import { createSchema } from '../../../data/src/resolvers';

/**
 * Client App.
 */

export class Client {

  /**
   * Client.
   * @param config
   * @param { networkInterface }options
   */

  constructor(config, options) {
    console.assert(config);
    this._config = config;
    this._options = options || {};
    this._client = null;
    this._store = null;
  }

  get config() {
    return this._config;
  }

  get apollo() {
    return this._client;
  }

  get history() {
    return this._history;
  }

  get store() {
    return this._store;
  }

  async init() {

    // Check for injected network interface.
    let networkInterface = this._options.networkInterface || await this.createNetworkInterface();

    

    //
    // Apollo client.
    // http://dev.apollodata.com/core/apollo-client-api.html#constructor
    // http://dev.apollodata.com/react/initialization.html
    // http://dev.apollodata.com/core/apollo-client-api.html#apollo-client
    // https://github.com/apollostack/apollo-client/blob/6b6e8ded1e0f83cb134d2261a3cf7d2d9416400f/src/ApolloClient.ts
    //
    this._client = new ApolloClient({

      // Adds __typename to results.
      addTypename: true,

      // http://dev.apollodata.com/react/cache-updates.html
//    dataIdFromObject: ID.dataIdFromObject,

      // http://dev.apollodata.com/core/network.html
      networkInterface,

      // Map identical queries to the same request.
      // http://dev.apollodata.com/core/network.html#query-deduplication
      queryDeduplication: true,

      // NOTE: window.__APOLLO_CLIENT__
      // https://github.com/apollographql/apollo-client-devtools
      // https://github.com/apollographql/apollo-client-devtools/issues/29
      // https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm
      // TODO(burdon): Flaky.
      // https://github.com/apollographql/apollo-client-devtools/pull/85 (11/22/17)
      connectToDevTools: true,

      //default to '/graphql' enpoint on host
      link: new HttpLink(),
      cache: new InMemoryCache()
    });

    //
    // Redux Router History.
    // https://www.npmjs.com/package/history
    //

    this._history = createHashHistory();

    //
    // Redux.
    // http://dev.apollodata.com/react/redux.html
    //
    this._store = createStore(

      // Reducers.
      combineReducers(_.merge({
        apollo: this._client.reducer(),
        router: routerReducer,
      }, this.getReducers())),

      // State.
      this.getInitialState(),

      // Middleware.
      compose(
        applyMiddleware(this._client.middleware()),
        applyMiddleware(routerMiddleware(this._history)),

        // https://github.com/zalmoxisus/redux-devtools-extension
        (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
      )
    );

    return this;
  }

  /** Get app reducer. */
  getReducers() {
    return [];
  }

  /** Create the initial reducer store state. */
  getInitialState() {
    return {};
  }

  async createNetworkInterface() {
    let { apiRoot } = this.config;

    // http://dev.apollodata.com/core/network.html#createNetworkInterface
    
    // for testing locally run 'sls offline start' on /sub/data first
    let port = apiRoot.split(':').pop();
    apiRoot = apiRoot.replace(port, '9000');
    
    let networkInterface = createNetworkInterface({
      uri: apiRoot + '/data'      // TODO(burdon): Const.
    });

    // mockDB testing
    // let schema = createSchema();
    // let networkInterface = new LocalNetworkInterface({schema});

    return Promise.resolve(networkInterface);
  }
}

/**
 * Local (in-memory) NetworkInterface
 */
export class LocalNetworkInterface {

  constructor(schema) {
    console.assert(schema);
    this._schema = schema;
    this._root = {};
    this._context = {};
  }

  async query(request) {
    let { query, variables, operationName } = request;
    
    // TODO(burdon): Factor out logger.
    console.log('=>>', operationName, JSON.stringify(variables));
    return await graphql(this._schema, print(query), this._root, this._context, variables).then(response => {
      console.log('<<=', JSON.stringify(response));
      return response;
    });
  }
}