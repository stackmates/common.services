
var _     = require('lodash');
var async = require('async')

module.exports = function(options) {
  var seneca = this;

  options = seneca.util.deepextend({
    role:    'customer'
  },options);


  var role           = options.role;
  var customer_ent   = seneca.make('sys/customer');


  seneca.add({
    role:role,
    cmd:'create',

    // data fields
    shop_id:                                    {string$:true},
    email:                                      {string$:true},
    full_name:                                  {string$:true},
    image_url:                                  {string$:true},
    accepts_marketing:                          {string$:true},
    orders_count:                               {string$:true},
    total_spent:                                {string$:true},
    state:                                      {string$:true},
    last_order_id:                              {string$:false},
    last_order_name:                            {string$:false},
    note:                                       {string$:false},
    hash_tags:                                  {string$:false},   // array
    multipass_identifier:                       {string$:false},
    verified_email:                             {boolean$:false},

    // metafields:          {boolean$:true},  TODO create metadata collection

    valid_start:         {date$:true},
    valid_end:           {date$:true},

    created_at:          {date$:true},
    updated_at:          {date$:true}

  }, cmd_create_customer );


  seneca.add({
    role:role,
    cmd:'load_customer'
  }, cmd_load_customer );


  function cmd_create_customer (args, done) {
    var seneca  = this;

    // Logic
    if(err) return done(err);

    done(err, /* results */);
  }

  function cmd_load_customer (args, done) {
    var seneca  = this;

    // Logic
    if(err) return done(err);

    done(err, /* results */);
  }


  return {
    name:role
  }

}
