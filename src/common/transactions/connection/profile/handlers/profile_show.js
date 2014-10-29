'use strict';

// var Hoek = require('hoek');
// var Joi = require('joi');
// var Boom = require('boom');

module.exports = function profileShow ( options ) {

  return function(request, reply) {
    return reply(request.params.username)
  }

}


// getProfileConfig = {
//   validate: {
//     path: { username: Joi.string().token() }
//   },
//   handler: function(request, reply) {
//     if (database[request.params.username]) {
//         reply(database[request.params.username]);
//     } else {
//         reply(Hapi.error.notFound("User not found."));
//     }
//   }
// }