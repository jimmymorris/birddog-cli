# BIRDDOG

Simple Node.js website crawler that users either the ?SHOWXML or the sitemap.xml of a site to crawler through looking for blank pages, and other bad status codes.

## Installation

To install node package dependences.

```npm install package.json```

## Examples

#### Simplest Run Using Default Settings
```node birddog.js```

#### Set the Website URL
```node birddog.js --url https://www.mandarinoriental.com```

#### Use the SHOWXML of a CDE based site
```node birddog.js --url https://fontainebleau.com/ --sitemap false```

#### Using Abbreviated Options
```node birddog.js --u https://www.mandarinoriental.com/ --s false```

#### Using a Direct URL Path
```node birddog.js --d https://fontainebleau.com/fontainebleau-miami-beach-xml-sitemap.xml```

### Settings

| Options            | Type           | Default                                         | Description                                                                                                                                                                 |
| -------------------|:--------------:|:-----------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| `--url`            | string         | `https://www.sabreshospitality.com`             | The website url that you would like to crawl. Has alias `-u`                                                                                                                |
| `--directpath`     | string         | `https://www.sabreshospitality.com/sitemap.xml` | The direct sitemap xml path that you would like to crawl. Only supports supports the [standard XML sitemap protocol]((https://www.sitemaps.org/index.html)). Has alias `-d` |
| `--sitemap`        | boolean        | `true`                                          | If `true` uses sitemap.xml, if `false` uses `?SHOWXML` for CDE sites. Has alias `-s`                                                                                        |
| `--maxConnections` | number         | `10`                                            | Crawler.js option: Size of the worker pool. Has alias `-m`                                                                                                                  |
| `--retries`        | number         | `3`                                             | Crawler.js option: Number of retries if the request fails. Has alias `-r`                                                                                                   |

### Dependencies
1. *[cheerio](https://www.npmjs.com/package/cheerio)* v1.0.0-rc.2
⋅⋅⋅Tiny, fast, and elegant implementation of core jQuery designed specifically for the server
2. *[cli-spinner](https://www.npmjs.com/package/cli-spinner)* v0.2.8
⋅⋅⋅Spinners for use in the terminal
3. *[crawler](https://www.npmjs.com/package/crawler)* v1.1.2
⋅⋅⋅Crawler is a web spider written with Nodejs.
4. *[minimist](https://www.npmjs.com/package/minimist)* v0.0.8
⋅⋅⋅Parse argument options
5. *[request](https://www.npmjs.com/package/request)* v2.83.0
⋅⋅⋅Simplified HTTP request client.

### What Are Sitemaps?

Sitemaps are an easy way for webmasters to inform search engines about pages on their sites that are available for crawling. [More info](https://www.sitemaps.org/index.html)
