
var _     = require('lodash');
var async = require('async')

module.exports = function(options) {
  var seneca = this;

  options = seneca.util.deepextend({
    role:    'product'
  },options);


  var role                = options.role;
  var product_ent         = seneca.make('sys/product');
  var product_variant_ent = seneca.make('sys/product_variant');


  seneca.add({
    role:role,
    cmd:'create',

    // data fields
    clone_id:                                             {string$:false},
    shop_id:                                              {string$:false},
    title:                                                {string$:false},
    page_title:                                           {string$:false},
    description:                                          {string$:false},
    product_type:                                         {string$:false},
    vendor:                                               {string$:false},
    // metafields:                                        {object$:false},
    // variants:                                          {object$:false},

    hashtags:                                             {[string]},  // TODO lookup array in seneca
    twitter_msg:                                          {string$:false},  // max 140
    facebook_msg:                                         {string$:false},  // max 255
    instagram_msg:                                        {string$:false},
    pinterest_msg:                                        {string$:false},  // max 255
    meta_description:                                     {string$:false},  //
    handle:                                               {string$:false},  // index

    is_visible:                                           {boolean$:false},  // index
    published_scope:                                      {string$:false},
    template_suffix:                                      {string$:false},

    valid_start:                                          {date$:true},
    valid_end:                                            {date$:true},

    created_at:                                           {date$:true},
    updated_at:                                           {date$:true}

  }, cmd_create_product );



  seneca.add({
    role:role,
    cmd:'create_variant',

    // data fields
    parent_id:                                            {string$:false},
    clone_id:                                             {string$:false},
    index:                                                {string$:false},
    barcode:                                              {string$:false},
    compare_at_price:                                     {number$:false},
    fulfillment_service:                                  {string$:false},
    weight:                                               {string$:false},
    inventory_management:                                 {boolean$:true},   // inventory tracking
    inventory_policy:                                     {boolean$:true},   // deny when out of stock
    low_inventory_warning_threshold:                      {number$:false},
    inventory_quantity:                                   {number$:false},
    price:                                                {number$:false},   // as cents * 100 to get
    requires_shipping:                                    {boolean$:false},
    sku:                                                  {string$:false},
    taxable:                                              {string$:false},
    title:                                                {string$:false},
    option_title:                                         {string$:false},
    // metafields:                                        {object$:false},
    // positions:                                         {object$:false},

    valid_start:                                          {date$:true},
    valid_end:                                            {date$:true},

    created_at:                                           {date$:true},
    updated_at:                                           {date$:true}

  }, cmd_create_product_variant );


  seneca.add({
    role:role,
    cmd:'load_product_variant'
  }, cmd_load_product_variant );


  function cmd_create_product_variant (args, done) {
    var seneca  = this;

    // Logic
    if(err) return done(err);

    done(err, /* results */);
  }

  function cmd_load_product_variant (args, done) {
    var seneca  = this;

    // Logic
    if(err) return done(err);

    done(err, /* results */);
  }


  return {
    name:role
  }

}
