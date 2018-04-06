# BIRDDOG

Simple Node.js website crawler that users either the ?SHOWXML or the sitemap.xml of a site to crawler through looking for blank pages, and other bad status codes.

## Installation

To install node package dependences.

```npm install package.json```

## Examples

#### Simplest
```node birddog.js```

Runs using default options in Birddog.js

#### Set the Website URL.
```node birddog.js --url https://www.mandarinoriental.com```

This will look for and run against the sitemap.xml file

#### Use the SHOWXML of a CDE based site
```node birddog.js --url https://fontainebleau.com/ --sitemap false```

#### Using Abbreviated Options
```node birddog.js --u https://www.mandarinoriental.com/ --s false```

#### Using a Direct URL Path
```node birddog.js --d https://fontainebleau.com/fontainebleau-miami-beach-xml-sitemap.xml```

In the event that the sitemap.xml file isn't named as such.

### Settings

<table style="width: 100%;">
  <thead>
    <th>Options</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
  </thead>
  <tbody>
    <tr>
      <td nowrap>url</td>
      <td>string</td>
      <td>https://sabreshospitality.com</td>
      <td>The website url that you would like to crawl. Has alias *-u*</td>
    </tr>
    <tr>
      <td nowrap>directpath</td>
      <td>string</td>
      <td>https://sabreshospitality.com/sitemap.xml</td>
      <td>The direct sitemap xml path that you would like to crawl. Only supports supports the [standard XML sitemap protocol]((https://www.sitemaps.org/index.html)). Has alias *-d*</td>
    </tr>
    <tr>
      <td nowrap>sitemap</td>
      <td>boolean</td>
      <td>true</td>
      <td>If true uses sitemap.xml, if false uses ?SHOWXML for CDE sites. Has alias *-s*</td>
    </tr>
    <tr>
      <td nowrap>maxConnections</td>
      <td>integer</td>
      <td>10</td>
      <td>Crawler.js option: Size of the worker pool. Has alias *-m*</td>
    </tr>
    <tr>
      <td nowrap>retries</td>
      <td>number</td>
      <td>3</td>
      <td>Crawler.js option: Number of retries if the request fails. Has alias *-r*</td>
    </tr>
  </tbody>
</table>

### Dependencies

1. *[cheerio](https://www.npmjs.com/package/cheerio)* v1.0.0-rc.2 -- Tiny, fast, and elegant implementation of core jQuery designed specifically for the server
2. *[cli-spinner](https://www.npmjs.com/package/cli-spinner)* v0.2.8 -- Spinners for use in the terminal
3. *[crawler](https://www.npmjs.com/package/crawler)* v1.1.2 -- Crawler is a web spider written with Nodejs.
4. *[minimist](https://www.npmjs.com/package/minimist)* v0.0.8 -- Parse argument options
5. *[request](https://www.npmjs.com/package/request)* v2.83.0 -- Simplified HTTP request client.


### What Are Sitemaps?

Sitemaps are an easy way for webmasters to inform search engines about pages on their sites that are available for crawling. [More info](https://www.sitemaps.org/index.html)
