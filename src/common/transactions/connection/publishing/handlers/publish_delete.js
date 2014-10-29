'use strict';

var debug = require('debug')('publishCon');
var Boom = require('boom');

module.exports = function publishDelete ( options ) {

  var seneca = options.seneca;
  var publishact = seneca.pin({role: 'publish', cmd:'*'});

  return function(request, reply) {

    debug(request.params.id);

    publishact.destroy ({
     id: request.params.id
    }, function(err, results){
      if (err) Boom.methodNotAllowed('Error ' + err);

      if (!results) {
        return reply (Boom.notFound('Could not publish'));
      }
      return reply (results);

    })
  }

}
