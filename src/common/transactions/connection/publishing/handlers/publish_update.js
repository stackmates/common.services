'use strict';

var debug = require('debug')('publishCon');
var Boom = require('boom');

module.exports = function publishUpdate ( options ) {

  var seneca = options.seneca;
  var publishact = seneca.pin({role: 'publish', cmd:'*'});


  return function(request, reply) {
    debug('publishCon--update params.id', request.params.id);

    publishact.update({
      id: request.params.id,
      data: request.payload
    }, function(err, results){
      if (err) Boom.methodNotAllowed('Error ' + err);

      if (!results) {
        return reply (Boom.notFound('No records found'));
      }
      debug('publishCon--update results', results);
      return reply (results)

    });

  };

}
