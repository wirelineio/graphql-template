//
// Copyright 2018 Wireline, Inc.
//

export const Const = {

  VIEWS_DIR: './views',

  STATIC_DIR: './assets',

  ASSETS: {

    // S3 bucket for Web service assets.
    WEB: 'https://s3.amazonaws.com/wli-graphql-app-assets',

    // S3 bucket for JS app assets.
    APP: 'https://s3.amazonaws.com/wli-graphql-assets/service'
  }
};

export const Config = {

  appConfig: {
    rootId: 'app-root'
  },

  appBundle: {
    css: Const.ASSETS.APP + '/app.css',
    js: Const.ASSETS.APP + '/app.js'
  }
};
