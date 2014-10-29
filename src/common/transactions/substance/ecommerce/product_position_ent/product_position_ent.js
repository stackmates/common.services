
var _     = require('lodash');
var async = require('async')

module.exports = function(options) {
  var seneca = this;

  options = seneca.util.deepextend({
    role:    'product_position'
  },options);


  var role                    = options.role;
  var product_position_ent    = seneca.make('sys/product_position');


  seneca.add({
    role:role,
    cmd:'create',

    // data fields
    tag:                    {string$:false},
    position:               {number$:false},
    weight:                 {string$:false},

    // meta
    created_at:             {date$:true},
    updated_at:             {date$:true}

  }, cmd_product_position );


  seneca.add({
    role:role,
    cmd:'load_product_position'
  }, cmd_load_product_position );


  function cmd_create_product_position (args, done) {
    var seneca  = this;

    // Logic
    if(err) return done(err);

    done(err, /* results */);
  }

  function cmd_load_product_position (args, done) {
    var seneca  = this;

    // Logic
    if(err) return done(err);

    done(err, /* results */);
  }


  return {
    name:role
  }

}
