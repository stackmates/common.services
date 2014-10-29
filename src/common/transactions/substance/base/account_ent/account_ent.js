
var _     = require('lodash');
var async = require('async')

module.exports = function(options) {
  var seneca = this;

  options = seneca.util.deepextend({
    role:    'account'
  },options);


  var role           = options.role;
  var api_key_ent    = seneca.make('sys/account');


  seneca.add({
    role:role,
    cmd:'create',
    // data fields
    // front
    //user:        user

    // meta
    created_at:    {date$:true},
    updated_at:    {date$:true}

  }, cmd_create_account );


  seneca.add({
    role:role,
    cmd:'load_account'
  }, cmd_load_account );


  function cmd_create_account (args, done) {
    var seneca  = this;

    // Logic
    if(err) return done(err);

    done(err, /* results */);
  }

  function cmd_load_account (args, done) {
    var seneca  = this;

    // Logic
    if(err) return done(err);

    done(err, /* results */);
  }


  return {
    name:role
  }

}
