//
// Copyright 2018 Wireline, Inc.
//

import awsServerlessExpress from 'aws-serverless-express';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';

import { Config } from './src/defs';
import { createExpress, createStaticRouter, createPageRouter } from './src/server';

const app = createExpress();

// Must come first.
// https://github.com/awslabs/aws-serverless-express/blob/master/example/app.js
app.use(awsServerlessExpressMiddleware.eventContext());

app.use('/', createStaticRouter());
app.use('/', createPageRouter(Config));

let server = awsServerlessExpress.createServer(app);

module.exports = {

  express: (event, context) => {
    awsServerlessExpress.proxy(server, event, context);
  }
};
