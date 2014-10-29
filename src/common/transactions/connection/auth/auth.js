'use strict';

var log       = require('debug')('con:auth');


var Boom      = require('boom');
var Hoek      = require("hoek");
var jwt       = require('jsonwebtoken'); // authorization

// seneca
var seneca;
var useract;

// load plugin config
var Providers = require("./config").get('/provider');

// hapi plugin defaults
var defaults = {
  route: '/auth'
};

exports.register = function(plugin, options, next) {

    options = Hoek.applyToDefaults(defaults, options);

    // setup seneca requirements
    seneca = options.seneca;

    // seneca.use(options.DIR.__cTrans + 'substance/user_ent', {
    //   tokensecret: Providers.jwt.tokensecret,
    //   jwtoptions: Providers.jwt.jwtoptions
    // });

    useract = seneca.pin({role:'user',cmd:'*'});

    //Add Multiple stratergies here and we have used confidence to pick up the configuration.
    // plugin.auth.strategy('facebook', 'bell', Providers.facebook);

    plugin.auth.strategy('google', 'bell', Providers.google);

    plugin.auth.strategy('jwt', 'jwt', {
      key: Providers.jwt.tokensecret,
      validateFunc: validate
    });

    // auth routes
    plugin.route({
      path: '/auth',
      method: 'POST',
      config: {
        handler: emailRegistrationHandler
      }
    });

    plugin.route({
      path: '/auth/sign_in',
      method: 'POST',
      config: {
        handler: emailSignInHandler
      }
    });

    plugin.route({
      path: '/auth/password',
      method: 'PATCH',
      config: {
        handler: updatePasswordHandler
      }
    });

    plugin.route({
      path: '/auth/google',
      method: 'POST',
      config: {
        auth: 'google',
        handler: googleAuthHandler
      }
    });

    plugin.route({
      path: '/auth/validate_token',
      method: 'GET',
      config: {
        auth: 'jwt',
        handler: validateTokenHandler
      }
    });

    plugin.route({
      path: '/auth/sign_out',
      method: 'POST',
      config: {
        auth: 'jwt',
        handler: destroyTokenHandler
      }
    })

    // http://programmers.stackexchange.com/questions/196871/what-http-verb-should-the-route-to-log-out-of-your-web-app-be

    // confirmationSuccessUrl:  window.location.href,
    // passwordResetSuccessUrl: window.location.href,

    next();
};

exports.register.attributes = {
    pkg: require("./package.json")
};


// ======== handler functions =========

function validate (token, decodedToken, callback){

    var id = decodedToken.id;

    useract.auth({
      id: id
    }, function(err, results){
      if (err) Boom.methodNotAllowed('Computer says no');

      if (!results) {
        return callback(null, false);
      }

      return callback(null, true, results)
    });

};

function emailRegistrationHandler (request, reply){
  useract.register({
    nick:     request.payload.nick,
    name:     request.payload.name,
    email:    request.payload.email,
    password: request.payload.password,
    active:   true
  }, function(err,result){
    if (err) Boom.methodNotAllowed('Computer says no');
    reply( result );
  });
};

function emailSignInHandler (request, reply){
  useract.login({
    nick:         request.payload.nick,
    password:     request.payload.password
  }, function (err, result) {
    if (err) Boom.methodNotAllowed('Computer says no');

    if (!result.ok) {
      seneca.log.debug('no user found',result.ok, result.why);
      return reply (Boom.notFound(result.why));
    };

    if (result.user) {
      // console.log(result.user);
      // encode the login id used to lookup user when making auth
      result.user.token = jwt.sign(
        { id: result.login.id },
        Providers.jwt.tokensecret, Providers.jwt.jwtoptions
      );
      delete result.login
      delete result.user.id;
      delete result.user.pass;
      delete result.user.salt; // do something nicer that this
    }
    reply(result);
  });

};

function validateTokenHandler (request, reply) {
  var credentials = request.auth.credentials;
  // console.log('creds',credentials);
  if (!credentials.user) {
    return reply (Boom.notFound(credentials.why))
  }
  reply({
    ok: credentials.ok,
    user: {
      nick   : credentials.user.nick ? credentials.user.nick : '',
      email  : credentials.user.email ? credentials.user.email : '',
      name   : credentials.user.name ? credentials.user.name : '',
    }
  });
};

function updatePasswordHandler (request, reply) {
  useract.change_password({
    nick: request.payload.nick ? request.payload.nick : '',
    email: request.payload.email ? request.payload.email : '',
    password: request.payload.password
  }, function (err, result) {
    if (err) Boom.methodNotAllowed('Computer says no');

    if ( !result.ok ) {
      reply ( Boom.notFound(result.message));
    }
    reply({ ok: result.ok });
  })
};

function destroyTokenHandler (request, reply) {
  // console.log('token = ', request.auth.credentials);
  var id = request.auth.credentials.login.id;

  useract.logout({
    id: id
  }, function (err, result) {
    if (err) Boom.methodNotAllowed('Computer says no');

    reply({ ok: result.ok });
  });
};

function googleAuthHandler (request, reply) {

};

