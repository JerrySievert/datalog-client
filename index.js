var request = require('request');
var os = require('os');
var url = require('url');


function Client (host, app_id, key, options) {
  this.host = host;
  this.app_id = app_id;
  this.key = key;
  this.options = options || { };

  this.url = url.resolve(this.host, '/api/v1/create');
}

Client.prototype.log = function log (metric, tags, data, optional_callback) {
  if (typeof data !== 'object') {
    data = { data: data };
  }

  if (data.time === undefined) {
    data.time = new Date();
  }

  var payload = {
    data: data,
    application_id: this.app_id,
    key: this.key,
    metric: metric,
    tags: tags,
    hostname: os.hostname()
  };

  var self = this;

  request({
    method: 'POST',
    url: this.url,
    body: payload,
    json: true
  }, function (err, res, body) {
    if (self.options.log) {
      if (err) {
        console.log(err);
      }

      if (body.error) {
        console.log(body.error);
      }
    }

    if (optional_callback) {
      optional_callback(err, body);
    }
  });
};

module.exports = exports = Client;
