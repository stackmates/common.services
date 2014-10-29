
var _     = require('lodash');
var async = require('async')

module.exports = function(options) {
  var seneca = this;

  options = seneca.util.deepextend({
    role:    'cart'
  },options);


  var role           = options.role;
  var cart_ent       = seneca.make('sys/cart');
  var cart_item_ent  = seneca.make('sys/cart_item');


  seneca.add({
    role:role,
    cmd:'create_cart',

    // data fields
    shop_id:                 {string$:true},  // index
    token_id:                {string$:true},  // index
    user_id:                 {string$:false},  // index
    items:                   {cartItem$:false},  // index
    requires_shipping:       {boolean$:false},  //
    // shipping:                {shipping},
    // payment:                 {payment},
    total_price:             {number:false}   // low denom min 0
    state:                   {string:false}  // default new

    // meta
    created_at:    {date$:true},
    updated_at:    {date$:true}

  }, cmd_create_cart );

  // would need to delete this when logging out or validation check fails

  seneca.add({
    role:role,
    cmd:'create_cart_item',

    // data fields
    product_id:    {string$:true},
    quantity:      {number$:true},  // min 0
    // variants                     // should variants be stored  here on move this to products service?

    // meta
    created_at:    {date$:true},
    updated_at:    {date$:true}

  }, cmd_create_cart_item );


  seneca.add({
    role:role,
    cmd:'load_cart_item'
  }, cmd_load_cart_item );


  function cmd_create_cart_item (args, done) {
    var seneca  = this;

    // Logic
    if(err) return done(err);

    done(err, /* results */);
  }

  function cmd_load_cart_item (args, done) {
    var seneca  = this;

    // Logic
    if(err) return done(err);

    done(err, /* results */);
  }


  return {
    name:role
  }

}
