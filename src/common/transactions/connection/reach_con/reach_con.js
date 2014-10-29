'use strict';


var Hoek = require('hoek');
var Joi  = require('joi');
var Boom = require('boom');

var internals = {
  route: '/reach'
};

exports.register = function (plugin, options, next) {

  options = Hoek.applyToDefaults(internals, options);

  // options.seneca.use(options.DIR.__cIntel + 'analysis/reach_analysis', {});
  // options.seneca.use(options.DIR.__cTrans + 'structure/social/reach_str', {});

  // list
  plugin.route({
    path: options.route,
    method: 'GET',
    config: {
      // auth: 'jwt',  // protect later if wanted
      handler: require('./handlers/reach_list')(options)
    }
  });

  // list flattened results
  plugin.route({
    path: options.route + '/flattened',
    method: 'GET',
    config: {
      // auth: 'jwt',  // protect later if wanted
      handler: require('./handlers/reach_list_flattened')(options)
    }
  });

  // create
  plugin.route({
    path: options.route,
    method: 'POST',
    config: {
      handler: require('./handlers/reach_create')(options)
    }
  });

  next();

}


exports.register.attributes = {
  pkg: require("./package.json")
}
