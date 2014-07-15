# Flickr Simple

![Build status](https://travis-ci.org/k88hudson/flickr-simple.svg?branch=master)

A very simple node flickr client. Currently in progress, only has photo searches.

Image URLs are generated by this library and included in the data responses by default (see [https://www.flickr.com/services/api/misc.urls.html](Flickr's documentation) for more info).

## Install

```
npm install flickr-simple
```

## Setup

```js
var Flickr = require('flickr-simple');
var flickr = new Flickr({
  api_key: process.env.FLICKR_API_KEY)
});
```

## Complete Example

```js
var Flickr = require('flickr-simple');
var flickr = new Flickr({
  api_key: process.env.FLICKR_API_KEY)
});

flickr.photos.search({
  tags: 'mozilla'
}, function (err, data) {
  console.log(data);
});
```

## Methods

## photos.search(query, callback)

### Parameters

####`query`
An object based on flickr's documentation: https://www.flickr.com/services/api/flickr.photos.search.html

Additionally, the query can contain an optional `size` (defaults to medium, 500 on longest side), which should be one of:

```
s small square 75x75
q large square 150x150
t thumbnail, 100 on longest side
m small, 240 on longest side
n small, 320 on longest side
z medium 640, 640 on longest side
c medium 800, 800 on longest side
b large, 1024 on longest side
o original image, either a jpg, gif or png, depending on source format
```

####`callback`
A function with the signature `err, data`, where data is in the format described below


### Example:
```js
flickr.photos.search({
  tags: 'mozilla',
  size: 't' // Thumbnails
}, function (err, data) {
  console.log(data);
});
```

### Data format:
```js
[
  {
    "id": "14457821757",
    "url": "https://flickrurl.com/1234.jpg" // This is the image URL
    "title": "Mozilla Community Space Taipei Party",
    "owner": "1234556@N00",
    "secret": "dadad22dd",
    "server": "1234",
    "farm": 4,
    "ispublic": 1,
    "isfriend": 0,
    "isfamily": 0
  }
]
```

## Tests

```
env FLICKR_API_KEY=xxxxx mocha test
```
