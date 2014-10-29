
var _     = require('lodash');
var async = require('async')

module.exports = function(options) {
  var seneca = this;

  options = seneca.util.deepextend({
    role:    'address'
  },options);


  var role           = options.role;
  var address_ent = seneca.make('sys/address');


  seneca.add({
    role:role,
    cmd:'create',

    // data fields
    full_name:           {string$:true},
    address_1:           {string$:true},
    address_2:           {string$:false},
    city:                {string$:true},
    company:             {string$:false},
    phone:               {string$:true},  // regeEx /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/   min 7, max 22
    region:              {string$:true},
    postal:              {string$:true},
    country:             {string$:true},
    is_commercial:       {boolean$:true},
    is_default:          {boolean$:true},
    // metafields:          {boolean$:true},  TODO create metadata collection

    valid_start:         {date$:true},
    valid_end:           {date$:true},

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
