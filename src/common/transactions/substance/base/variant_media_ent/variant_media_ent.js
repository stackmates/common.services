
var _     = require('lodash');
var async = require('async')

module.exports = function(options) {
  var seneca = this;

  options = seneca.util.deepextend({
    role:    'variant_media'
  },options);


  var role           = options.role;
  var shop_member_ent       = seneca.make('sys/variant_media');



  seneca.add({
    role:role,
    cmd:'create_metafield',
    // data fields
    // front
    //account:     account
    key:            {string$:false},    // max 30
    namespace:      {number$:false},    // max 20
    scope:          {string$:false},
    value:          {string$:false},
    value_type:     {string$:false},
    description:    {string$:false},

    // meta
    created_at:    {date$:true},
    updated_at:    {date$:true}

  }, cmd_create_variant_media );



  seneca.add({
    role:role,
    cmd:'create',
    // data fields
    // front
    //account:     account
    media_id:      {string$:true},
    priority:      {number$:true},
    metafields:    {object$:false},  // TODO investigate how this works in seneca

    // meta
    created_at:    {date$:true},
    updated_at:    {date$:true}

  }, cmd_create_variant_media );


  seneca.add({
    role:role,
    cmd:'load_variant_media'
  }, cmd_load_variant_media );


  function cmd_create_variant_media (args, done) {
    var seneca  = this;

    // Logic
    if(err) return done(err);

    done(err, /* results */);
  }

  function cmd_load_variant_media (args, done) {
    var seneca  = this;

    // Logic
    if(err) return done(err);

    done(err, /* results */);
  }


  return {
    name:role
  }

}
