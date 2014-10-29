
var _     = require('lodash');
var async = require('async')

module.exports = function(options) {
  var seneca = this;

  options = seneca.util.deepextend({
    role:    'api_key'
  },options);


  var role           = options.role;
  var api_key_ent = seneca.make('sys/api_key');


  seneca.add({
    role:role,
    cmd:'create',
    // data fields
    // front
    access_token:  {string$:true},
    expires_on:    {date$:true},
    //user:          // what is the seneca way?
    created_at:    {date$:true},
    updated_at:    {date$:true}

  }, cmd_create_api_key );


  seneca.add({
    role:role,
    cmd:'load_key'
  }, cmd_load_key );


  function cmd_create_api_key (args, done) {
    var seneca  = this;

    // Logic
    if(err) return done(err);

    done(err, /* results */);
  }

  function cmd_load_key (args, done) {
    var seneca  = this;

    // Logic
    if(err) return done(err);

    done(err, /* results */);
  }


  return {
    name:role
  }

}