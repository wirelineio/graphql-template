//
// Copyright 2018 Wireline, Inc.
//

import { graphql } from 'graphql';
import { createSchema } from './src/resolvers';

// TODO(burdon): From ENV.
const version = '0.0.1';

const schema = createSchema();

/**
 * Registry GraphQL API.
 */

// TODO(zuspan): convert to async with response
export async function graphQL(event, context, callback){
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

    let body = '';
    if (errors) {
      console.error('Error', errors);
      body = JSON.stringify({ errors });
    } else {
      console.log('Result:', body);
      body = JSON.stringify({ data });
    }

    const response = {
      statusCode: 200,
      headers: {
        'GQL-VERSION': version
      },
      body: body
    };

    //TODO(burdon): resolve cors - perhaps in serverless.yml rather than here

    callback(null, response);

  });
}
