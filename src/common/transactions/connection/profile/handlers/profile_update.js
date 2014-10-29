'use strict';

// var Hoek = require('hoek');
// var Joi = require('joi');
var Boom = require('boom');

module.exports = function profileUpdate ( options ) {

  // do seneca stuff
  return function(request, reply) {
    if (!database[request.params.username]) {
        database[request.params.username] = request.payload;
        database[request.params.username].count = 0;
        reply(database[request.params.username]);
    } else {
        reply(Boom.error.conflict("User already exists."));
    }
  };

}
