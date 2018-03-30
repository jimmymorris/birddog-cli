const Crawler  = require('crawler');
const Request  = require('request');
const Cheerio  = require('cheerio');
const Minimist = require('minimist');
const Spinner  = require('cli-spinner').Spinner;

const options = Minimist(process.argv.slice(2), {
  alias: { u: 'url' },
  default: {
    url: 'https://www.sabre.com', // site URL you want to crawl
    sitemap: true // if set to true it will pull in the sitemap.xml file, otherwise use ?SHOWXML of the provided URL
  }
});
const badStatusCodes = [404, 500, 501, 502];
const domain = options.url;
let sitemap = '',
    $,
    failedURLs = [],
    pageQueue = [];

let spinner = new Spinner({
    text: 'processing... %s',
    stream: process.stderr,
    onTick: function(msg){
        this.clearLine(this.stream);
        this.stream.write(msg);
    }
});

spinner.setSpinnerTitle('Getting pages to parse... %s');
spinner.setSpinnerString(9);
spinner.start();

if(options.sitemap) {
  sitemap = domain.slice(-1) !== '/' ? domain + '/sitemap.xml' : domain + 'sitemap.xml'
} else {
  sitemap = domain + '?SHOWXML';
}

Request(sitemap, function (error, response, html) {
  if(!error && response.statusCode) {
    spinner.stop(true);
    if(response.headers['content-type'] == 'text/xml') {
      $ = Cheerio.load(html);

      if(sitemap) {
        $('url').each(function (i, page) {
            pageQueue.push($(page).find('loc').text());
        });
      } else {
        $('nav page').each(function (i, page) {
          let url = $(page).attr('name'),
              path = $(page).attr('path');
          if (!url.includes('http') && url !== '' && !path.includes('ajax'))
            pageQueue.push(`${domain}${url}`);
        });
      }
      if(pageQueue.length === 0) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        console.log('No pages to crawl :(');
        return false;
      }

      c.queue(pageQueue);

      // when the queue is done
      c.on('drain',function(){
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        console.log('****************************');
        console.log('    CRAWLER HAS FINISHED    ');
        console.log('****************************');
        console.log('  Passed: ', pageQueue.length);
        console.log('  Failed: ', failedURLs.length);
        console.log('****************************');
        failedURLs.forEach(function(url) {
          console.warn(url);
        });
      });
    } else {
      console.error('content-type is not XML ¯\_(ツ)_/¯');
    }
  } else {
   spinner.stop(true);
   process.stdout.clearLine();
   console.error('¯\_(ツ)_/¯');
   console.error(error);
   return false;
  }
});


const c = new Crawler({
  maxConnections: 10,
  retries: 3,
  callback: function (error, res, done) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(c.queueSize + ' pages left out of ' + pageQueue.length + '...');    
    if (error) {
      failedURLs.push(res.options.uri);
      // console.log('\x1b[31m', `FAIL: ${res.options.uri}`, '\x1b[0m');
      // console.log('\x1b[31m', error, '\x1b[0m');
    } else {
      if (res.body.length < 100) {
        // console.log('\x1b[31m', `FAIL: ${res.options.uri}`, '\x1b[0m');
        failedURLs.push(res.options.uri);
      }
    }

    if (error) {
      failedURLs.push(res.options.uri);
      console.log('\x1b[31m', `FAIL: ${res.options.uri}`, '\x1b[0m');
      console.log('\x1b[31m', error, '\x1b[0m');
    } else {
      if (res.body.length < 100) {
        // If the result is a blank page
        // console.log('\x1b[31m', `FAIL: ${res.options.uri}`, '\x1b[0m');
        failedURLs.push('\x1b[31m' + `FAIL: ${res.options.uri}` + '\x1b[0m');
      } else if (badStatusCodes.indexOf(res.statusCode) != -1) {
        // If the result is a bad error status code
        // console.log('\x1b[31m', `FAIL ${res.statusCode}: ${res.options.uri}`, '\x1b[0m');
        failedURLs.push('\x1b[31m' + `FAIL ${res.statusCode}: ${res.options.uri}` + '\x1b[0m');
      } else if (res.$("head meta").length == 0) {
        // If the result is broken but still returns status 200
        console.log('\x1b[31m', `FAIL: ${res.$("head title").text()} ${res.options.uri}`, '\x1b[0m');
        failedURLs.push(res.options.uri);
      } else {
        // Congratulations, you passed. Good job.
        // console.log(`PASS: ${res.options.uri}`);
      }
    }
    done();
  }
});
