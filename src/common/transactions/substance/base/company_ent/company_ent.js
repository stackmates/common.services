
var _     = require('lodash');
var async = require('async')

module.exports = function(options) {
  var seneca = this;

  options = seneca.util.deepextend({
    role:    'company'
  },options);


  var role           = options.role;
  var company_ent = seneca.make('sys/company');


  seneca.add({
    role:role,
    cmd:'create',
    // data fields
    // front
    //account:     account
    name:          {string$:true},

    // meta
    created_at:    {date$:true},
    updated_at:    {date$:true}

  }, cmd_create_company );


  seneca.add({
    role:role,
    cmd:'load_company'
  }, cmd_load_company );


  function cmd_create_company (args, done) {
    var seneca  = this;

    // Logic
    if(err) return done(err);

    done(err, /* results */);
  }

  function cmd_load_company (args, done) {
    var seneca  = this;

    // Logic
    if(err) return done(err);

    done(err, /* results */);
  }


  return {
    name:role
  }

}
