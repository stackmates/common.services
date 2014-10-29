
var _     = require('lodash');
var async = require('async')

module.exports = function(options) {
  var seneca = this;

  options = seneca.util.deepextend({
    role:    'payment'
  },options);

  var role                 = options.role;
  var payment_ent          = seneca.make('sys/payment');
  var payment_method_ent   = seneca.make('sys/payment_method');


  seneca.add({
    role:role,
    cmd:'create',

    // data fields
    address:                                  {object$:true},
    payment_method:                           {object$:true},

    valid_start:                              {date$:true},
    valid_end:                                {date$:true},

    created_at:    {date$:true},
    updated_at:    {date$:true}

  }, cmd_create_payment );


  seneca.add({
    role:role,
    cmd:'create_method',

    // data fields
    processor:                                 {string$:true},
    stored_card:                               {string$:true},
    method:                                    {string$:false},
    transaction_id:                            {string$:false},
    status:                                    {string$:false},
    mode:                                      {string$:false},
    authorization:                             {string$:false},
    amount:                                    {number$:false},

    valid_start:                               {date$:true},
    valid_end:                                 {date$:true},

    created_at:                                {date$:true},
    updated_at:                                {date$:true}

  }, cmd_create_payment_method );


  seneca.add({
    role:role,
    cmd:'load_payment_method'
  }, cmd_load_payment_method );


  function cmd_create_payment_method (args, done) {
    var seneca  = this;

    // Logic
    if(err) return done(err);

    done(err, /* results */);
  }

  function cmd_load_payment_method (args, done) {
    var seneca  = this;

    // Logic
    if(err) return done(err);

    done(err, /* results */);
  }


  return {
    name:role
  }

}
