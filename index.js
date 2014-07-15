var extend = require('extend');
var request = require('request');

module.exports = function Flickr(keys) {
  var self = this;

  if (!keys) {
    console.warn('Warning: You did not include Flickr api keys, which are required for Flickr searches');
    keys = {};
  }

  // Defaults
  var uri = 'https://api.flickr.com/services/rest';
  var baseQuery = {
    api_key: keys.api_key,
    format: 'json',
    nojsoncallback: 1
  };

  // Utils
  self.utils = {};
  self.utils.addUrls = function (raw, size) {
    return raw.map(function (item) {
      var url = 'https://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret;
      if (size) {
        url += '_' + size;
      }
      url += '.jpg';
      item.url = url;
      return item;
    });
  };

  // Photos
  self.photos = {};
  self.photos.search = function photosSearch(userQuery, cb, size) {
    userQuery.method = 'flickr.photos.search';
    query = extend(baseQuery, userQuery);
    request.get({
      uri: uri,
      qs: query
    }, function (err, http, body) {
      if (err) {
        return cb(err);
      }
      try {
        var data = JSON.parse(body);
      } catch (e) {
        return cb(new Error('Could not parse response body: ' + body));
      }
      if (!data.photos || !data.photos.photo) {
        return cb(new Error('Could not find photos. Looks like the Flickr API may have changed, or you may be missing API keys.'));
      }
      return cb(null, self.utils.addUrls(data.photos.photo, size));
    });
  };

};
