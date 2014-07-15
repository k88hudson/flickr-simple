var should = require('should');
var Flickr = require('../index.js');

var apiKey = process.env.FLICKR_API_KEY;

if (!apiKey) {
  console.error('ERROR: You must include an API_KEY in your env. Did you run: \n$ env FLICKR_API_KEY=xxxx mocha');
  process.exit(0);
}

describe('photos.search', function () {
  var flickr = new Flickr({
    api_key: apiKey
  });
  it('should return search results', function(done) {
    this.timeout(8000);
    flickr.photos.search({
      tags: 'mozilla',
      page_size: 10
    }, function (err, data) {
      if (err) {
        return done(err);
      }
        data.should.be.an.Array;
        data[0].should.have.property('url');
        done();
    });
  });
});
