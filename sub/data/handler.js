//
// Copyright 2018 Wireline, Inc.
//

import { graphql } from 'graphql';

import Wireline from '@wirelineio/sdk';

import { createSchema } from './src/resolvers';

// TODO(burdon): From ENV.
const version = '0.0.1';

const schema = createSchema();

module.exports = {

  /**
   * Registry GraphQL API.
   */
  registry: Wireline.graphql(async (event, context, response) => {
    let { body } = event;
    let { query, variables } = JSON.parse(body);

    let queryRoot = {};
    let queryContext = {};

    // TODO(burdon): Factor out.
    const format = query => {
      return query.trim()
        .replace(/\n */g, ' ')
        .replace(/ +\{ +/g, ' { ')
        .replace(/ +\} +/g, ' } ');
    };

    // TODO(burdon): Await.
    // TODO(burdon): Factor out GraphQL API to SDK.
    console.log('Query:', JSON.stringify({ query: format(query), variables }));

    return graphql(schema, query, queryRoot, queryContext, variables).then(result => {
      let { errors, data } = result;

      // TODO(burdon): From config?
      response.setCors();

      response.set({
        'GQL-VERSION': version
      });

      if (errors) {
        console.error('Error:', errors);
        response.send({ errors });
      } else {
        console.log('Result:', JSON.stringify(data));
        response.send({ data });
      }
    });
  })
};
