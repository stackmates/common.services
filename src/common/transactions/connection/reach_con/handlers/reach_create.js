'use strict';

var debug = require('debug')('reachSub');
var Boom = require('boom');

module.exports = function reachCreate ( options ) {

  var seneca = options.seneca;
  var reachact = seneca.pin({role: 'reach', cmd:'*'});

  return function(request, reply) {

    debug('reachCon-create payload', request.payload)

    reachact.create({
     data: request.payload
    }, function(err, results){
      if (err) Boom.methodNotAllowed('Error ' + err);

      if (!results) {
        return reply (Boom.notFound('Could not publish'));
      }
      return reply (results)

    })
  }

}
