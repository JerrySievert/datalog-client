var os = require('os');
var datalog = require('../index');

var logger = new datalog('http://localhost:3000/', 'app_id', 'key', { log: true });

function load ( ) {
  var avg = os.loadavg();

  var payload = {
    '1min': avg[0],
    '5min': avg[1],
    '15min': avg[2]
  };

  logger.log('system.loadavg', 'load', payload);

  setTimeout(load, 60000);
}

load();
