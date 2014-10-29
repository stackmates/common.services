'use strict';

var seneca;
var publishact;

var Hoek = require('hoek');
var Joi  = require('joi');
var Boom = require('boom');

var internals = {
  route: '/publish'
};

exports.register = function (plugin, options, next) {

  options = Hoek.applyToDefaults(internals, options);

  // options.seneca.use(options.DIR.__cTrans + 'substance/social/publishing_sub', {});

  // list
  plugin.route({
    path: options.route,
    method: 'GET',
    config: {
      // auth: 'jwt',  // protect later if wanted
      handler: require('./handlers/publish_list')(options)
    }
  });

  // show
  plugin.route({
    path: options.route + '/{id}',
    method: 'GET',
    handler: require('./handlers/publish_show')(options)
  });

  // create
  plugin.route({
    path: options.route,
    method: 'POST',
    config: {
      handler: require('./handlers/publish_create')(options)
    }
  });

  // update
  plugin.route({
    path: options.route + '/{id}',
    method: 'PUT',
    config: {
      validate: {
        params: { id: Joi.string().token() }
        // payload: {
        //   full_name: Joi.string()
        // }
      },
      handler: require('./handlers/publish_update')(options)
    }
  });

  // delete
  plugin.route({
    path: options.route + '/{id}',
    method: 'DELETE',
    config: {
      validate: {
        params: { id: Joi.string().token() },
      },
      handler: require('./handlers/publish_delete')(options)
    }
  });

  next();

}


exports.register.attributes = {
  pkg: require("./package.json")
}
