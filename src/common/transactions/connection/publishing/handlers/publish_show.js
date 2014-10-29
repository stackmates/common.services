'use strict';

var Boom = require('boom');

module.exports = function publishShow ( options ) {

  var seneca = options.seneca;
  var publishact = seneca.pin({role: 'publish', cmd:'*'});

  return function(request, reply) {

    // console.log('publish show -', request.params.id );

    publishact.load({
     id: request.params.id
    }, function(err, results){
      if (err) Boom.methodNotAllowed('Error ' + err);

      if (!results) {
        return reply (Boom.notFound('Could not publish'));
      }
      // console.log('publish show -', results );
      return reply (results)

    })
  }


}
