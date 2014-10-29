'use strict';

var Boom = require('boom');
var seneca;
var publishact;

module.exports = function publishList ( options ) {

  seneca = options.seneca;
  publishact = seneca.pin({role: 'publish', cmd:'*'});

  return function(request, reply) {

    publishact.list({}, function(err, results){
      if (err) Boom.methodNotAllowed('Error ' + err);

      if (!results) {
        return reply (Boom.notFound('No records found'));
      }
      reply (results)

    })
  }

}
