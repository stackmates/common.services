'use strict';

var Boom = require('boom');

module.exports = function publishCreate ( options ) {

  var seneca = options.seneca;
  var publishact = seneca.pin({role: 'publish', cmd:'*'});

  return function(request, reply) {

    publishact.create({
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
