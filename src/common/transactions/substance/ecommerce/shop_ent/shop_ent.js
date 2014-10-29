
var _     = require('lodash');
var async = require('async')

module.exports = function(options) {
  var seneca = this;

  options = seneca.util.deepextend({
    role:    'shop'
  },options);

  var role           = options.role;
  var shop_ent       = seneca.make('sys/shop');

  seneca.add({
    role:role,
    cmd:'create',

    // data fields
    name:                                               {string$:true},
    enabled:                                            {boolean$:true},
    property:                                           {string$:false},
    settings:                                           {object$:false},

    //address_book   {object:false},  create address collection
    domains                                             {string:false},  // default "localhost"  lookup array function for seneca data
    currency:                                           {string:true},
    email:                                              {string:true},
    money_format:                                       {string:true},
    money_with_currency_format:                         {string:true},
    money_in_emails_format:                             {string:true},
    money_with_currency_in_emails_format:               {string:true},
    // taxes:                                              {object:true}, // create object
    is_public:                                          {string:false},
    timezone:                                           {string:false},
    owner_id:                                           {string:false},
    // members:                                         {string:false},  // members collection
    use_custom_email_settings:                          {string:false},
    // custom_email_settings:                              {object:false}, // own collection

    valid_start:                                        {date:true},
    valid_end:                                          {date:false},

    // meta
    created_at:    {date$:true},
    updated_at:    {date$:true}

  }, cmd_create_shop );


  seneca.add({
    role:role,
    cmd:'load_shop'
  }, cmd_load_shop );


  function cmd_create_shop (args, done) {
    var seneca  = this;

    // Logic
    if(err) return done(err);

    done(err, /* results */);
  }

  function cmd_load_shop (args, done) {
    var seneca  = this;

    // Logic
    if(err) return done(err);

    done(err, /* results */);
  }


  return {
    name:role
  }

}
