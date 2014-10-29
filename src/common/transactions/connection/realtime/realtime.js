'use strict';

// Maybe this should not be here?
// Graftjs instead so whole different paradigm
// but should still be business value in supporting both
// no need to trace back to the natural splitting point.

var socketIO = require('socket.io');
var io;

// hapi plugin registration
exports.register = function(plugin, options, next) {

  var seneca = options.seneca;
  // seneca.use(options.DIR.__cTrans + 'substance/social/publishing_sub', {});
  // seneca.use(options.DIR.__cIntel + 'analysis/reach_analysis', {});

  var publishact = seneca.pin({role: 'publish', cmd:'*'});
  var reachact = seneca.pin({role: 'reach', cmd:'*'});


  // this is the hapi specific binding
  io = socketIO.listen(plugin.servers[0].listener);

  io.sockets.on('connection', function(socket) {

    console.log('connected socket');

    socket.emit({msg: 'welcome'});

    socket.on('echo', function (data) {
      socket.emit('echo', data);
    });

    socket.on('echo-ack', function (data, callback) {
      callback(data);
    });


    // when new reach data is added broadcast it to others
    socket.on('publish-data', function (data) {

      socket.broadcast.emit('publish-data', {
        data: data
      });

    });

    socket.on('reach-data', function (data) {

      reachact.create({
        data: data
      }, function(err, results) {
        if (err) socket.emit('error ' + err);

        socket.broadcast.emit('reach-data', {
          data: results
        });

      });

    });

  });

  next();
};


exports.register.attributes = {
  pkg: require("./package.json")
}

