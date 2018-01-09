//
// Copyright 2018 Wireline, Inc.
//

import cheerio from 'cheerio';
import { request, plugins } from 'popsicle';
import fs from 'fs';

const OC_HOME = 'https://opencollective.com/discover';

if (false)
request({
  method: 'GET',
  url: OC_HOME
}).then(result => {

  // TODO(burdon): Dynamically load.

  const page = cheerio.load(result.body);
  console.log(page.html('.Discover-container .Discover-results'));

});

const filename = './data/sample.json';

const offset = 1;
const OC_FEED = `https://opencollective.com/api/discover?offset=${offset}&show=all&sort=most%20popular`;

if (false)
request({
  method: 'GET',
  url: OC_FEED
})
  .use(plugins.parse('json'))
  .then(result => {
    let { collectives } = result.body;
    fs.writeFileSync(filename, JSON.stringify(collectives, 0, 2), { encodeing: 'utf8' })
  });


let data = fs.readFileSync(filename, 'utf8');
console.log(JSON.parse(data));
