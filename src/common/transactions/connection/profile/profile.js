'use strict';

var seneca;
var profileact;

var Hoek = require('hoek');
var Joi  = require('joi');
var Boom = require('boom');

var getProfileImageConfig;
var updateProfileConfig;
var deleteProfileConfig;

var internals = {
  route: '/profile'
};

exports.register = function (plugin, options, next) {

  options = Hoek.applyToDefaults(internals, options);

  // seneca = options.seneca;
  // seneca.use('profile');
  // profileact = seneca.pin({role: 'profile', cmd:'*'});

  plugin.route({
    path: options.route + '/{username}',
    method: 'GET',
    handler: require('./handlers/profile_show')(options)
  });

  plugin.route({
    path: options.route + '/photo/{id*}',
    method: 'GET',
    config: {
      auth: 'jwt',
      validate: { params: { id: Joi.string().max(40).min(2).alphanum() } },
      handler: require('./handlers/profile_image_show')(options)
    }
  });

  plugin.route({
    path: options.route + '/{username}',
    method: 'PATCH',
    config: {
      validate: {
        params: { username: Joi.string().token() },
        payload: {
          full_name: Joi.string(),
          age: Joi.number().integer(),
          image: Joi.string()
        }
      },
      handler: require('./handlers/profile_update')(options)
    }
  });

  next();

}

function getProfileHandler (request, reply) {
  reply(request.params.username);
}

getProfileImageConfig = {
  // validate will ensure YOURNAME is valid before replying to your request
  validate: { params: { id: Joi.string().max(40).min(2).alphanum() } },
  handler: require
}


exports.register.attributes = {
  pkg: require("./package.json")
}


deleteProfileConfig = {
  validate: {
    path: { username: Joi.string().token() }
  },
  handler: function(request, reply) {
    if (!database[request.params.username]) {
      reply(Hapi.error.notFound("User not found."))
    } else {
      delete database[request.params.username];
      reply({result: "success"});
    }
  }
}
