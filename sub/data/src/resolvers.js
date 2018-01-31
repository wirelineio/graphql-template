//
// Copyright 2018 Wireline, Inc.
//

import { concatenateTypeDefs, makeExecutableSchema } from 'graphql-tools';
import * as _ from 'lodash';
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

        // sample serverless-offline call: http://localhost:9000/data?query={allRecords{title}}
        records: async (obj, args, context) => {
          return [{title: 'Hello World (1)'},{title: 'Hello World (2)'}];
        }
      },

      Mutation: {
        
        // sample serverless-offline call: http://localhost:9000/data?query=mutation{insertRecords(records:[{title:%22this%22}]){title}}
        insertRecords: async (obj, args, context) => {
          console.log('hi from mutation');
          console.log(args);
          return args.records;
        }
      }
    };
  }
}
