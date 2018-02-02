//
// Copyright 2018 Wireline, Inc.
//

import _ from 'lodash';
import bodyParser from 'body-parser';
import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';

import { Const } from './defs';

/**
 * Create Express App.
 */
export const createExpress = () => {
  let app = express();

  //
  // Configure Handlebars template engine.
  //

  app.engine('hbs', handlebars({
    extname: '.hbs',
    layoutsDir: path.join(Const.VIEWS_DIR, '/layouts'),
    partialsDir: path.join(Const.VIEWS_DIR, '/partials'),
    defaultLayout: 'main',
    helpers: {

      // {{#section 'body'}}
      section: function(name, options) {
        this.sections = this.sections || {};
        this.sections[name] = options.fn(this);
      },

      // {{{ json var }}}
      json: function(object, indent=0) {
        return JSON.stringify(object, null, indent);
      }
    }
  }));

  app.set('view engine', 'hbs');
  app.set('views', Const.VIEWS_DIR);

  //
  // Middleware.
  //

  // JSON encoding.
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // Assign local variables.
  app.use((req, res, next) => {
    _.assign(res.locals, {
      req,
      // event: req.apiGateway.event,
      root: ''
    });

    next();
  });

  return app;
};

/**
 * Static files.
 * https://expressjs.com/en/starter/static-files.html
 */
export const createStaticRouter = () => {
  let router = express.Router();

  router.get(/^\/assets\/app\/.*/, function(req, res) {
    let match = req.path.match(/^\/assets\/app(\/.*)/);
    res.redirect(301, Const.ASSETS.APP + match[1]);
  });

  router.get(/^\/assets\/web\/.*/, function(req, res) {
    let match = req.path.match(/^\/assets\/web(\/.*)/);
    res.redirect(301, Const.ASSETS.WEB + match[1]);
  });

  return router;
};

/**
 * Web pages.
 * @param config
 * @return {*}
 */
export const createPageRouter = (config) => {
  let router = express.Router();

  router.get('/', (req, res) => {
    res.render('home');
  });

  router.get('/app', async (req, res) => {
    res.render('app', config);
  });

  return router;
};
