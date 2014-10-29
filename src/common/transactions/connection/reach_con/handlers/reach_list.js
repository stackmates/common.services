'use strict';

var Boom = require('boom');
var seneca;
var reachact;

module.exports = function reachList ( options ) {

  seneca = options.seneca;

  reachact = seneca.pin({role: 'reach', cmd:'*'});

  return function(request, reply) {

    reachact.list({}, function(err, results){
      if (err) Boom.methodNotAllowed('Error ' + err);

      if (!results) {
        return reply (Boom.notFound('No records found'));
      }
      reply (results)

    })
  }

}
