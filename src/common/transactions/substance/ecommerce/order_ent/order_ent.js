
var _     = require('lodash');
var async = require('async')

module.exports = function(options) {
  var seneca = this;

  options = seneca.util.deepextend({
    role:    'order'
  },options);


  var role           = options.role;
  var order_ent   = seneca.make('sys/order');


  seneca.add({
    role:role,
    cmd:'create_order_item',

    // data fields
    additional_field:                         {string$:true}
    status:                                   {string$:true}
    // history:                               {object$:true}
    // documents:                             {object$:true}

    // metafields:          {boolean$:true},  TODO create metadata collection

    valid_start:                              {date$:true},
    valid_end:                                {date$:true},

    created_at:                               {date$:true},
    updated_at:                               {date$:true}

  }, cmd_create_order_item );


  seneca.add({
    role:role,
    cmd:'load_order'
  }, cmd_load_order );


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
