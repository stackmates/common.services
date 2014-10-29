
var _     = require('lodash');
var async = require('async')

module.exports = function(options) {
  var seneca = this;

  options = seneca.util.deepextend({
    role:    'tax'
  },options);


  var role           = options.role;
  var tax_ent = seneca.make('sys/tax');


  seneca.add({
    role:role,
    cmd:'create',
    // data fields
    // front
    tax_shipping:             {string$:true},
    taxes_included:           {boolean$:false},
    county_taxes:             {boolean$:false},
    // metafields   TODO

    valid_start:              {date$:true},
    valid_end:                {date$:true},

    //user:          // what is the seneca way?
    created_at:               {date$:true},
    updated_at:               {date$:true}

  }, cmd_create_tax );


  seneca.add({
    role:role,
    cmd:'load_tax'
  }, cmd_load_tax );


  function cmd_create_tax (args, done) {
    var seneca  = this;

    // Logic
    if(err) return done(err);

    done(err, /* results */);
  }

  function cmd_load_tax (args, done) {
    var seneca  = this;

    // Logic
    if(err) return done(err);

    done(err, /* results */);
  }


  return {
    name:role
  }

}
