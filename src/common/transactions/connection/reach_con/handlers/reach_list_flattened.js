'use strict';

var Boom = require('boom');
var seneca;
var reachStract;

module.exports = function reachFlattenList ( options ) {

  seneca = options.seneca;

  reachStract = seneca.pin({role: 'reachStr', cmd:'*'});

  return function(request, reply) {

    reachStract.listFlattened({}, function(err, results){
      if (err) Boom.methodNotAllowed('Error ' + err);

      if (!results) {
        return reply (Boom.notFound('No records found'));
      }
      reply (results)

    })
  }

}
