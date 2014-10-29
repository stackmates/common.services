'use strict';

var Boom = require('boom');

module.exports = function getProfileImage ( options ) {

  return function (req,reply) {
    // until we implement authentication we are simply returning a 401:
    // reply(Boom.unauthorized('Please log-in to see that'));

    reply('Congrats')
  }

}
