
var _     = require('lodash');
var async = require('async')

module.exports = function(options) {
  var seneca = this;

  options = seneca.util.deepextend({
    role:    'shop_member'
  },options);


  var role           = options.role;
  var shop_member_ent       = seneca.make('sys/shop_member');


  seneca.add({
    role:role,
    cmd:'create',
    // data fields
    // front
    //account:     account
    user_id:       {string$:true},
    is_admin:      {boolean$:true},
    permissions:   {string$:false},

    // meta
    created_at:    {date$:true},
    updated_at:    {date$:true}

  }, cmd_create_shop );


  seneca.add({
    role:role,
    cmd:'load_shop_member'
  }, cmd_load_shop_member );


  function cmd_create_shop_member (args, done) {
    var seneca  = this;

    // Logic
    if(err) return done(err);

    done(err, /* results */);
  }

  function cmd_load_shop_member (args, done) {
    var seneca  = this;

    // Logic
    if(err) return done(err);

    done(err, /* results */);
  }


  return {
    name:role
  }

}
