
var _     = require('lodash');
var async = require('async')

module.exports = function(options) {
  var seneca = this;

  options = seneca.util.deepextend({
    role:    'tag'
  },options);


  var role           = options.role;
  var tag_ent        = seneca.make('sys/tag');


  seneca.add({
    role:role,
    cmd:'create',

    // data fields
    name:                               {string$:true},  //index
    slug:                               {string$:true},
    position:                           {number$:false},
    related_tag_ids:                    {string$:true},  // array
    is_top_level:                       {boolean$:true},
    shop_id:                            {string$:true},  // index

    created_at:                         {date$:true},
    updated_at:                         {date$:true}

  }, cmd_create_tag );


  seneca.add({
    role:role,
    cmd:'load_tag'
  }, cmd_load_tag );


  function cmd_create_tag (args, done) {
    var seneca  = this;

    // Logic
    if(err) return done(err);

    done(err, /* results */);
  }

  function cmd_load_tag (args, done) {
    var seneca  = this;

    // Logic
    if(err) return done(err);

    done(err, /* results */);
  }


  return {
    name:role
  }

}
