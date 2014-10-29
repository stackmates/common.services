
var _     = require('lodash');
var async = require('async')

module.exports = function(options) {
  var seneca = this;

  options = seneca.util.deepextend({
    role:    'shipment_quote'
  },options);

  var role                 = options.role;
  var shipment_quote_ent   = seneca.make('sys/shipment_quote');


  seneca.add({
    role:role,
    cmd:'create_shipment',

    // data fields
    address:                                  {object$:true},
    shipment_quote:                           {object$:true},

    valid_start:                              {date$:true},
    valid_end:                                {date$:true},

    created_at:    {date$:true},
    updated_at:    {date$:true}

  }, cmd_create_shipment );

  seneca.add({
    role:role,
    cmd:'create',

    // data fields
    carrier:                                  {number$:true},
    method:                                   {number$:true},
    tracking:                                 {string$:false},
    label:                                    {string$:false},
    value:                                    {string$:false},

    valid_start:                              {date$:true},
    valid_end:                                {date$:true},

    created_at:    {date$:true},
    updated_at:    {date$:true}

  }, cmd_create_shipment_quote );


  seneca.add({
    role:role,
    cmd:'load_shipment_quote'
  }, cmd_load_shipment_quote );


  function cmd_create_shipment_quote (args, done) {
    var seneca  = this;

    // Logic
    if(err) return done(err);

    done(err, /* results */);
  }

  function cmd_load_shipment_quote (args, done) {
    var seneca  = this;

    // Logic
    if(err) return done(err);

    done(err, /* results */);
  }


  return {
    name:role
  }

}
