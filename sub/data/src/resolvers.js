//
// Copyright 2017 Wireline, Inc.
//

import { concatenateTypeDefs, makeExecutableSchema } from 'graphql-tools';

import RegistrySchema from '../gql/data.graphql';

/**
 * Creates the GQL client schema.
 *
 * @returns { GraphQLSchema }
 */
export const createSchema = () => {

  // TODO(burdon): addErrorLoggingToSchema
  return makeExecutableSchema({

    // Schema types.
    typeDefs: concatenateTypeDefs([ RegistrySchema ]),

    // http://dev.apollodata.com/tools/graphql-tools/resolvers.html
    resolvers: new Resolvers().getMap()
  });
};

/**
 * GQL Schema Resolvers.
 */
export class Resolvers {

  getMap() {

    return {

      Query: {

        // TODO(burdon): Create DB abstraction and pass into resolver object.
        // TODO(burdon): Enable resolver to be used "in-memory" with the client in test mode
        //               (with a simple in-memory store).
        query: async (obj, args, context) => {
          return [];
        }
      },

      Mutation: {}
    };
  }
}
