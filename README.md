# DataLog Client

Requires [DataLog](https://github.com/JerrySievert/DataLog).

The DataLog Client is designed to be a fire and forget logger.  Optionally,
you can include a `callback` that will be called when the log request is
finished.

## Usage

DataLog makes use of three basic data points:

* `metric` - the system metric to log this under
* `tags` - single or array of tags used for searching
* `data` - JSON object of the data to store

```
var DataLog = require('datalog-client');

var logger = new DataLog('https://datalog.example.com/', 'myappid', 'mykey');

logger.log('system.loadavg', ['load'], { '1min' : 2.5 });
logger.log('log', 'server', { 'type': 'notice', 'message': 'This is a notice!' });
logger.log('log', [ ], { 'temperature': 20.6, time: new Date() }, function (err, response) {
  console.log(response);
});
```

If `time` is not included, it will be added automatically in the client.
